import { Flex, Text } from '@chakra-ui/react';

export default function StatisticsTextHeader(props: any) {
	return (
		<Flex align={'left'} bg="#1d1d1d" borderRadius={'2xl'} padding={{ base: '5', md: '2vw' }}>
			<Text fontSize={'2xl'} fontWeight={'light'}>
				{props.text}
			</Text>
		</Flex>
	);
}
