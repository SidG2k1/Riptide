from math import sin, cos, sqrt, atan2, radians

class hgtMap:
    """
    This class represent an combination of topological conditions and water flood level
    Note, the 'point' (x, y) is data[x][y].
    """
    def __init__(self, hgtStartData):
        """
        hgtStartData is the source data from the NASA JPL topological data
        This data comes from: https://dds.cr.usgs.gov/srtm/version2_1/SRTM1/
        It needs to be processed and provided to init as a 2D array [[...], ...]
        """
        self.data = []
        for row in hgtStartData:
            self.data.append(map(lambda height: [height, 0], row))
    def pointToLatLong(self, x, y):
        # TODO
        # x,y are integers
        return [43.4555, -90.4233]
    def latLongToPointApprox(self, lat, long):
        # TODO
        return [5, 9]
    def getWater(self, x, y):
        """
        returns the level of water at the point (x, y)
        """
        return self.data[y][x][1]
    def setWater(self, x, y, waterLevel):
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

def tick():
    pass

if __name__ == "__main__":
    floodMap = hgtMap([[[4,4],[4,0]],[5,5]])
    print(floodMap.getAllData)
    while False:
        tick()