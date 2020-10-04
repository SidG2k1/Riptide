import json

def jsonify(hmap, pmap, totalpop):
    data = hmap.getAllData()
    finalmap=[]
    mfh = hmap.minFloodHeight
    for x in range(len(data)):
        for y in range(len(data[x])):
            if (((x+y)%5)!=0) or (data[y][x][1] <= mfh):
                continue
            ftuple={}
            point = hmap.pointToLatLong(x, y)
            ftuple["Longitude"] = point[1]
            ftuple["Latitude"]=point[0]
            ftuple["Volume"] = data[y][x][1]
            ftuple["populationDisplaced"] = pmap[y][x][0]
            ftuple["damage"] = pmap[y][x][1]
            finalmap.append(ftuple)
    a = {"populationDisplaced": totalpop[0], "totalDamage": totalpop[1], "geodata": finalmap}
    y = json.dumps(a)
    f= open("testNew.json","x")
    f.write(y)
    f.close()
    return y