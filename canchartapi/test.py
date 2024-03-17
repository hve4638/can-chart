#!/usr/bin/env python3
import subprocess, os
import hashlib
from http import HTTPStatus
from webtools import StdoutPipe, Timeout, makeid
import time
import random
import chart
from easydb import EasyDB, Where

db = EasyDB(verbose=True)

if __name__ == '__main__':
    db.create_table('data', if_not_exists=True)\
        .integer('id', primarykey=True, auto_increment=True)\
        .text('name')\
        .execute()
    for i in range(5):
        db.insert('data', {'name': 'hello'}).execute()
    
    res = db.select_all('data').execute()
    print(res.many(3))
    print(res.many(3))
    print(res.many(3))
    