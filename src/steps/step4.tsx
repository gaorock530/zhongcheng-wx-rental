import { useEffect } from "react";
import Box from "@mui/material/Box";
import WarningIcon from "@mui/icons-material/Warning";

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
      <WarningIcon color="warning" sx={{ fontSize: 50 }} />
      <h3>申请已处理</h3>
      <br></br>
      <p>请您参加公租房小区商业门面房招标项目</p>
      <p>请保持手机畅通</p>
    </Box>
  );
}
