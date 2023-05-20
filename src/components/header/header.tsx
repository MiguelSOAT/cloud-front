import React, { ReactNode, ReactText } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Link,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Breadcrumb,
	BreadcrumbItem,
	Divider,
	Image
} from '@chakra-ui/react';
import { FiHome, FiCompass, FiSettings, FiMenu, FiBell, FiChevronDown } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ChevronRightIcon } from '@chakra-ui/icons';
// import simpleLogo from '../../assets/miguelsoat/logo-white-mini.svg';
import FloatingUploadButton from '../floating-upload-button/floating-upload-button';
interface LinkItemProps {
	name: string;
	icon: IconType;
	path?: string;
}
const LinkItems: Array<LinkItemProps> = [
	{ name: 'Home', icon: FiHome, path: '/' },
	{ name: 'Explorador', icon: FiCompass, path: '/explore' },
	// { name: 'Favoritos', icon: FiStar, path: '/favorite' },
	{ name: 'Ajustes', icon: FiSettings, path: '/settings' }
];

export default function SidebarWithHeader({ children }: { children: ReactNode }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={'#f5f6fb'}>
			<FloatingUploadButton />
			<SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				<DinamycBreadCrumb />
				{children}
			</Box>
		</Box>
	);
}

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

interface IBreadCrumbHeader {
	path: string;
	name: string;
	isCurrentPage: 'isCurrentPage' | '';
}

const capitalize = (str: string, lower = false) =>
	(lower ? str.toLowerCase() : str).replace(/(?:^|\s|["'([{])+\S/g, (match) => match.toUpperCase());

const DinamycBreadCrumb = () => {
	const currentPath = window.location.pathname;
	const pathArray = currentPath.split('/');
	const numberOfPath = pathArray.length;
	const arrayOfBreadCrumbData: IBreadCrumbHeader[] = [];
	let currentIterationPath = '';

	for (let i = 0; i < numberOfPath; i++) {
		const path = pathArray[i];
		if (path !== '') {
			currentIterationPath += `/${path}`;
			arrayOfBreadCrumbData.push({
				path: currentIterationPath,
				name: capitalize(path),
				isCurrentPage: i === numberOfPath - 1 ? 'isCurrentPage' : ''
			});
		}
	}

	return (
		<div>
			<Breadcrumb
				fontWeight="medium"
				fontSize="sm"
				separator={<ChevronRightIcon color="gray.500" />}
			>
				{arrayOfBreadCrumbData.map((breadCrumb: IBreadCrumbHeader, index) => {
					return (
						<BreadcrumbItem key={index}>
							<NavLink to={breadCrumb.path}>{breadCrumb.name}</NavLink>
						</BreadcrumbItem>
					);
				})}
			</Breadcrumb>
			<Divider marginY="10px" />
		</div>
	);
};

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
	return (
		<Box
			transition="3s ease"
			bg={'#fafafa'}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			backgroundColor={'#1e1e1e'}
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text
					display={'flex'}
					maxH={{ base: '300px', md: 'flex' }}
					objectFit="cover"
					color={'white'}
					fontSize="lg"
					fontWeight="bold"
				>
					MIGUELSOAT
				</Text>
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem
					_hover={{
						bg: '#1a51fb',
						color: '#fafafa'
					}}
					onClose={onClose}
					key={link.name}
					icon={link.icon}
					path={link.path || '/'}
					color={'#fafafa'}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

interface NavItemProps extends FlexProps {
	onClose: () => void;
	icon: IconType;
	children: ReactText;
	path: string;
}
const NavItem = ({ onClose, icon, children, path, ...rest }: NavItemProps) => {
	return (
		<Link
			as={RouterLink}
			to={path}
			style={{ textDecoration: 'none' }}
			_focus={{ boxShadow: 'none' }}
			onClick={onClose}
		>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'cyan.400',
					color: '#fafafa'
				}}
				{...rest}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: '#fafafa'
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

interface MobileProps extends FlexProps {
	onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={useColorModeValue('#fafafa', 'gray.900')}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			backgroundColor={'#fafafa'}
			color={'#fafafa'}
			{...rest}
		>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				color="#1d1d1d"
				icon={<FiMenu />}
			/>

			<HStack spacing={{ base: '0', md: '6' }}>
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar size={'sm'} />
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2"
									color="#1d1d1d"
								>
									<Text fontSize="sm">{localStorage.getItem('username')}</Text>
									<Text fontSize="xs">User</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }} color={'#1d1d1d'}>
									<FiChevronDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('#fafafa', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}
						>
							<MenuItem
								onClick={() => {
									fetch('/api/v1/logout', {
										method: 'POST',
										credentials: 'include',
										headers: {
											'Content-Type': 'application/json'
										}
									}).then((response) => {
										window.location.href = '/login';
									});
								}}
								color={'#1d1d1d'}
							>
								Sign out
							</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};
