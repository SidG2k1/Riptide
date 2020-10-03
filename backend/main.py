from math import sin, cos, sqrt, atan2, radians

class hgtMap:
    """
    This class represent an combination of topological conditions and water flood level
    Note, the 'point' (x, y) is data[x][y].
    """
    """
    Diagram showing how to interpret (x, y) <--> (lat, long):

    Lat
    ^
    | [[1,2,3,4]
    |  [2,3,4,5]
    |  [6,7,8,9]
    |  [7,8,9,0]]
    L___________> Long

    note, data[0][0] = 1
    """
    def __init__(self, hgtStartData):
        """
        hgtStartData is the source data from the NASA JPL topological data
        This data comes from: https://dds.cr.usgs.gov/srtm/version2_1/SRTM1/
        It needs to be processed and provided to init as a 2D array [[...], ...]
        """
        self.data = []
        for row in hgtStartData:
            toAdd = []
            for height in row:
                toAdd.append([height, 0])
            self.data.append(toAdd)
        self.maxX = len(hgtStartData[0]) - 1
        self.maxY = len(hgtStartData) - 1

        self.minFloodHeight = 0 # TODO determine later
    def pointToLatLong(self, x, y):
        # TODO
        # x,y are integers
        return [43.4555, -90.4233]
    def latLongToPointApprox(self, lat, long):
        # TODO
        return [1, 1]
    def getHeight(self, x, y):
        """
        returns the topological height at (x, y)
        """
        if x > self.maxX or y > self.maxY or x < 0 or y < 0:
            return 10000000 # effectively infinity
        return self.data[y][x][0]
    def getWater(self, x, y):
        """
        returns the level of water at the point (x, y)
        """
        if x > self.maxX or y > self.maxY or x < 0 or y < 0:
            raise Exception("accessed an invalid position in method getWater")
        return self.data[y][x][1]
    def setWater(self, x, y, waterLevel):
        if x > self.maxX or y > self.maxY or x < 0 or y < 0:
            pass
        self.data[y][x][1] = waterLevel
    def getAllData(self):
        """
        This returns the raw internal state. Generally avoid using this if you can 
        """
        return self.data
    
def latLongDist(lat1, long1, lat2, long2):
    # approximate radius of earth in km
    R = 6373.0
    lat1i = radians(lat1)
    lon1i = radians(long1)
    lat2i = radians(lat2)
    lon2i = radians(long2)
    dlon = lon2i - lon1i
    dlat = lat2i - lat1i
    a = sin(dlat / 2)**2 + cos(lat1i) * cos(lat2i) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    return R * c

def tick(floodMap):
    for x in range(floodMap.maxX + 1):
        for y in range(floodMap.maxY + 1):
            if floodMap.getWater(x, y) < floodMap.minFloodHeight:
                pass
            else:
                # propagate water
                waterToSpread = floodMap.getWater(x, y)
                heightSquareSum = 0
                for i in range(x - 1, x + 2):
                    for j in range(y - 1, y + 2):
                        heightSquareSum += floodMap.getHeight(i, j)**2
                # TODO: distribute the water such that Sum[Delta[H2O]] = 0
    floodMap.setWater(1, 1, floodMap.getWater(1, 1) - 0.1)
    return floodMap

if __name__ == "__main__":
    floodMap = hgtMap([[0,1,2],[1,2,3],[3,4,5]])

    floodStartLocation = floodMap.latLongToPointApprox(40.366, -71.88)
    floodIntensity = 300
    floodMap.minFloodHeight = floodIntensity / (1000)

    floodMap.setWater(floodStartLocation[0], floodStartLocation[1], floodIntensity)

    tickInterations = 1000
    for _ in range(tickInterations):
        floodMap = tick(floodMap)
    print(floodMap.getWater(1, 1))