"""
This file is for referencing how to read a .hgt file
"""

import os
import math
import numpy

fn = './N40W074.hgt'

siz = os.path.getsize(fn)
dim = int(math.sqrt(siz/2))

assert dim*dim*2 == siz, 'Invalid file size'

data = numpy.fromfile(fn, numpy.dtype('>i2'), dim*dim).reshape((dim, dim))

# Now, the raw file data is stored in the data variable

i = 0
print(len(data))
print(len(data[0]))
#for row in data:
#    print 
#    s = ""
#    for i in row:
#        s += " "+str(i)
#    break
#    #print(s)
