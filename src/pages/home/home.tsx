import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import Header from '../../template/header/header';
import { Box, Flex, IconButton, SimpleGrid } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';

function Home() {
	// Define data for the chart
	ChartJS.register(ArcElement, Tooltip, Legend);
	const data = {
		labels: ['GDrive', 'Telegram', 'APP Upload'],
		datasets: [
			{
				data: [10, 10, 80],
				backgroundColor: ['#ea4335', '#338be1', '#313E50'],
				hoverBackgroundColor: ['#FFCE56', '#FFCE56', '#FFCE56']
			}
		]
	};

	const barData = {
		labels: ['January', 'February', 'March', 'April', 'May', 'June'],
		datasets: [
			{
				label: 'Sales',
				data: [45, 65, 80, 81, 56, 55],
				backgroundColor: 'rgba(75,192,192,0.2)',
				borderColor: 'rgba(75,192,192,1)',
				borderWidth: 1
			}
		]
	};

	const options = {
		scales: {
			y: {
				beginAtZero: true
			}
		}
	};

	return (
		<Header>
			<SimpleGrid columns={2} spacing={10}>
				<Flex
					bg="gray.200"
					borderRadius={'2xl'}
					height={'max-content'}
					maxH={'60vh'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					padding={'20px'}
				>
					<Doughnut data={data} />
				</Flex>
				<Flex
					bg="gray.200"
					borderRadius={'2xl'}
					height={'max-content'}
					maxH={'60vh'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					padding={'20px'}
				>
					{/* <Bar data={data} options={options} /> */}
				</Flex>
				<Flex
					bg="gray.200"
					borderRadius={'2xl'}
					height={'max-content'}
					maxH={'60vh'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					padding={'20px'}
				>
					<Doughnut data={data} />
				</Flex>
				<Flex
					bg="gray.200"
					borderRadius={'2xl'}
					height={'max-content'}
					maxH={'60vh'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					padding={'20px'}
				>
					<Doughnut data={data} />
				</Flex>
				<Flex
					bg="gray.200"
					borderRadius={'2xl'}
					height={'max-content'}
					maxH={'60vh'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					padding={'20px'}
				>
					<Doughnut data={data} />
				</Flex>
				<Flex
					bg="gray.200"
					borderRadius={'2xl'}
					height={'max-content'}
					maxH={'60vh'}
					direction={'column'}
					justify={'center'}
					align={'center'}
					padding={'20px'}
				>
					<Doughnut data={data} />
				</Flex>
			</SimpleGrid>
		</Header>
	);
}

export default Home;
