import csv

def timesequence(queryresult, tokens, canid_filter=None):
    labels = []
    datasets = {}
    count = 0
    ids = {}
    for token in tokens:
        datasets[token] = []

    if canid_filter is None:
        canid_filter = {}

    while True:
        rows = queryresult.many(100)
        if not rows:
            break
        for row in rows:
            token = row['token']
            canid = row['canid']
            time = row['time']
            if canid not in canid_filter:
                canid_filter[canid] = { 'id' : canid, 'count' : 0, 'enabled' : True }
            canid_filter[canid]['count'] += 1
            count += 1

            if canid_filter[canid]['enabled']:
                if not labels or labels[-1] < time:
                    labels.append(time)
                    for data in datasets.values():
                        data.append(None)
                datasets[token][-1] = canid
            
    idlist = list(canid_filter.values())
    idlist.sort(key=lambda x: x['count'])
    return {
        'labels' : labels,
        'datasets' : datasets,
        'count' : count,
        'canids' : idlist
    }
