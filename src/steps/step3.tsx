import { useEffect } from "react";
import Box from "@mui/material/Box";
import InfoIcon from "@mui/icons-material/Info";

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
      <InfoIcon color="success" sx={{ fontSize: 50 }} />
      <h3>提交成功</h3>
      <br></br>
      <p>工作人员将在48小时内与您联系</p>
      <p>请保持手机畅通</p>
    </Box>
  );
}
