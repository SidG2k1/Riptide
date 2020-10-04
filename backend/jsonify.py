import json

def jsonify(hmap, pmap, totalpop, totaldam):
    data = hmap.getAllData()
    finalmap=[]
    for x in range(len(data)):
        for y in range(len(data[x])):
            ftuple={}
            point = hmap.pointToLatLong(x, y)
            ftuple["Longitude"] = point[1]
            ftuple["Latitude"]=point[0]
            ftuple["Volume"] = data[x][y][1]
            ftuple["populationDisplaced"] = pmap[x][y][0]
            ftuple["damage"] = pmap[x][y][1]
            finalmap.append(ftuple)
            
            
            
    a = {"populationDisplaced": totalpop, "totalDamage": totaldam, "geodata": finalmap}
    y = json.dumps(a)
    with open("./data/compiledOutput.json","w+") as outfile:
        outfile.write(y)
        
    return y

