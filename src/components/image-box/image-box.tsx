import { Badge, Box } from '@chakra-ui/layout';
import {
	Center,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	VStack,
	useDisclosure,
	useToast
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { DownloadIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import { timeEnd } from 'console';
interface imageProps {
	imageAlt: string;
	title: string;
	image: string;
	extension: string;
	hasPreview: boolean;
	fileId: number;
	fileSize: number;
	onDelete: (fileId: number) => void;
	origin: string;
}
function ImageBox(property: imageProps) {
	const imageSrc = `data:image/webp;base64,${property.image}`;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isHovered, setIsHovered] = useState(false);
	const toast = useToast();
	const toastIdRef = useRef<string | number | undefined>();
	const charToastLength = 15;
	const hasPreview = property.hasPreview && property.extension !== 'pdf';
	const isPDF = property.extension === 'pdf';

	function downloadToast(percentage: number, isFinished: boolean = false) {
		return (
			<Flex bg={'whiteAlpha.900'} borderRadius={'5px'} padding={'10px'} direction={'row'}>
				<CircularProgress value={percentage} color="green.400">
					<CircularProgressLabel>
						{isFinished ? (
							<CheckIcon alignContent={'center'} color={'green.400'} w={4} h={5} />
						) : (
							<DownloadIcon />
						)}
					</CircularProgressLabel>
				</CircularProgress>

				<Center marginLeft={'auto'} overflow={'hidden'} textAlign={'center'}>
					{property.title.length > charToastLength && '...'}
					{property.title.slice(property.title.length - charToastLength)}
				</Center>
			</Flex>
		);
	}

	function update(percentage: number) {
		if (toastIdRef.current) {
			const isFinished = percentage === 100;
			const finishedDelay = 3000;
			toast.update(toastIdRef.current, {
				description: percentage,
				position: 'bottom-left',
				duration: isFinished ? finishedDelay : null,
				render: () => downloadToast(percentage, isFinished)
			});
		}
	}

	function addDownloadToast() {
		toastIdRef.current = toast({
			description: '0',
			position: 'bottom-left',
			duration: null,
			render: () => downloadToast(10)
		});
	}

	function addToast(
		title: string,
		subtitle: string,
		status: 'success' | 'error' | 'warning' | 'info'
	) {
		toastIdRef.current = toast({
			position: 'bottom-left',
			duration: 2000,
			title: title,
			description: subtitle,
			status: status
		});
	}

	const noPreviewText = (isPDF: boolean = false) => {
		return (
			<VStack bg={'gray.700'} padding={'20px'} borderRadius={'full'} color={'#fafafa'}>
				<Text display="flex" fontSize={20} fontWeight="bold">
					{property.extension}
				</Text>
				<Text display="flex" fontSize={15} fontWeight="normal">
					{isPDF ? 'Click to preview' : 'No preview available'}
				</Text>
			</VStack>
		);
	};
	const flexPreview = hasPreview ? (
		<Image
			src={imageSrc}
			alt={property.imageAlt}
			fit="cover"
			verticalAlign="center"
			align="center"
			margin="auto"
			borderRadius={5}
		/>
	) : (
		noPreviewText(property.extension === 'pdf')
	);

	const modalPreview = hasPreview ? (
		<Image
			src={imageSrc}
			alt={property.imageAlt}
			fit="cover"
			verticalAlign="center"
			align="center"
			margin="5px"
			borderRadius={5}
		/>
	) : isPDF ? (
		<object
			data={`data:application/pdf;base64,${property.image}`}
			type="application/pdf"
			width="100%"
			height="600px"
		>
			<p>Unable to display PDF file. Download instead</p>
		</object>
	) : (
		noPreviewText()
	);

	const doGetFile = async () => {
		const response = await fetch(`/api/v1/file?id=${property.fileId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}, // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin',
			redirect: 'follow'
		});

		return response;
	};

	const downloadFile = async () => {
		addDownloadToast();

		const response = await doGetFile();
		const downloadedData = await handleDownload(response);

		if (downloadedData?.blob) {
			saveAs(downloadedData.blob, downloadedData.fileName, {
				autoBom: false
			});
		}
	};

	const deleteFile = () => {
		fetch(`/api/v1/file?id=${property.fileId}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			}, // *GET, POST, PUT, DELETE, etc.
			mode: 'same-origin', // no-cors, *cors, same-origin
			cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
			credentials: 'same-origin',
			redirect: 'follow'
		})
			.then((res) => {
				addToast('File delete', 'File deleted successfully', 'success');
				onClose();
				property.onDelete(property.fileId);
			})
			.catch(() => {
				addToast('File delete', 'Error deleting file', 'error');
			});
	};

	const handleDownload = async (
		response: any
	): Promise<
		| {
				blob: Blob;
				fileName: string;
		  }
		| undefined
	> => {
		if (response.ok) {
			const contentLength = response.headers.get('Content-Length');
			const contentType = response.headers.get('content-type');
			if (contentLength) {
				const total = parseInt(contentLength, 10);
				let loaded = 0;

				const readableStream = response.body;
				const reader = readableStream?.getReader();
				const chunks = [];
				if (!reader) return;
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					loaded += value.length;
					// setProgress((loaded / total) * 100);
					update((loaded / total) * 100);
					chunks.push(value);
				}
				const blob = new Blob(chunks, { type: contentType });
				const fileName = response.headers
					.get('Content-Disposition')
					?.split('filename=')[1]
					.replace(/"/g, '');
				console.log(fileName);
				return {
					blob,
					fileName
				};
			}
		} else {
			console.error('Download failed');
		}
	};

	return (
		<Box
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			background={'#1d1d1d'}
			h={'fit-content'}
			boxShadow={'lg'}
			margin={2}
			padding={'2'}
			overflow={'hidden'}
		>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay bg="none" backdropFilter="auto" backdropInvert="25%" backdropBlur="2px" />
				<ModalContent>
					{/* <ModalHeader></ModalHeader> */}
					<ModalCloseButton />
					<ModalBody>
						<Center flex="1" minH={'200px'} margin={'10px'} marginTop={'30px'}>
							{modalPreview}
						</Center>
					</ModalBody>
					<ModalFooter>
						<Badge
							margin={'5px'}
							w={'fit-content'}
							borderRadius="full"
							colorScheme="green"
							variant="solid"
							padding={'5px'}
							paddingLeft={'10px'}
							paddingRight={'10px'}
							fontSize={'12px'}
							cursor={'pointer'}
							onClick={downloadFile}
						>
							<DownloadIcon /> Download
						</Badge>
						<Badge
							margin={'5px'}
							w={'fit-content'}
							borderRadius="full"
							colorScheme="red"
							variant="solid"
							padding={'5px'}
							paddingLeft={'10px'}
							paddingRight={'10px'}
							fontSize={'12px'}
							cursor={'pointer'}
							onClick={deleteFile}
						>
							<DeleteIcon /> Delete
						</Badge>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Flex color="white" flexDirection={'column'}>
				<Center
					flex="1"
					minH={'200px'}
					margin={'5%'}
					marginTop={'10%'}
					onClick={onOpen}
					cursor={'pointer'}
					_hover={{
						transform: 'scale(1.1)',
						transition: 'all 0.3s ease-in-out',
						zIndex: '1'
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{flexPreview}
				</Center>
				<Flex
					color="white"
					flexDirection={{
						base: 'column',
						md: 'row-reverse'
					}}
					marginY={'5px'}
					gap={5}
					justify={'center'}
				>
					<Badge marginX={'5px'} w={'fit-content'} borderRadius="full" px="2" colorScheme="teal">
						{property.extension}
					</Badge>
					<Badge marginX={'5px'} w={'fit-content'} borderRadius="full" px="2" colorScheme="gray">
						{(property.fileSize * 1e-6).toPrecision(2)}MB
					</Badge>
					<Badge
						marginX={'5px'}
						w={'fit-content'}
						borderRadius="full"
						px="2"
						colorScheme="telegram"
					>
						{property.origin}
					</Badge>
				</Flex>
			</Flex>
		</Box>
	);
}

export default ImageBox;
