import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function Provider ({ children, rootElement }: { children: React.ReactNode; rootElement: HTMLElement; }) {
	const theme = createTheme({
		components: {
			MuiButton: {
				styleOverrides: {
					root: ({ ownerState }) => ({
						...(ownerState.variant === 'contained' &&
							ownerState.color === 'primary' && {
								backgroundColor: '#00AEEC',
								color: '#fff'
							})
					})
				}
			},
			MuiInput: {
				defaultProps: {
					style: { boxShadow: '0px 0px 0px 0px;' }
				}
			},
			MuiDialog: {
				defaultProps: {
					container: rootElement
				}
			},
			MuiPopover: {
				defaultProps: {
					container: rootElement
				}
			},
			MuiPopper: {
				defaultProps: {
					container: rootElement
				}
			}
		}
	});
	return (
		<StyledEngineProvider injectFirst>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</StyledEngineProvider>
	);
}
