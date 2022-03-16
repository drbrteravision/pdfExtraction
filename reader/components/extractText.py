from PIL import Image
import pytesseract
import argparse
import cv2
import os


class ExtractText():
    
    def getExtractedText(self, imagePath):
        text_extracted = []
        # for i, path in enumerate(imagePath, start=0):
        print(imagePath)
        image = cv2.imread(imagePath)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        gray = cv2.medianBlur(gray, 3)
        # filename = "{}.png".format(os.getpid())
        # print(filename)
        # cv2.imwrite(filename, gray)
        text = pytesseract.image_to_string(gray.copy())
        # os.remove(filename)
        # text_extracted.append(text)
        # print('done...')
        return text