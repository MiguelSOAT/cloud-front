import React from 'react';
import ImageBox from '../../components/box';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

interface status {
	items: JSX.Element[];
}

interface image {
	file_name: string;
	file_base64: string;
}

class App extends React.Component {
	getMoreImages(images: image[]) {
		const array: JSX.Element[] = this.state ? this.state.items : [];
		for (const image of images) {
			array.push(this.getPhotoComponent(image));
		}

		return array;
	}

	getPhotoComponent(image: image): JSX.Element {
		return (
			<ImageBox
				imageUrl="https://bit.ly/2Z4KKcF"
				imageAlt="Rear view of modern home with pool"
				beds={3}
				baths={2}
				title={image.file_name}
				formattedPrice="$1900.00"
				reviewCount={34}
				rating={4}
				image={image.file_base64}
			></ImageBox>
		);
	}

	state: status = {
		items: []
	};

	fetchMoreData = async () => {
		const response = await axios.get('http://192.168.0.146:8080/');
		const images = await response.data.images;
		console.log('requested');
		this.setState({
			items: this.getMoreImages(images)
		});
	};

	render() {
		if (this.state.items.length === 0) {
			this.fetchMoreData();
		}
		return (
			<div>
				<InfiniteScroll
					dataLength={this.state.items.length}
					next={this.fetchMoreData}
					hasMore={true}
					loader={<Spinner />}
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
