import React from 'react';
import ImageBox from '../../components/box';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import imagenImportada from '../../assets/imagen1_2.jpg';
import imagenImportada2 from '../../assets/imagen2_2.jpg';

const style = {
	height: 30,
	border: '1px solid green',
	margin: 6,
	padding: 8
};
interface status {
	items: JSX.Element[];
}
class App extends React.Component {
	getRandomPhoto() {
		const array = [imagenImportada, imagenImportada2];
		const random = Math.floor(Math.random() * array.length);
		return array[random];
	}

	getMoreImages() {
		const array: JSX.Element[] = this.state ? this.state.items : [];
		for (let i = 0; i < 25; i++) {
			array.push(this.getPhotoComponent());
		}

		return array;
	}

	getPhotoComponent(): JSX.Element {
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
				image={this.getRandomPhoto()}
			></ImageBox>
		);
	}

	state: status = {
		items: this.getMoreImages()
	};

	fetchMoreData = () => {
		// a fake async api call like which sends
		// 20 more records in 1.5 secs
		setTimeout(() => {
			this.setState({
				items: this.getMoreImages()
			});
		}, 3000);
	};

	render() {
		return (
			<div>
				<InfiniteScroll
					dataLength={this.state.items.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<h4>Loading...</h4>}
				>
					<SimpleGrid columns={[2, 3, 4]} spacing={10}>
						{this.state.items}
					</SimpleGrid>
				</InfiniteScroll>
			</div>
		);
	}
}

export default App;
