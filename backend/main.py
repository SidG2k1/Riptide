class hgtMap:
    def __init__(hgtStartData):
        # TODO Turn to [height, water]
        self.data = hgtStartData
    def pointToLatLong(self, x, y):
        # x,y are ints
        return [43.4555, -90.4233]
    def latLongToPointApprox(self, lat, long):
        return [5, 9]
    def getWater(self, x, y):
        # return water level at point
        return 90
    def setWater(self, x, y, waterLevel)
        self.data[x][y][1] = waterLevel
    def getAllData(self):
        return self.data
    

def tick():
    pass

if __name__ == "__main__":
    hgtMap = [[[4,4],[4,0]],[5,5]]
    while True:
        tick()