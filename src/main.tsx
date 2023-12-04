import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ThemeProvider from './components/ThemeProvider/ThemeProvider';
import { SnackbarProvider } from 'notistack';
import './styles.css';
import Loading from './components/loading/Loading';

const rootEl = document.getElementById('root') as HTMLElement;

ReactDOM.createRoot(rootEl).render(
	<React.StrictMode>
		<ThemeProvider rootElement={rootEl}>
			<SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
				<Loading />
				<App />
			</SnackbarProvider>
		</ThemeProvider>
	</React.StrictMode>
);
