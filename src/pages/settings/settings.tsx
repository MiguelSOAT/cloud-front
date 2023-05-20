import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Heading,
	Stack,
	Text,
	Image,
	useColorModeValue
} from '@chakra-ui/react';
import Header from '../../template/header/header';
import { FiSend } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function Settings() {
	return (
		<Header>
			<Card
				direction={{ base: 'column', sm: 'row' }}
				overflow="hidden"
				variant="outline"
				bg={'#1d1d1d'}
				color={'white'}
			>
				<Image
					objectFit="cover"
					maxW={{ base: '100%', sm: '200px' }}
					src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
					alt="Caffe Latte"
				/>

				<Stack>
					<CardBody alignContent="center">
						<Heading size="md">Telegram</Heading>

						<Text py="2">Easily sync files from telegram</Text>
					</CardBody>

					<CardFooter>
						<Button variant="solid" colorScheme="telegram" leftIcon={<FiSend />}>
							<Link to={'/settings/telegram'}>Configurate</Link>
						</Button>
					</CardFooter>
				</Stack>
			</Card>
		</Header>
	);
}

export default Settings;
