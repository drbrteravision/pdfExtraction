import React from 'react';
import { render } from 'react-dom';
import '../css/style.scss';
import PdfReport from './template/pdfReports';
import MenuBar from './template/menuBar';
import samplePDF from '../files/git_terminology.pdf';

const pdf = JSON.parse(document.getElementById('database').textContent);


render(
    <MenuBar />,
    document.getElementById('menu')
)

render(
    <PdfReport fileName={samplePDF} pdf={pdf}/>,
    document.getElementById('main')
)


