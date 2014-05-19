#!/usr/bin/python

while(True):
    long = input("Longitude: ")
    lat = input("Latitude: ")

    newLong = int((float(long) - 60.844378703000075) / 0.0016206212906290677)
    newLat = int((float(lat) - 23.694525458000058) / 0.0013361294212421236)

    test = '{0}{1}{0}'.format('abra', 'cad')
    print(test)
    
    print ('({!s}, {!s}) -> ({!s}, {!s})'.format(long, lat, newLong, newLat))
