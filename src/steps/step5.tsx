import { useEffect } from "react";
import Box from "@mui/material/Box";
import ErrorIcon from "@mui/icons-material/Error";

export default function Step1() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
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
      <ErrorIcon color="error" sx={{ fontSize: 50 }} />
      <h3>网络错误</h3>
      <br></br>
      <p>请稍后刷新页面重试</p>
    </Box>
  );
}
