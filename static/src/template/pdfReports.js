import React, {useState} from 'react';
import '../../css/_custom.scss';
// import 'bootstrap-icons/font/bootstrap-icons.css';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import {Editor, EditorState} from 'draft-js';
// import 'draft-js/dist/Draft.css';

const PdfReport = (props) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
        setPageNumber(1);
    }

    const changePage = (offset) => setPageNumber(prevPageNumber => prevPageNumber + offset);
    const previousPage = () => changePage(-1);
    const nextPage = () => changePage(1);
    
    const { fileName, pdf } = props;

    console.log(pdf)
    return (
  
        <div className='pdf-extraction'>
            <div className="container" >
                <div className="row">
                    <div className="col mx-2">
                        <Document
                            file={fileName}
                            options={{ workerSrc: "/pdf.worker.js" }}
                            onLoadSuccess={onDocumentLoadSuccess}
                        >
                            <Page size="A4" pageNumber={pageNumber} />
                        </Document>
                        <div className='d-flex flex-column'>
                            <div className='d-flex justify-content-center my-2'>
                            Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
                            </div>
                            <div className='d-flex justify-content-center mb-2'>
                                <button type="button" className='btn btn-outline-primary'
                                disabled={pageNumber <= 1} onClick={previousPage}>
                                    Previous
                                </button>
                                <button
                                type="button" className='btn btn-outline-primary'
                                disabled={pageNumber >= numPages}
                                onClick={nextPage}
                                >
                                    Next
                                </button>
                            </div>
                        </div>   
                    </div>
                    <div className="col mx-2 text-extracted-container">
                       <div className='text-extracted-page px-3'>
                           {pdf.page.map((value)=>value)}
                       </div>
                    </div>
                    
                </div>
            </div>
        </div>
    
    )
}

export default PdfReport;