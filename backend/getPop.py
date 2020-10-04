from main import latLongDist

def getArea(lat, long):
    if (long>74.048724):
        #Staten Island
        return 0
    elif (lat>40.811551):
        #Bronx
        return 1
    elif (long<73.8455):
        #Queens
        return 2
    elif (long<74.024313 and long>73.932979) and (lat<40.831364 and lat>40.700704):
        #Manhatten
        return 3
    else:
        #Brooklyn
        return 4

def getPopulation(hmap):
    populationDensity=[3100.5,12704.1,7935.74,26821.4,13656]
    averageBuildingCosts = [10000, 20000, 30000, 50000, 40000]
    pmap =[]

    scale = 0.0001
    water_threshold = hmap.minFloodHeight
    data = hmap.getAllData()
    for x in range(len(data)):
        row=[]
        for y in range(len(data[x])):
            if y<len(data[x])-2:
                point1 = hmap.pointToLatLong(x,y)
                point2 = hmap.pointToLatLong(x,y+1)
                if (x==0) and (y==0):
                    scale= latLongDist(point1[0], point1[1], point2[0], point2[1])
            point = hmap.pointToLatLong(x,y)
            if hmap.getWater(x,y)<=water_threshold:
                row.append([0, 0])
                continue
            area = getArea(point[0],point[1])
            pop = populationDensity[area]*scale,
            item= [pop,pop*averageBuildingCosts[area]]
            row.append(item)
        pmap.append(row)
    return pmap
"""
def getDamageCosts(hmap,pmap):
    averageBuildingCosts = [10000, 20000, 30000, 50000, 40000]
    dmap = []
    for x in range(len(pmap)):
        row = []
        for y in range(len(pmap[x])):
            point = hmap.pointToLatLong(x, y)
            area = getArea(point[0],point[1])
            damage = pmap[x][y]*1
            row.append(damage)
        dmap.append(row)
    return dmap
"""
def totalPop(pmap):
    sum=0
    for x in pmap:
        for y in x:
            try:
                sum += y[0]
            except:
                sum += y[0][0]
    return sum

def totalDamage(dmap):
    sum=0
    for x in dmap:
        for y in x:
            try:
                sum += y[1]
            except:
                sum += y[1][0]
    return sum