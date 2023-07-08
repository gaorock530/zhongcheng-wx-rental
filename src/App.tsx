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
import { nanoid } from "nanoid";
import requset from "@/lib/request";

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [step, setStep] = useState(0);

  useEffect(() => {
    async function check() {
      let id = localStorage.getItem("id");
      if (!id) {
        id = nanoid();
        localStorage.setItem("id", id);
        return setStep(1);
      }
      try {
        // weixin
        const codeRes = await fetch(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx77b0a2f41edb5837&redirect_uri=http%3A%2F%2Fwx.zhopngchenggongsi.com%2Fapi%2Fwx_oauth_redirect&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`)
        const jsonRes = await codeRes.json()

        console.log(jsonRes)

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
    </ThemeProvider>
  );
}

export default App;
