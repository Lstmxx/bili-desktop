import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

export default function Provider ({ children, rootElement }: { children: React.ReactNode, rootElement: HTMLElement }) {
  const theme = createTheme({
    components: {
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
