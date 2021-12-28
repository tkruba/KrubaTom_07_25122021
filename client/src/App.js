import { createTheme, ThemeProvider } from '@material-ui/core';
import CustomBtn from './components/customBtn'
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: "#2E1667",
    },
    secondary: {
      main: "#C7D8ED",
    },
  },
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <CustomBtn/>
      </ThemeProvider>
    </div>
  );
}

export default App;
