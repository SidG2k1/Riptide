import json

def jsonify(hmap, pmap, totalpop):
    data = hmap.getAllData()
    finalmap=[]
    for x in range(len(data)):
        for y in range(len(data[x])):
            if (x+y%5!=0):
                continue
            ftuple={}
            point = hmap.pointToLatLong(x, y)
            ftuple["Longitude"] = point[1]
            ftuple["Latitude"]=point[0]
            ftuple["Volume"] = data[x][y][1]
            ftuple["populationDisplaced"] = pmap[x][y][0]
            ftuple["damage"] = pmap[x][y][1]
            finalmap.append(ftuple)
    a = {"populationDisplaced": totalpop[0], "totalDamage": totalpop[1], "geodata": finalmap}
    y = json.dumps(a)
    with open("test.json","w+") as outfile:
        outfile.write(y)
    return y