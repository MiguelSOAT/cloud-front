import { DownloadIcon } from '@chakra-ui/icons';
import { IconButton, Box, useToast } from '@chakra-ui/react';
import React, { useRef } from 'react';

const FloatingUploadButton: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const toast = useToast();

	const handleFileInputChange = async () => {
		const file = fileInputRef.current?.files && fileInputRef.current?.files[0];
		if (file) {
			await handleSubmit();
		}
	};

	const handleButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	const handleSubmit = async () => {
		if (fileInputRef.current?.files && fileInputRef.current?.files.length > 0) {
			const formData = new FormData();

			for (const fileIndex in fileInputRef.current.files) {
				formData.append('files', fileInputRef.current.files[fileIndex]);
			}

			try {
				const response = await fetch('/api/v1/files', {
					method: 'POST',
					body: formData
				});

				if (response.ok) {
					toast({
						title: 'File upload',
						description: 'Your file has been uploaded successfully',
						status: 'success',
						duration: 3000,
						position: 'bottom-left'
					});
				} else {
					toast({
						title: 'File upload',
						description: 'Error while trying to upload your file',
						status: 'error',
						duration: 3000,
						position: 'bottom-left'
					});
				}
			} catch (error) {
				toast({
					title: 'File upload',
					description: 'Error while trying to upload your file',
					status: 'error',
					duration: 3000,
					position: 'bottom-left'
				});
			}
		}
	};

	return (
		<Box
			position="fixed"
			bottom={4}
			right={4}
			borderRadius="full"
			p={4}
			bg="transparent"
			color="white"
			transform="scaleY(-1)"
			zIndex={100}
		>
			<form>
				<IconButton
					variant="solid"
					h={16}
					w={16}
					borderRadius={'full'}
					background="#1a51fb"
					aria-label="Upload file"
					icon={<DownloadIcon boxSize={6} />}
					_hover={{ bg: '#3264ff' }}
					onClick={handleButtonClick}
					boxShadow={'md'}
				/>

				<input
					type="file"
					multiple={true}
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileInputChange}
				/>
			</form>
		</Box>
	);
};

export default FloatingUploadButton;
