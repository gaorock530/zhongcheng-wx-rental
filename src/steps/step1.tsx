import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button } from "@mui/material";
import logo from "@/assets/logo.png";

const communities = [
  { label: "荣源小区" },
  { label: "西苑丽景小区" },
  { label: "乔谢小区" },
  { label: "新牧湾小区", no: true },
];

export default function Step1({ next }: { next: any }) {
  const [phone, setPhone] = useState("");
  const [community, setCommunity] = useState("");

  const onCommunityChange = (e: SelectChangeEvent) => {
    setCommunity(e.target.value);
  };

  const onPhoneChange = (e: any) => {
    const v = e.target.value;
    if (v.length > 11) return;
    if (v.match(/^[0-9]{0,11}$/)) setPhone(v);
    if (v !== phone) {
      // setVerified(false);
      // setCode("");
      // setError((err) => ({ ...err, code: false }));
    }
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log("submit");
    next();
  };

  return (
    <div>
      <Box
        sx={{
          textAlign: "center",
          paddingBottom: "1.5rem",
        }}
      >
        <img src={logo} width={120} />
        <h3>新乡市公租房小区商业门面房</h3>
        <h3>租赁意向登记表</h3>
      </Box>
      <Box
        component="form"
        sx={{
          "&>div": { margin: "0.5rem 0" },
        }}
        noValidate
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-helper-label">
            公租房小区
          </InputLabel>
          <Select
            id="community"
            value={community}
            onChange={onCommunityChange}
            label="公租房小区"
          >
            {communities.map((c) => (
              <MenuItem value={c.label} disabled={c.no}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField id="person" label="联系人" variant="outlined" fullWidth />
        <TextField
          id="phone"
          label="联系电话"
          variant="outlined"
          fullWidth
          type="tel"
          onChange={onPhoneChange}
          value={phone}
        />
        <TextField
          id="usage"
          label="租赁用途"
          variant="outlined"
          fullWidth
          multiline
        />
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ width: "100%", marginTop: "1rem" }}
        >
          提交
        </Button>
      </Box>
    </div>
  );
}
