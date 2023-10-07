import ImageBox from '../../components/image-box/image-box';
import { SimpleGrid, Spinner } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import Header from '../../components/header/header';
import { Component, MouseEventHandler, useEffect, useState } from 'react';
import { socket } from '../../socket';
import followRedirect from '../../utils/follow-redirect';
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
	originalExtension: string;
}

export default function Files() {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [pageSize, setPageSize] = useState<number>(10);
	const [hasMoreData, setHasMoreData] = useState<boolean>(true);
	const [isLoaded, setIsLoaded] = useState<boolean>(false);
	const [state, setState] = useState<status>({
		items: []
	});

	socket.on('refreshFiles', async (username) => {
		if (username === localStorage.getItem('username')) {
			setCurrentPage(1);
			setHasMoreData(true);
			setIsLoaded(false);
			setState({ items: [] });
		}
	});

	const handleDelete = (fileId: number) => {
		for (const index in state.items) {
			const imageBox = state.items[index];
			if (imageBox.key === fileId.toString()) {
				state.items.splice(parseInt(index), 1);
				setState({ items: state.items });
				break;
			}
		}
	};

	const getMoreImages = (images: image[]) => {
		const array: JSX.Element[] = state ? state.items : [];
		for (const imageIndex in images) {
			const image = images[imageIndex];
			array.push(getPhotoComponent(image, parseInt(imageIndex)));
		}

		return array;
	};

	const getPhotoComponent = (image: image, imageIndex: number): JSX.Element => {
		return (
			<ImageBox
				imageAlt={image.file_name}
				title={image.file_name}
				image={image.file_base64}
				extension={image.extension}
				hasPreview={image.hasPreview}
				fileId={image.fileId}
				fileSize={image.fileSize}
				onDelete={handleDelete}
				key={image.fileId}
				origin={image.origin}
				originalExtension={image.originalExtension}
			></ImageBox>
		);
	};

	const fetchMoreData = async () => {
		try {
			fetch('/api/v1/files?page=' + currentPage + '&pageSize=' + pageSize, {
				method: 'GET',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				}
			})
				.then((res) => {
					followRedirect(res);
					return res.json();
				})
				.then((data) => {
					const images = data.images;
					if (currentPage === 1) setState({ items: [] });
					console.log(currentPage);
					console.log(state.items);
					setCurrentPage(currentPage + 1);
					setHasMoreData(images.length === pageSize);
					if (!isLoaded) setIsLoaded(true);

					setState({
						items: getMoreImages(images)
					});
				})
				.catch((err) => {
					console.log(err);
				});

			// followRedirect(response);
		} catch (error) {
			console.log(error);
		}
	};

	if ((state.items.length === 0 || state.items.length < pageSize) && !isLoaded) {
		setState({ items: [] });
		setIsLoaded(true);
		fetchMoreData();
	}
	return (
		<Header>
			<div>
				<InfiniteScroll
					dataLength={state.items.length}
					next={fetchMoreData}
					hasMore={hasMoreData}
					loader={<Spinner />}
				>
					<SimpleGrid columns={[2, 3, 4]} spacing={10} overflow={'auto'}>
						{state.items}
					</SimpleGrid>
				</InfiniteScroll>
			</div>
		</Header>
	);
}
