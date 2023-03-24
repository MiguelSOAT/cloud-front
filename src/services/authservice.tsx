const authenticated = () => {
	return localStorage.getItem('token') !== null;
};

export default authenticated;
