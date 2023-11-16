import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import './styles.css';

const rootEl = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootEl).render(
	<React.StrictMode>
		<ThemeProvider rootElement={rootEl}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
);
