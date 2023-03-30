import { Button, Card, CardBody, CardFooter, Heading, Stack, Text, Image } from '@chakra-ui/react';
import Header from '../../template/header/header';

function Settings() {
	return (
		<Header>
			<Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
				<Image
					objectFit="cover"
					maxW={{ base: '100%', sm: '200px' }}
					src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
					alt="Caffe Latte"
				/>

				<Stack>
					<CardBody>
						<Heading size="md">Telegram</Heading>

						<Text py="2">
							To be able to synchronize files, you need to set your telegram account.
						</Text>
					</CardBody>

					<CardFooter>
						<Button variant="solid" colorScheme="blue">
							Buy Latte
						</Button>
					</CardFooter>
				</Stack>
			</Card>
		</Header>
	);
}

export default Settings;
