import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// import FormGroup from '@mui/material/FormGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import { Button } from "@mui/material";
import logo from "@/assets/logo.png";
import isMobilePhone from "validator/lib/isMobilePhone";
import requset from "@/lib/request";

const communities = [
  { label: "荣源小区" },
  { label: "西苑丽景小区" },
  { label: "乔谢小区" },
  { label: "新牧湾小区", no: true },
];

export default function Step1({ next }: { next: any }) {
  const [phone, setPhone] = useState("");
  const [community, setCommunity] = useState("");
  const [name, setName] = useState("");
  const [usage, setUsage] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  // const [checked, setChecked] = useState(false)
  const [error, setError] = useState({
    community: false,
    name: false,
    phone: false,
    usage: false,
  });

  const onCommunityChange = (e: SelectChangeEvent) => {
    if (e.target.value.length > 20) return;
    setCommunity(e.target.value);
    if (error.community) setError((err) => ({ ...err, community: false }));
  };

  const onNameChange = (e: any) => {
    if (e.target.value.length > 20) return;
    const v = e.target.value.trim();
    setName(v);
    if (error.name && v) setError((err) => ({ ...err, name: false }));
  };

  const onPhoneChange = (e: any) => {
    if (e.target.value.length > 20) return;
    const v = e.target.value;
    if (v.length > 11) return;
    if (v.match(/^[0-9]{0,11}$/)) setPhone(v);
    if (error.phone) setError((err) => ({ ...err, phone: false }));
    if (msg) setMsg("");
  };

  const onUsageChange = (e: any) => {
    if (e.target.value.length > 100) return;
    const v = e.target.value.trim();
    setUsage(v);
    if (error.usage && v) setError((err) => ({ ...err, usage: false }));
  };

  // const authorize = async () => {
  //   // weixin
  //   console.log('wenxin...')
  //   try {

  //     const res = await fetch(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx77b0a2f41edb5837&redirect_uri=https%3A%2F%2Fwx.zhongchenggongsi.com%2Fapi%2Fwx_oauth_redirect&response_type=code&scope=snsapi_userinfo&state=test#wechat_redirect`, {
  //       mode: 'no-cors'
  //     })
  //     console.log(res)
  //   } catch (e) {
  //     console.log(e)
  //   }
  //   console.log('end weixin.')

  // }

  // const onCheckChange = (e: any) => {
  //   setChecked(e.target.checked)
  //   if (e.target.checked) {
  //     authorize()
  //   }

  // }

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const errorState = {
      community: false,
      name: false,
      phone: false,
      usage: false,
    };

    if (!community) errorState.community = true;
    if (!isMobilePhone(phone, "zh-CN")) errorState.phone = true;
    if (!name) errorState.name = true;
    if (!usage) errorState.usage = true;

    try {
      if (
        errorState.community ||
        errorState.name ||
        errorState.phone ||
        errorState.usage
      )
        throw Error();

      const id = localStorage.getItem("id");
      if (!id) throw Error();
      const formData = new FormData();

      formData.append("id", id);
      formData.append("community", community);
      formData.append("name", name);
      formData.append("phone", phone);
      formData.append("usage", usage);

      const res = await requset("/rental_submit", "POST", formData);
      if (!res.error) return next();
      if (res.status === 4002) {
        setMsg("电话号码已被使用");
        errorState.phone = true;
        throw Error();
      }
    } catch (e) {
      setError(errorState);
    }

    setLoading(false);
  };

  return (
    <>
      <Box
        sx={{
          textAlign: "center",
          padding: "2rem 0",
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
            error={error.community}
          >
            {communities.map((c) => (
              <MenuItem value={c.label} disabled={c.no} key={c.label}>
                {c.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          id="person"
          onChange={onNameChange}
          value={name}
          label="联系人"
          variant="outlined"
          fullWidth
          error={error.name}
        />
        <TextField
          id="phone"
          label="联系电话"
          variant="outlined"
          fullWidth
          type="tel"
          onChange={onPhoneChange}
          value={phone}
          error={error.phone}
          helperText={msg}
        />
        <TextField
          id="usage"
          value={usage}
          onChange={onUsageChange}
          label="租赁用途"
          variant="outlined"
          fullWidth
          multiline
          error={error.usage}
        />
        <Button
          type="submit"
          variant="outlined"
          size="large"
          sx={{ width: "100%", marginTop: "1rem" }}
          disabled={loading || error.community || error.name || error.phone || error.usage}
        >
          提交
        </Button>
        {/* <FormControlLabel control={<Checkbox checked={checked} onChange={onCheckChange} />} label="Label" /> */}
      </Box>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
