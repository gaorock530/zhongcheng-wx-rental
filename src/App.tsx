import { useState, useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
// import CssBaseline from '@mui/material/CssBaseline';
import Step1 from "@/steps/step1";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const [step, setStep] = useState(0);

  const nextStep = () => {
    setStep((s) => s + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      {step === 0 && <Step1 next={nextStep} />}
    </ThemeProvider>
  );
}

export default App;
