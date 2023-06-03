const followRedirect = (res: Response) => {
	if (res.redirected || res.status === 401 || res.status === 302) {
		console.log('redirected');
		window.location.href = '/login';
	}
};

export default followRedirect;
