import {
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
	BarElement,
	CategoryScale,
	LinearScale,
	Title
} from 'chart.js';
import Header from '../../components/header/header';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { IUserStats, IUserStatsFileType, IUserStatsSource, fileType, source } from './interface';
import { useEffect, useState } from 'react';
import WelcomeComponent from '../../components/home-components/welcome-box';
import CloudCuotaComponent from '../../components/home-components/cloud-cuota-component';
import PieComponent from '../../components/home-components/pie-component';
import BarComponent from '../../components/home-components/bar-ccomponent';
import StatisticsTextHeader from '../../components/home-components/statistics-text-header';

interface IStats {
	userStats: IUserStats;
}

interface IParsedStats {
	label: string[];
	datasetCount: number[];
	datasetSize: number[];
	higherNumberFiles: string;
	higherSize: string;
}

function Home() {
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
		}
	};

	const optionsTypesCount = {
		responsive: true,
		maintainAspectRatio: true,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
			x: { display: true },
			y: { display: false }
		}
	};

	const fixDecimal = (value: number): string => {
		return (Math.round(value * 100) / 100).toFixed(2);
	};

	const parseStatistics = (
		data: Record<fileType, IUserStatsFileType> | Record<source, IUserStatsSource>
	): IParsedStats => {
		const label: string[] = [];
		const datasetCount: number[] = [];
		const datasetSize: number[] = [];
		let higherNumberFiles = '';
		let higherSize = '';

		for (const [key, value] of Object.entries(data)) {
			label.push(key.toUpperCase());
			datasetCount.push(value.count);
			datasetSize.push(value.size / 1e9);

			if (!higherNumberFiles || data[higherNumberFiles]?.count < value.count) {
				higherNumberFiles = key;
			}

			if (!higherSize || data[higherSize]?.size < value.size) {
				higherSize = key;
			}
		}

		return {
			label,
			datasetCount,
			datasetSize,
			higherNumberFiles,
			higherSize
		};
	};

	const barData = (stats: number[], labels: string[]) => {
		return {
			labels: labels,
			datasets: [
				{
					label: 'Total count',
					backgroundColor: colorList,
					borderWidth: 0,
					borderRadius: 20,
					data: stats || []
				}
			]
		};
	};

	const pieData = (stats: number[], labels: string[]) => {
		return {
			labels: labels,
			datasets: [
				{
					data: stats || [],
					backgroundColor: colorList,
					borderWidth: 0
				}
			]
		};
	};

	useEffect(() => {
		axios.get('api/v1/user/stats').then((res) => {
			const responseBody: IStats = res.data;

			const totalSize = responseBody.userStats.storage.total / 1e9;
			const totalConsumtion = responseBody.userStats.storage.used / 1e9;

			const parsedTypesStatistics = parseStatistics(responseBody.userStats.fileTypes);
			const parsedSourceStatistics = parseStatistics(responseBody.userStats.sourceStats);

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

			setTypeHigherSize(parsedTypesStatistics.higherSize.toUpperCase());
			setTypeHigherNumberFiles(parsedTypesStatistics.higherNumberFiles.toUpperCase());
			setDataTypeCount(barData(parsedTypesStatistics.datasetCount, parsedTypesStatistics.label));
			setDataTypeSize(pieData(parsedTypesStatistics.datasetSize, parsedTypesStatistics.label));

			setSourceHigherSize(sourceHigherSize.toUpperCase());
			setSourceHigherNumberFiles(sourceHigherNumberFiles.toUpperCase());
			setDataSourceCount(
				barData(parsedSourceStatistics.datasetCount, parsedSourceStatistics.label)
			);
			setDataSourceSize(pieData(parsedSourceStatistics.datasetSize, parsedSourceStatistics.label));
		});
	}, []);

	return (
		<Header>
			<Flex direction={'column'} gap={8} overflow={'hidden'} color={'#f1f1f1'}>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align={'left'}
					gap={8}
					justifyContent="space-between"
				>
					<WelcomeComponent />
					<CloudCuotaComponent
						totalConsumptionPercentage={totalConsumptionPercentage}
						data={data}
						options={options}
						totalConsumtion={totalConsumtion}
						totalSize={totalSize}
					/>
				</Flex>
				<StatisticsTextHeader
					text={'Here are some statistics on the types of files uploaded! 📁'}
				/>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align={'left'}
					gap={8}
					justifyContent="space-between"
				>
					<PieComponent
						width={{ base: '100%', md: '37.5%' }}
						title={'The file type with the largest storage used is'}
						typeHigherSize={typeHigherSize}
						dataTypeSize={dataTypeSize}
					/>
					<BarComponent
						width={{ base: '100%', md: '60%' }}
						typeHigherNumberFiles={typeHigherNumberFiles}
						dataTypeCount={dataTypeCount}
						optionsTypesCount={optionsTypesCount}
						title={'The file type with the largest number of units is'}
					/>
				</Flex>
				<StatisticsTextHeader
					text={'These are the statistics on the origin of the uploaded files! 📊'}
				/>
				<Flex
					direction={{ base: 'column', md: 'row' }}
					align={'left'}
					gap={8}
					justifyContent="space-between"
				>
					<BarComponent
						width={{ base: '100%', md: '48.75%' }}
						typeHigherNumberFiles={sourceHigherNumberFiles}
						dataTypeCount={dataSourceCount}
						optionsTypesCount={optionsTypesCount}
						title={'The source with the higher number of files uploaded is'}
					/>
					<PieComponent
						width={{ base: '100%', md: '48.75%' }}
						title={'The source with the higher size cuota is'}
						typeHigherSize={sourceHigherSize}
						dataTypeSize={dataSourceSize}
					/>
				</Flex>
			</Flex>
		</Header>
	);
}

export default Home;
