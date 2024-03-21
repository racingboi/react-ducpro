
import { useCallback, useState } from 'react';
import './App.css'
import PrintIcon from '@mui/icons-material/Print';
import { SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider, createTheme } from '@mui/material';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppRouter } from './routes/root';
function App() {
  const [theme, setTheme] = useState(createTheme({
    palette: {
      mode: 'dark',
    },
  }))
  const [mode, setMode] = useState('dark');
  const handleTheme = () => {
    // alert(mode)
    if (mode === 'light') {
      setMode('dark');
      setTheme(createTheme({
        palette: {
          mode: 'dark',
        },
      }))
    } else {
      setMode('light');
      setTheme(createTheme({
        palette: {
          mode: 'light',
        },
      }))
    }
  }
  const printDocument = useCallback(() => {
    window.print();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        fixed
      >
        <SpeedDialAction
          icon={mode == 'light' ? <LightModeOutlinedIcon /> : <DarkModeIcon />}
          onClick={handleTheme}
          tooltipTitle={'sang/toi'}
        />
        <SpeedDialAction

          icon={<PrintIcon />}
          onClick={printDocument}
          tooltipTitle={'in'}
        />

      </SpeedDial>
    <div className="App">
      <ToastContainer />
        <AppRouter />
      </div>
    </ThemeProvider>
  )
}

export default App
