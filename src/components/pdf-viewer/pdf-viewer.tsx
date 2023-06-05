import { Box, Button, Flex } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import { set } from 'react-hook-form';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

interface pdfProps {
	fileData: string;
}
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.js',
	import.meta.url
).toString();

const PdfViewer = ({ fileData }: pdfProps) => {
	const [numPages, setNumPages] = useState(0);
	const [pageNumber, setPageNumber] = useState(1);
	const [pdfWidth, setPdfWidth] = useState(0);
	const [pdfHeight, setPdfHeight] = useState(0);
	const [scale, setScale] = useState(0);
	const [widthScale, setWidthScale] = useState(0);
	const [heightScale, setHeightScale] = useState(0);
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		window.addEventListener('resize', handleScale);
		return () => {
			window.removeEventListener('resize', handleScale);
		};
	}, []);

	const handleScale = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;
		const widthScale = (width * 0.6) / pdfWidth;
		const heightScale = (height * 0.6) / pdfHeight;
		let scale = widthScale;
		if (pdfWidth / width < pdfHeight / height) {
			scale = heightScale;
		}

		setScale(scale);
		setWidthScale(widthScale);
		setHeightScale(heightScale);
	};

	function onPageLoadSuccess({ originalHeight, originalWidth }: any) {
		setPdfWidth(originalHeight);
		setPdfHeight(originalWidth);
		handleScale();
		setIsLoaded(true);
	}

	return (
		<Flex
			flexDir="column"
			w={pdfHeight * scale}
			height={pdfWidth * scale}
			align={'center'}
			justify={'center'}
			margin={'10% auto'}
		>
			<Document
				file={fileData}
				onLoadSuccess={(props) => {
					setNumPages(props.numPages);
				}}
			>
				<Page
					pageNumber={pageNumber}
					scale={scale}
					renderTextLayer={false}
					renderAnnotationLayer={false}
					onRenderSuccess={onPageLoadSuccess}
				></Page>
			</Document>
			<Flex
				direction={'row'}
				color={'white'}
				width={'100%'}
				align={'center'}
				justify={'center'}
				display={isLoaded ? 'flex' : 'none'}
				gap={3}
			>
				<Button
					backgroundColor={'#1d1d1d'}
					onClick={() => {
						setPageNumber(pageNumber - 1 < 1 ? 1 : pageNumber - 1);
					}}
				>
					{'<'}
				</Button>
				<Box textAlign={'center'} color={'#1d1d1d'}>
					{pageNumber}
				</Box>
				<Button
					backgroundColor={'#1d1d1d'}
					onClick={() => {
						setPageNumber(pageNumber + 1 > numPages ? numPages : pageNumber + 1);
					}}
				>
					{'>'}
				</Button>
			</Flex>
		</Flex>
	);
};

export default PdfViewer;
