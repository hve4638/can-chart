import csv

def canparse(filename:str, filehash:str, db):
    with open(filename, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)

        for row in reader:
            canid = row['CANID']
            dlc = row['DATALEN']
            time = row['TIME']
            interval = row['INTERVAL']
            data = row['DATA']
            db.insert('candata', {
                'token' : filehash,
                'interval' : interval,
                'time' : time,
                'canid' : canid
            }).execute()
        