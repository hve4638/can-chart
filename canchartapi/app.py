#!/usr/bin/env python3
import os, subprocess
import hashlib, random, time
from http import HTTPStatus
from flask import Flask, jsonify, redirect, render_template, request, url_for, session
from flask_cors import CORS

from easydb import EasyDB, Where
import chart

upload_dir = os.environ.get('UPLOADDIR')
if not upload_dir:
    upload_dir = './tmp'

app = Flask(__name__)
CORS(app)

db = EasyDB('./chartdata.db', verbose=True)
#db = EasyDB(verbose=True)

def dbinit():
    db.create_table('meta', if_not_exists=True)\
        .text('name', notnull=True)\
        .text('token', unique=True, primarykey=True)\
        .execute()
    db.create_table('candata', if_not_exists=True)\
        .text('token')\
        .real('time')\
        .real('interval')\
        .text('data')\
        .integer('canid')\
        .execute()
    
def makehash(file_contents):
    sha256_hash = hashlib.sha256()
    sha256_hash.update(file_contents)
    return sha256_hash.hexdigest()

@app.route('/chart/timesequence', methods=['POST'])
def request_timesequence():
    def arg(key, defvalue):
        return req[key] if key in req else defvalue
    req = request.json
    tokens = req['tokens']
    limit = arg('limit', 0)
    time_begin = arg('begin', 0)
    time_end = arg('end', 0)
    canid_info = arg('canid', [])
    print(f'Request TimeSequence')
    print(f'{req}')

    if not tokens:
        return { 'error': 'tokens empty' }, 400
    
    canid_filter = {}
    for info in canid_info:
        info['count'] = 0
        canid_filter[info['id']] = info
    
    names = {}
    wherequery = None
    for token in tokens:
        name = db.select('meta', ['name']).where(Where.eq('token', token)).execute().one()
        if not name:
            return {'error' : 'invalid token'}, 400
        names[token] = name['name']

        cond = Where.eq('token', token)
        if wherequery:
            wherequery = Where.OR(wherequery, cond)
        else:
            wherequery = cond
    if time_begin > 0:
        cond = Where.ge('time', time_begin)
        if wherequery:
            wherequery = Where.AND(wherequery, cond)
        else:
            wherequery = cond
    if time_end > 0:
        cond = Where.le('time', time_end)
        if wherequery:
            wherequery = Where.AND(wherequery, cond)
        else:
            wherequery = cond
    
    builder = db.select('candata', ['token', 'time', 'canid']).where(wherequery)
    builder.orderby('time', descend=False)
    
    if limit > 0:
        builder.limit(limit)
    result = builder.execute()

    chartdata = chart.timesequence(
        result, tokens=tokens, canid_filter=canid_filter
    )

    datasets = []
    for token in tokens:
        datasets.append({
            'label' : names[token],
            'data' : chartdata['datasets'][token]
        })

    return {
        'type' : 'line',
        'title' : 'Time Sequence',
        'count' : chartdata['count'],
        'labels' : chartdata['labels'],
        'datasets' : datasets,
        'additions' : {
            'canids' : chartdata['canids']
        }
    }

@app.route('/upload', methods=['POST'])
def request_upload():
    file = request.files['data']
    filename, ext = os.path.splitext(file.filename)
    
    contents = file.read()
    filehash = makehash(contents)
    file.seek(0)
    
    isupload = False
    if not db.select_count('meta').where(Where.eq('token', filehash)).execute().one():
        isupload = True
        filepath = f'{upload_dir}/{filehash}.csv'
        file.save(filepath)
        chart.canparse(filename=filepath, filehash=filehash, db=db)

        db.insert('meta', {
            'name' : filename,
            'token' : filehash
        }).execute()
        db.commit()

    return {
        'token' : filehash,
        'labelname' : filename,
        'upload' : isupload
    }

if __name__ == '__main__':
    dbinit()

    app.run(debug=True, host="0.0.0.0", port=4080)