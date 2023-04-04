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
	useToast
} from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';
interface imageProps {
	imageAlt: string;
	title: string;
	image: string;
	extension: string;
	hasPreview: boolean;
	fileId: number;
}

function ImageBox(property: imageProps) {
	const imageSrc = `data:image/png;base64,${property.image}`;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [progress, setProgress] = useState(0);
	const toast = useToast();
	const toastIdRef = useRef<string | number | undefined>();

	function downloadToast(percentage: number) {
		return (
			<Box bg={'blue.600'} borderRadius={'5px'} padding={'10px'}>
				<CircularProgress value={percentage} color="green.400">
					<CircularProgressLabel>
						<DownloadIcon />
					</CircularProgressLabel>
				</CircularProgress>
			</Box>
		);
	}

	function update(percentage: number) {
		if (toastIdRef.current) {
			toast.update(toastIdRef.current, {
				description: percentage,
				position: 'bottom-right',
				duration: percentage === 100 ? 5000 : null,
				render: () => downloadToast(percentage)
			});
		}
	}

	function addToast() {
		toastIdRef.current = toast({
			description: '0',
			position: 'bottom-right',
			duration: null,
			render: () => downloadToast(10)
		});
	}

	const noPreviewText = (
		<VStack>
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
		addToast();
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

	const handleDownload = async (response: any) => {
		if (response.ok) {
			const contentLength = response.headers.get('Content-Length');
			if (contentLength) {
				const total = parseInt(contentLength, 10);
				let loaded = 0;

				const reader = response.body?.getReader();
				if (!reader) return;
				while (true) {
					const { done, value } = await reader.read();
					if (done) break;
					loaded += value.length;
					setProgress((loaded / total) * 100);
					update((loaded / total) * 100);
					console.log('Progress: ' + (loaded / total) * 100 + '%' + ' ' + loaded + '/' + total);
				}
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
			overflow="hidden"
			background="blackAlpha.300"
			h={'fit-content'}
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
						<DownloadIcon onClick={downloadFile} />
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Flex color="white" flexDirection={'column'}>
				<Center flex="1" minH={'200px'} margin={'2px'} onClick={onOpen}>
					{flexPreview}
				</Center>
				<Center flex="1" fontWeight="semibold" color={'blackAlpha.900'} noOfLines={1}>
					{property.title}
				</Center>
				<Badge margin={'5px'} w={'fit-content'} borderRadius="full" px="2" colorScheme="teal">
					{property.extension}
				</Badge>
			</Flex>
		</Box>
	);
}

export default ImageBox;
