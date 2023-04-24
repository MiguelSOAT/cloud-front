import { DownloadIcon } from '@chakra-ui/icons';
import { IconButton, Box } from '@chakra-ui/react';
import React, { useRef } from 'react';

const FloatingUploadButton: React.FC = () => {
	const fileInputRef = useRef<HTMLInputElement | null>(null);

	const handleFileInputChange = async () => {
		const file = fileInputRef.current?.files && fileInputRef.current?.files[0];
		if (file) {
			// Handle file here or trigger submit
			console.log(file);
			await handleSubmit(); // Trigger form submission
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
			formData.append('file', fileInputRef.current.files[0]);

			try {
				const response = await fetch('/api/v1/files', {
					method: 'POST',
					body: formData
				});

				// Handle response from backend
				console.log(response);
			} catch (error) {
				// Handle error
				console.error(error);
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
					colorScheme="teal"
					aria-label="Send email"
					icon={<DownloadIcon />}
					onClick={handleButtonClick}
				/>
				<input
					type="file"
					ref={fileInputRef}
					style={{ display: 'none' }}
					onChange={handleFileInputChange}
				/>
			</form>
		</Box>
	);
};

export default FloatingUploadButton;
