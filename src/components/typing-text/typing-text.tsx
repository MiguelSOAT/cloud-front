import React, { useState, useEffect } from 'react';

export default function TypingText(): JSX.Element {
	const [text, setText] = useState('');

	useEffect(() => {
		const interval = setInterval(() => {
			setText((text) => text + 'Tasjkdkjaskdjajksd'); // Reemplaza 'T' por el texto que desees mostrar
		}, 200); // El intervalo determina la velocidad de escritura

		return () => clearInterval(interval);
	}, []);

	return <div>{text}</div>;
}
