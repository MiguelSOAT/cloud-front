import { Box, Flex, Text } from '@chakra-ui/react';
import { Bar } from 'react-chartjs-2';

export default function BarComponent(props: any) {
	return (
		<Flex
			width={props.width}
			bg="#1d1d1d"
			borderRadius={'2xl'}
			padding={'10'}
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
					{props.typeHigherNumberFiles}
				</span>
			</Text>
			{props.dataTypeCount && (
				<Box margin={'auto auto 0'} width={'90%'}>
					<Bar data={props.dataTypeCount} options={props.optionsTypesCount} />
				</Box>
			)}
		</Flex>
	);
}
