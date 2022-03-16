
import fitz
from typing import Tuple
import os
from reader.utils.rootPath import RootPath
from .extractText import ExtractText
import os

class PdftoImage():
    
    def convertToImages(self, pdfPath, imagePath):
        pdf_Path = os.path.join(RootPath().getPath(), 'static/files/' + pdfPath)
        img_Path = os.path.join(RootPath().getPath(), 'static/' + imagePath)
        
        pdfIn = fitz.open(pdf_Path)
        output_files = []
        
        for pg in range(pdfIn.pageCount):
            page = pdfIn[pg]
            rotate = int(0)
            
            zoom_x = 2.33333333 #(1.33333333-->1056x816)   (2-->1584x1224)
            zoom_y = 2.33333333
            mat = fitz.Matrix(zoom_x, zoom_y).prerotate(rotate)
            pix = page.get_pixmap(matrix=mat, alpha=False)
            
            if not os.path.exists(img_Path):
                # If the picture folder does not exist, create it
                os.makedirs(img_Path)
                
            output_file = f"{img_Path}/image_page{pg+1}.png"
            pix.save(output_file)
            text = ExtractText().getExtractedText(output_file)
            os.remove(output_file)
            output_files.append(text)
        
        pdfIn.close()
        return output_files