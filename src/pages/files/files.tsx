import ImageBox from '../../components/image-box/image-box';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Header from '../../components/header/header';
import { Component, MouseEventHandler, useState } from 'react';

interface status {
	items: JSX.Element[];
}

interface image {
	file_name: string;
	file_base64: string;
	extension: string;
	hasPreview: boolean;
	fileId: number;
	fileSize: number;
	origin: string;
}

class App extends Component {
	private isLoaded: boolean;
	private currentPage: number;
	private pages: number;
	private pageSize: number;
	private hasMoreData: boolean;
	public state: status = {
		items: []
	};

	constructor(props: any) {
		super(props);
		this.isLoaded = false;
		this.currentPage = 1;
		this.pages = 0;
		this.pageSize = 10;
		this.hasMoreData = true;
	}

	handleDelete = (fileId: number) => {
		for (const index in this.state.items) {
			const imageBox = this.state.items[index];
			if (imageBox.key === fileId.toString()) {
				this.state.items.splice(parseInt(index), 1);
				this.setState({ items: this.state.items });
				break;
			}
		}
	};

	getMoreImages(images: image[]) {
		const array: JSX.Element[] = this.state ? this.state.items : [];
		for (const imageIndex in images) {
			const image = images[imageIndex];
			array.push(this.getPhotoComponent(image, parseInt(imageIndex)));
		}

		return array;
	}

	getPhotoComponent(image: image, imageIndex: number): JSX.Element {
		return (
			<ImageBox
				imageAlt={image.file_name}
				title={image.file_name}
				image={image.file_base64}
				extension={image.extension}
				hasPreview={image.hasPreview}
				fileId={image.fileId}
				fileSize={image.fileSize}
				onDelete={this.handleDelete}
				key={image.fileId}
				origin={image.origin}
			></ImageBox>
		);
	}

	fetchMoreData = async () => {
		try {
			const response = await axios.get(
				'/api/v1/files?page=' + this.currentPage + '&pageSize=' + this.pageSize
			);
			const images = await response.data.images;
			this.currentPage += 1;
			this.hasMoreData = images.length === this.pageSize;
			if (!this.isLoaded) this.isLoaded = true;

			this.setState({
				items: this.getMoreImages(images)
			});
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		if (
			(this.state.items.length === 0 || this.state.items.length < this.pageSize) &&
			!this.isLoaded
		) {
			this.isLoaded = true;
			this.fetchMoreData();
		}
		return (
			<Header>
				<div>
					<InfiniteScroll
						dataLength={this.state.items.length}
						next={this.fetchMoreData}
						hasMore={this.hasMoreData}
						loader={<Spinner />}
					>
						<SimpleGrid columns={[2, 3, 4]} spacing={10} overflow={'auto'}>
							{this.state.items}
						</SimpleGrid>
					</InfiniteScroll>
				</div>
			</Header>
		);
	}
}

export default App;
