import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	Title,
	ChartData
} from 'chart.js';
import { Doughnut, Bar, Pie } from 'react-chartjs-2';
import Header from '../../template/header/header';
import { Box, Flex, IconButton, SimpleGrid, Spacer, Text, border } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import axios from 'axios';
import Lottie from 'lottie-react';
import welcomeAnimation from '../../assets/lottie/welcome.json';
import { IUserStats } from './interface';
import { useEffect, useState } from 'react';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface Data {
	labels: string[];
	datasets: ChartData[];
}

interface IStats {
	userStats: IUserStats;
}

function Home() {
	// Define data for the chart
	ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

	const [data, setData] = useState<any | null>(null);

	const [dataTypeCount, setDataTypeCount] = useState<any | null>(null);
	const [dataTypeSize, setDataTypeSize] = useState<any | null>(null);

	const [dataSourceCount, setDataSourceCount] = useState<any | null>(null);
	const [dataSourceSize, setDataSourceSize] = useState<any | null>(null);

	const [sourceHigherNumberFiles, setSourceHigherNumberFiles] = useState<string>('WEBAPP');
	const [sourceHigherSize, setSourceHigherSize] = useState<string>('WEBAPP');

	const [typeHigherNumberFiles, setTypeHigherSize] = useState<string>('WEBAPP');
	const [typeHigherSize, setTypeHigherNumberFiles] = useState<string>('WEBAPP');

	const [totalSize, setTotalSize] = useState<string>('0');
	const [totalConsumtion, setTotalConsumtion] = useState<string>('0');
	const [totalConsumptionPercentage, setTotalConsumptionPercentage] = useState<string>('0');

	const indexAxiosType: 'x' | 'y' | undefined = 'y';

	const colorList = [
		'#FF6384', // Rosa
		'#009688', // Verde oscuro
		'#FFA726', // Naranja claro
		'#8D6E63', // Marrón
		'#36A2EB', // Azul claro
		'#FF3D00', // Rojo oscuro
		'#FFCE56', // Amarillo claro
		'#4CAF50', // Verde
		'#FF5722', // Naranja oscuro
		'#52D681', // Verde claro
		'#EF5350', // Rojo claro
		'#2196F3', // Azul claro
		'#F06292', // Rosa claro
		'#3F51B5', // Azul medio
		'#FF9800', // Naranja
		'#8BC34A', // Verde claro
		'#673AB7', // Morado
		'#FF7043', // Naranja claro
		'#8C728D', // Púrpura
		'#03A9F4' // Azul
	];
	const options = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false
			}
			// title: {
			// 	display: false,
			// 	text: 'Chart.js Bar Chart'
			// }
		}
		// scales: {
		// 	x: { display: false },
		// 	y: { display: false }
		// },
		// indexAxis: indexAxiosType
	};

	const dataTypesSize = {
		labels: ['JPG', 'PNG', 'PDF'],
		datasets: [
			{
				label: 'Total size',
				backgroundColor: '#ff3d00',
				// borderColor: '',
				borderWidth: 0,
				borderRadius: 20,
				data: [4, 5, 6]
			}
		]
	};

	const optionsTypesSize = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false
			}
			// title: {
			// 	display: false,
			// 	text: 'Chart.js Bar Chart'
			// }
		},
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'MB'
				}
			}
		}
		// scales: {
		// 	x: { display: false },
		// 	y: { display: false }
		// },
		// indexAxis: indexAxiosType
	};

	const optionsTypesCount = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false
			}
			// title: {
			// 	display: false,
			// 	text: 'Chart.js Bar Chart'
			// }
		},
		// scales: {
		// 	y: {
		// 		beginAtZero: true,
		// 		title: {
		// 			display: true,
		// 			text: 'Number of files'
		// 		}
		// 	}
		// }
		scales: {
			x: { display: true },
			y: { display: false }
		}
		// indexAxis: indexAxiosType
	};

	const fixDecimal = (value: number): string => {
		return (Math.round(value * 100) / 100).toFixed(2);
	};

	useEffect(() => {
		// Realiza la llamada fetch para obtener los datos del dataset
		axios.get('api/v1/user/stats').then((res) => {
			const responseBody: IStats = res.data;

			const totalSize = responseBody.userStats.storage.total / 1e9;
			const totalConsumtion = responseBody.userStats.storage.used / 1e9;

			setTotalSize(fixDecimal(totalSize));
			setTotalConsumtion(fixDecimal(totalConsumtion));
			setTotalConsumptionPercentage(fixDecimal((totalConsumtion / totalSize) * 100));
			setData({
				labels: ['Total Gastado (GB)', 'Total Libre (GB)'],
				datasets: [
					{
						data: [totalConsumtion, totalSize - totalConsumtion],
						backgroundColor: ['#ff3d00', '#52d681'],
						borderWidth: 0
					}
				]
			});

			const typesData = responseBody.userStats.fileTypes;
			const typesLabel: string[] = [];
			const typesDatasetCount: number[] = [];
			const typesDatasetSize: number[] = [];
			let typeHigherNumberFiles = '';
			let typeHigherSize = '';
			for (const [key, value] of Object.entries(typesData)) {
				typesLabel.push(key.toUpperCase());
				typesDatasetCount.push(value.count);
				typesDatasetSize.push(value.size / 1e9);

				if (!typeHigherNumberFiles || typesData[typeHigherNumberFiles]?.count < value.count) {
					typeHigherNumberFiles = key;
				}

				if (!typeHigherSize || typesData[typeHigherSize]?.size < value.size) {
					typeHigherSize = key;
				}
			}
			setTypeHigherSize(typeHigherSize.toUpperCase());
			setTypeHigherNumberFiles(typeHigherNumberFiles.toUpperCase());

			setDataTypeCount({
				labels: typesLabel,
				datasets: [
					{
						label: 'Total count',
						backgroundColor: colorList,
						// borderColor: '',
						borderWidth: 0,
						borderRadius: 20,
						data: typesDatasetCount || []
					}
				]
			});

			setDataTypeSize({
				labels: typesLabel,
				datasets: [
					{
						data: typesDatasetSize || [],
						backgroundColor: colorList,
						borderWidth: 0
					}
				]
			});

			const sourceData = responseBody.userStats.sourceStats;
			const sourceLabel: string[] = [];
			const sourceDatasetCount: number[] = [];
			const sourceDatasetSize: number[] = [];
			let sourceHigherNumberFiles = '';
			let sourceHigherSize = '';
			for (const [key, value] of Object.entries(sourceData)) {
				sourceLabel.push(key.toUpperCase());
				sourceDatasetCount.push(value.count);
				sourceDatasetSize.push(value.size / 1e9);
				if (!sourceHigherNumberFiles || sourceData[sourceHigherNumberFiles]?.count < value.count) {
					sourceHigherNumberFiles = key;
				}

				if (!sourceHigherSize || sourceData[sourceHigherSize]?.size < value.size) {
					sourceHigherSize = key;
				}
			}

			setSourceHigherSize(sourceHigherSize.toUpperCase());
			setSourceHigherNumberFiles(sourceHigherNumberFiles.toUpperCase());

			setDataSourceSize({
				labels: sourceLabel,
				datasets: [
					{
						data: sourceDatasetSize || [],
						backgroundColor: colorList,
						borderWidth: 0
					}
				]
			});

			setDataSourceCount({
				labels: sourceLabel,
				datasets: [
					{
						label: 'Total count',
						backgroundColor: colorList,
						// borderColor: '',
						borderWidth: 0,
						borderRadius: 20,
						data: sourceDatasetCount || []
					}
				]
			});
		});
	}, []);

	const plugins = [ChartDataLabels];

	return (
		<Header>
			<Flex direction={'column'} gap={8} overflow={'hidden'} color={'#f1f1f1'}>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align={'left'}
					gap={8}
					justifyContent="space-between"
				>
					<Flex
						width={{ base: '100%', md: '60%' }}
						bg="#1d1d1d"
						borderRadius={'2xl'}
						padding={{ base: '5', md: '10' }}
						direction={'column'}
					>
						<Text
							fontSize="5xl"
							fontWeight="light"
							// color="#1d1d1d"
							align={'center'}
							display="flex"
							alignItems="center"
						>
							Welcome back, {localStorage.getItem('username')}!
						</Text>
						<Box padding={{ base: '20px 5%', md: '0 15%' }}>
							<Lottie animationData={welcomeAnimation} />
						</Box>
					</Flex>
					<Flex
						width={{ base: '100%', md: '37.5%' }}
						bg="#1d1d1d"
						borderRadius={'2xl'}
						padding={'10'}
						direction={'column'}
						gap={12}
						// padding={{ base: '20px 5%', md: '0 15%' }}
					>
						<Text fontSize={'2xl'} fontWeight="light">
							You have consumed {totalConsumptionPercentage}% of available space 💾
						</Text>
						<Box margin={'auto'} width={'100%'}>
							{data && (
								<Doughnut
									data={data}
									options={options}
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
												ctx.fillText(`${totalConsumtion}GB of ${totalSize} GB`, centerX, centerY);
											}
										}
									]}
								/>
							)}
						</Box>
					</Flex>
				</Flex>
				<Flex align={'left'} bg="#1d1d1d" borderRadius={'2xl'} padding={{ base: '5', md: '2vw' }}>
					<Text fontSize={'2xl'} fontWeight={'light'}>
						Here are some statistics on the types of files uploaded! 📁
					</Text>
				</Flex>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align={'left'}
					gap={8}
					justifyContent="space-between"
				>
					<Flex
						width={{ base: '100%', md: '37.5%' }}
						bg="#1d1d1d"
						borderRadius={'2xl'}
						padding={{ base: '5', md: '10' }}
						direction={'column'}
						gap={8}
					>
						<Text fontSize={'2xl'} fontWeight="light">
							The file type with the largest storage used is{' '}
							<span
								style={{
									fontWeight: 'bold'
								}}
							>
								{typeHigherSize}
							</span>
						</Text>

						{dataTypeSize && (
							<Box margin={'auto'} width={'90%'}>
								<Pie
									data={dataTypeSize}
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
					<Flex
						width={{ base: '100%', md: '60%' }}
						bg="#1d1d1d"
						borderRadius={'2xl'}
						padding={'10'}
						direction={'column'}
						gap={8}
					>
						<Text fontSize={'2xl'} fontWeight="light">
							The file type with the largest number of units is{' '}
							<span
								style={{
									fontWeight: 'bold'
								}}
							>
								{typeHigherNumberFiles}
							</span>
						</Text>
						{dataTypeCount && (
							<Box margin={'auto auto 0'} width={'90%'}>
								<Bar data={dataTypeCount} options={optionsTypesCount} />
							</Box>
						)}
					</Flex>
				</Flex>
				<Flex align={'left'} bg="#1d1d1d" borderRadius={'2xl'} padding={{ base: '5', md: '2vw' }}>
					<Text fontSize={'2xl'} fontWeight="light">
						These are the statistics on the origin of the uploaded files! 📊
					</Text>
				</Flex>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align={'left'}
					gap={8}
					justifyContent="space-between"
				>
					<Flex
						width={{ base: '100%', md: '48.75%' }}
						bg="#1d1d1d"
						borderRadius={'2xl'}
						padding={'10'}
						direction={'column'}
						gap={8}
					>
						<Text fontSize={'2xl'} fontWeight="light">
							The source with the higher number of files uploaded is{' '}
							<span
								style={{
									fontWeight: 'bold'
								}}
							>
								{sourceHigherNumberFiles}
							</span>
						</Text>
						{dataSourceCount && (
							<Box margin={'auto auto 0'} width={'70%'}>
								<Bar data={dataSourceCount} options={optionsTypesCount} />
							</Box>
						)}
					</Flex>
					<Flex
						width={{ base: '100%', md: '48.75%' }}
						bg="#1d1d1d"
						borderRadius={'2xl'}
						padding={{ base: '5', md: '10' }}
						direction={'column'}
						gap={8}
					>
						<Text fontSize={'2xl'} fontWeight="light">
							The source with the higher size cuota is{' '}
							<span
								style={{
									fontWeight: 'bold'
								}}
							>
								{sourceHigherSize}
							</span>
						</Text>
						{dataSourceSize && (
							<Box margin={'auto'} width={'70%'}>
								<Pie
									data={dataSourceSize}
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
				</Flex>
			</Flex>
		</Header>
	);
}

export default Home;
