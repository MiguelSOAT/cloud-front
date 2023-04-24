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
	Toast,
	ToastProps,
	VStack,
	useDisclosure,
	useToast,
	useColorModeValue,
	Button
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { DownloadIcon, CheckIcon, DeleteIcon } from '@chakra-ui/icons';
import { MouseEventHandler, useRef, useState } from 'react';
import { saveAs } from 'file-saver';
import './image-box.css';
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
	const imageSrc = `data:image/png;base64,${property.image}`;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [progress, setProgress] = useState(0);
	const toast = useToast();
	const toastIdRef = useRef<string | number | undefined>();
	const charToastLength = 15;
	const [isHovered, setIsHovered] = useState(false);

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

	function addDeleteToast() {
		toastIdRef.current = toast({
			position: 'bottom-left',
			duration: 2000,
			title: 'File deleted',
			status: 'success',
			isClosable: true
		});
	}

	const noPreviewText = (
		<VStack bg={'gray.700'} padding={'20px'} borderRadius={'full'} color={'white'}>
			<Text display="flex" fontSize={20} fontWeight="bold">
				{property.extension}
			</Text>
			<Text display="flex" fontSize={15} fontWeight="normal">
				No preview available
			</Text>
		</VStack>
	);
	const flexPreview = property.hasPreview ? (
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
		noPreviewText
	);

	const modalPreview = property.hasPreview ? (
		<Image
			src={imageSrc}
			alt={property.imageAlt}
			fit="cover"
			verticalAlign="center"
			align="center"
			margin="5px"
			borderRadius={5}
		/>
	) : (
		noPreviewText
	);

	const downloadFile = async () => {
		addDownloadToast();
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

		handleDownload(response);
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
				addDeleteToast();
				onClose();
				property.onDelete(property.fileId);
			})
			.catch(() => {
				// window.location.reload();
			});
	};

	const handleDownload = async (response: any) => {
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
					setProgress((loaded / total) * 100);
					update((loaded / total) * 100);
					chunks.push(value);
				}
				const blob = new Blob(chunks, { type: contentType });
				console.log(blob);
				saveAs(blob, property.title, {
					autoBom: false
				});
			}
		} else {
			console.error('Download failed');
		}
	};

	return (
		<Box maxW="sm" borderWidth="1px" borderRadius="lg" background={'white'} h={'fit-content'}>
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
					className={isHovered ? 'hover-effect' : ''}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{flexPreview}
				</Center>
				<Flex color="white" flexDirection={'row-reverse'} marginY={'5px'}>
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
