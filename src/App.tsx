import { useState, useMemo, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
// import CssBaseline from '@mui/material/CssBaseline';
import Step1 from "@/steps/step1";
import Step2 from "@/steps/step2";
import Step3 from "@/steps/step3";
import Step4 from "@/steps/step4";
import Step5 from "@/steps/step5";
import Step6 from "@/steps/step6";
// import { nanoid } from "nanoid";
import requset from "@/lib/request";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [step, setStep] = useState(0);

  useEffect(() => {
    async function check() {
      // check useragent
      if (!navigator.userAgent.match(/MicroMessenger/i)) return setStep(6);

      const params = (new URL(window.location.href)).searchParams;
      const error = params.get('error')
      if (error) {
        console.log(error)
      } else {
        const nickname = params.get('name')
        const headimgurl = params.get('img')
        if (nickname) localStorage.setItem("nickname", nickname);
        if (headimgurl) localStorage.setItem("headimgurl", headimgurl);
      }

      // check openid
      const openid = params.get('openid')
      if (!openid) return setStep(6);


      let id = localStorage.getItem("id");
      if (!id) {
        id = openid
        localStorage.setItem("id", id);
      }
      try {
        // check id status
        const res = await requset(`/status/${id}`);
        if (res.error || res.status !== 200) throw Error();
        console.log(typeof res.data);
        if (!res.data) return setStep(1);
        if (res.data.status === 1) {
          setStep(3);
        }
        if (res.data.status === 2) {
          setStep(4);
        }
      } catch (e) {
        console.log(e)
        setStep(5);
      }
    }


    check();
  }, []);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );

  const nextStep = () => {
    setStep((s) => s + 1);
  };

  return (
    <ThemeProvider theme={theme}>
      {step === 0 && (
        <Box
          sx={{
            height: "100vh",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
      {step === 1 && <Step1 next={nextStep} />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
      {step === 4 && <Step4 />}
      {step === 5 && <Step5 />}
      {step === 6 && <Step6 />}
    </ThemeProvider>
  );
}

export default App;
