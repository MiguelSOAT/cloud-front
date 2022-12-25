import { Badge, Box } from '@chakra-ui/layout';
import { Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

interface imageProps {
	imageUrl: string;
	imageAlt: string;
	beds: number;
	baths: number;
	title: string;
	formattedPrice: string;
	reviewCount: number;
	rating: number;
	image: string;
	extension: string;
}

function ImageBox(property: imageProps) {
	return (
		<Box
			maxW="sm"
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			background="blackAlpha.100"
		>
			<Image
				src={`data:image/png;base64,${property.image}`}
				alt={property.imageAlt}
				fit="cover"
				verticalAlign="center"
				align="center"
				margin="auto"
				borderRadius={5}
			/>

			<Box p="6">
				{/* <Box display="flex" alignItems="baseline">
					<Box
						color="gray.500"
						fontWeight="semibold"
						letterSpacing="wide"
						fontSize="xs"
						textTransform="uppercase"
						ml="2"
					>
						{property.beds} beds &bull; {property.baths} baths
					</Box>
				</Box> */}

				<Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" noOfLines={1}>
					{property.title}
				</Box>
			</Box>
			<Box display="flex" mt="2" alignItems="right" noOfLines={1}>
				<Badge borderRadius="full" px="2" colorScheme="teal">
					{property.extension}
				</Badge>
			</Box>
		</Box>
	);
}

export default ImageBox;
