import { useEffect } from "react";
import Box from "@mui/material/Box";
// import ErrorIcon from "@mui/icons-material/Error";
import qr from '@/assets/qr.jpg'

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
      <img src={qr} width={300} />
      <br></br>
      <h3>请关注[众城保障性住房]官方公众号</h3>
    </Box>
  );
}
