import './files.css';
import ImageBox from '../../components/box';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import imagenImportada from '../../assets/imagen1_2.jpg';
import imagenImportada2 from '../../assets/imagen2_2.jpg';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';

function Files() {
	useEffect(() => {
		getMoreImages();
	}, []);
	const initialPost: JSX.Element[] = [];

	const [dataPost, setDataPost] = useState(initialPost);
	const [scrollData, setScrollData] = useState(initialPost);
	const [hasMoreValue, setHasMoreValue] = useState(true);

	useEffect(() => {
		getMoreImages();
	}, []);

	function handleOnRowsScrollEnd() {
		setHasMoreValue(true);
		getMoreImages();
	}
	return (
		<>
			{scrollData ? (
				<>
					<InfiniteScroll
						dataLength={scrollData.length}
						next={handleOnRowsScrollEnd}
						hasMore={hasMoreValue}
						scrollThreshold={1}
						loader={<Spinner />}
						// Let's get rid of second scroll bar
						style={{ overflow: 'unset' }}
					>
						<SimpleGrid columns={[1, 2, 4]} spacing={10}>
							{scrollData.map((pokemon, index) => pokemon)}
						</SimpleGrid>
					</InfiniteScroll>
				</>
			) : (
				<Spinner />
			)}
		</>
	);

	function getRandomPhoto() {
		const array = [imagenImportada, imagenImportada2];
		const random = Math.floor(Math.random() * array.length);
		return array[random];
	}

	function getMoreImages() {
		const array: JSX.Element[] = dataPost;
		for (let i = 0; i < 20; i++) {
			array.push(getPhotoComponent());
			console.log(array.length);
		}
		setDataPost(array);
	}

	function getPhotoComponent(): JSX.Element {
		return (
			<ImageBox
				imageUrl="https://bit.ly/2Z4KKcF"
				imageAlt="Rear view of modern home with pool"
				beds={3}
				baths={2}
				title="Modern home in city center in the heart of historic Los Angeles"
				formattedPrice="$1900.00"
				reviewCount={34}
				rating={4}
				image={getRandomPhoto()}
			></ImageBox>
		);
	}
}

export default Files;
