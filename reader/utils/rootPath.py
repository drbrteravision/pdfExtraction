from pathlib import Path


class RootPath():
    
    def getPath(self):
        return Path(__file__).parent.parent.parent