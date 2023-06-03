import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PdfViewer = () => {
	const [numPages, setNumPages] = useState(null);
	const [pageNumber, setPageNumber] = useState(1);

	function onDocumentLoadSuccess({ numPages }: any) {
		setNumPages(numPages);
	}

	return (
		<div>
			<Document
				file={'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf'}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page pageNumber={pageNumber} />
			</Document>
			<p>
				Page {pageNumber} of {numPages}
			</p>
		</div>
	);
};

export default PdfViewer;
