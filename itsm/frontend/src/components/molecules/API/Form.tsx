import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { InputAdornment, TextField } from "@mui/material";
import "./Form.scss";
import { useFormData } from "./context/FormDataProvider";
export default function Form() {


  const { url, query, setUrl, method, setMethod, err, setErr } = useFormData();

  const handleChange = (event: SelectChangeEvent) => {
    setMethod(event.target.value as string);
    handleBlurChange(event)
  };
  React.useEffect(() => {
    setUrl((url: any) => url.split('?')[0] + query);
  }, [query, setUrl]
  )
  const handleBlurChange = (e: any) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    if (!fieldValue) {
      setErr((prevErr: any) => ({
        ...prevErr,
        [`${fieldName}Err`]: `Please provide ${fieldName}`
      }))
    } else {
      setErr((prevErr: any) => ({
        ...prevErr,
        [`${fieldName}Err`]: ""
      }))
    }
  };

  // const handleFocusChange = (e: any) => {
  //   const fieldName = e.target.name;
  //   const fieldValue = e.target.value;
  //   if (!fieldValue) {
  //     setErr((prevErr: any) => ({
  //       ...prevErr,
  //       [`${fieldName}Err`]: `Please provide ${fieldName}`
  //     }))
  //   } else {
  //     setErr((prevErr: any) => ({
  //       ...prevErr,
  //       [`${fieldName}Err`]: ""
  //     }))
  //   }
  // }
  return (
    <>
      <Box
        sx={{
          marginTop: 5,
          display: "flex",
          background: "#edeff6",
          position: "relative",
        }}
      >
        {/* <div className='urlbtn'>URL :</div>    */}
        <TextField
          id="outlined-basic"
          variant="outlined"
          size="small"
          fullWidth
          className="url"
          value={url}
          onChange={(e: any) => setUrl(e.target.value)}
          onBlur={handleBlurChange}
          // onFocus={handleFocusChange}
          name="url"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">URL :</InputAdornment>

            ),
          }}
        />

        <FormControl
          sx={{ m: 1, minWidth: 100 }}
          size="small"
          className="selectmethod"
        >
          <Select
            value={method}
            onChange={handleChange}
            displayEmpty
            onBlur={handleBlurChange}
            name="method"
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">Method</MenuItem>
            <MenuItem value="Get">Get</MenuItem>
            <MenuItem value="Post">Post</MenuItem>
            <MenuItem value="Put">Put</MenuItem>
            <MenuItem value="Delete">Delete</MenuItem>
          </Select>

        </FormControl>

      </Box>
      <div className="row">
        <div className="col-10 text-center">
          {
            err.urlErr ? <span className="text-danger  fs-6 text-end">{err.urlErr}</span> : ""
          }
        </div>
        <div className="col-2">
          {
            err.methodErr ? <span className="text-success fs-6 text-center" style={{ textAlign: "right", paddingRight: "2rem" }}>{err.methodErr}</span> : ""
          }
        </div>
      </div>
    </>

  );

  
}
