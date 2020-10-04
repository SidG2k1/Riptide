import json

def jsonify(hmap, pmap, dmap, totalpop, totaldam):
    data = hmap.getAllData()
    finalmap=[]
    for x in range(len(data)):
        for y in range(len(data[x])):
            ftuple={}
            point = hmap.pointToLatLong(x, y)
            ftuple["Latitude"]=point[0]
            ftuple["Longitude"] = point[1]
            ftuple["Height"] = data[x][y][0]
            ftuple["Volume"] = data[x][y][1]
            ftuple["populationDisplaced"] = pmap[x][y]
            ftuple["damage"] = dmap[x][y]
            finalmap.append(ftuple)
    x = {"populationDisplaced": totalpop, "totalDamage": totaldam, "geodata": finalmap}
    y = json.dumps(x)
    return y

