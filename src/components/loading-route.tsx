import { useEffect } from 'react';

export function PrivateRoute(props: any) {
	useEffect(() => {
		props.setLoading(true);

		setTimeout(() => {
			props.setLoading(false);
		}, 2000);

		return () => {
			props.setLoading(true);
		};
	}, [props.setLoading]);

	return props.children;
}
