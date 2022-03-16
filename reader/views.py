from django.shortcuts import render
from .components.pdfToImage import PdftoImage
from .components.extractText import ExtractText

# Create your views here.
def index(request):
    text = PdftoImage().convertToImages('git_terminology.pdf','pdfImages')
    print(text)
    context = {
        "pdf":{"page": text}
    }
    return render(request, 'pdf/main.html', context)