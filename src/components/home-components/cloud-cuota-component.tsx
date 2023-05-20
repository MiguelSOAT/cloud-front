import { Box, Flex, Text } from '@chakra-ui/react';
import { Doughnut } from 'react-chartjs-2';

export default function CloudCuotaComponent(props: any) {
	return (
		<Flex
			width={{ base: '100%', md: '37.5%' }}
			bg="#1d1d1d"
			borderRadius={'2xl'}
			padding={'10'}
			direction={'column'}
			gap={12}
		>
			<Text fontSize={'2xl'} fontWeight="light">
				You have consumed {props.totalConsumptionPercentage}% of available space 💾
			</Text>
			<Box margin={'auto'} width={'100%'}>
				{props.data && (
					<Doughnut
						data={props.data}
						options={props.options}
						plugins={[
							{
								id: 'chartjs-plugin-datalabels',
								beforeDraw: (chart) => {
									const ctx = chart.ctx;
									ctx.fillStyle = '#ffffff';
									ctx.textBaseline = 'middle';
									ctx.textAlign = 'center';

									const centerX = (chart.chartArea.left + chart.chartArea.right) / 2;
									const centerY = (chart.chartArea.top + chart.chartArea.bottom) / 2;

									ctx.font = '1.25vmax Roboto light';
									ctx.fillText(
										`${props.totalConsumtion}GB of ${props.totalSize} GB`,
										centerX,
										centerY
									);
								}
							}
						]}
					/>
				)}
			</Box>
		</Flex>
	);
}
