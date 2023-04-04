import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	useDisclosure,
	ModalCloseButton,
	Center,
	Flex
} from '@chakra-ui/react';
import { useState } from 'react';
import './modal-carrousel.css';

export default function ModalCarrousel({ children, title, ...props }: any) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [currentSlide, setCurrentSlide] = useState(props.imageIndex);

	const handleSlideChange = (index: number) => {
		setCurrentSlide(index);
	};

	const slides = [
		{
			title: 'Slide 1',
			image: 'https://via.placeholder.com/300x150'
		},
		{
			title: 'Slide 2',
			image: 'https://via.placeholder.com/300x150'
		},
		{
			title: 'Slide 3',
			image: 'https://via.placeholder.com/300x150'
		}
	];

	const renderSlides = () => {
		return slides.map(
			(slide, index) =>
				currentSlide === index && (
					<Flex key={index} flexDirection={'column'}>
						<Center flex="1" minH={'200px'} margin={'2px'}>
							{/* {props.hasPreview ? ( */}
							<img src={slide.image} alt={slide.title} />
						</Center>
						<p>{slide.title}</p>
					</Flex>
				)
		);
	};
	return (
		<>
			<Modal isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay bg="none" backdropFilter="auto" backdropInvert="25%" backdropBlur="2px" />
				<ModalContent>
					{/* <ModalHeader></ModalHeader> */}
					<ModalCloseButton />
					<ModalBody>{renderSlides()}</ModalBody>
					<ModalFooter>
						{slides.map((slide, index) => (
							<button key={index} onClick={() => handleSlideChange(index)}>
								{index + 1}
							</button>
						))}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
}
