from .parser import *
from .timesequence import *
from queue import Queue

def merge_labels(**args)->list:
    labels = []
    for arg in args:
        labels.extend(arg['labels'])
    labels.sort()
    return labels

def extend_labels(labels:list, chartdata:dict):
    count = len(labels)
    labelindex = 0
    data = []
    for i in range(chartdata['count']):
        clabel = chartdata['labels'][i]
        cdata = chartdata['data'][i]
        while labels[labelindex] < chartdata['labels'][i]:
            labelindex += 1
            
        if labels[labelindex] == chartdata['labels'][i]:
            data.append(chartdata['data'][i])

    pass