import { Box, Flex, Text } from '@chakra-ui/react';
import { Pie } from 'react-chartjs-2';

export default function PieComponent(props: any) {
	return (
		<Flex
			width={props.width}
			bg="#1d1d1d"
			borderRadius={'2xl'}
			padding={{ base: '5', md: '10' }}
			direction={'column'}
			gap={8}
		>
			<Text fontSize={'2xl'} fontWeight="light">
				{props.title}{' '}
				<span
					style={{
						fontWeight: 'bold'
					}}
				>
					{props.typeHigherSize}
				</span>
			</Text>

			{props.dataTypeSize && (
				<Box margin={'auto'} width={'90%'}>
					<Pie
						data={props.dataTypeSize}
						options={{
							plugins: {
								legend: {
									display: false
								}
							}
						}}
					/>
				</Box>
			)}
		</Flex>
	);
}
