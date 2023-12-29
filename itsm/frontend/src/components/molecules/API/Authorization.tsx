import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useFormData } from './context/FormDataProvider';
import './Authorization.scss'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';


export default function Authorization() {
    const { authType, setAuthType, authValues, setAuthValues } = useFormData();
    const handleChange = (event: SelectChangeEvent) => {
        setAuthType(event.target.value);
    };
    const handleAuthValuesChange = (e: any) => {
        setAuthValues((prevState: any) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }


    return (
        <div className='Authorization'>
            <div className="Authorization">
                <div className="container-fluid">
                    <div className='row mt-3' >
                        <div className="col-12">
                            <div className="row">
                                <div className="col-12 col-md-4">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-12 col-sm-6 col-md-3">
                                                    <p className='fs-6 mt-3' >Type</p>
                                                </div>
                                                <div className="col-12 col-sm-6 col-md-9">
                                                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                                        <InputLabel id="demo-select-small-label">Auth</InputLabel>
                                                        <Select
                                                            labelId="demo-select-small-label"
                                                            id="demo-select-small"
                                                            value={authType}
                                                            label="Auth"
                                                            onChange={handleChange}
                                                        >
                                                            {/* <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem> */}
                                                        <MenuItem value="Inherit auth from parent" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>Inherit auth from parent</MenuItem>
                                                        <MenuItem value="No Auth" >No Auth</MenuItem>
                                                        <MenuItem value="Basic Auth">Basic Auth</MenuItem>
                                                        <MenuItem value="Bearer Token">Bearer Token</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="row mt-5">
                                            {
                                                authType !== "No Auth" && (
                                                    <p className='col-12'>
                                                        The authorization header will be automatically generated when you send the request.
                                                    </p>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-1">
                                {/* add vertical line here */}
                            </div>
                            <div className="col-12 col-md-7" style={{ fontFamily: "monospace" }}>
                                <div className="row">
                                    {
                                        authType === "Inherit auth from parent" && (
                                            <p className='col-12 mt-5 text-center'>
                                                This request is using No Auth
                                            </p>
                                        )
                                    }
                                    {
                                        authType === "No Auth" && (
                                            <p className='col-12 mt-5 text-center'>
                                                This request does not use any authorization.
                                            </p>
                                        )
                                    }
                                    {
                                        authType === "Basic Auth" && (
                                            <p className='col-12 mt-5'>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="row mb-2">
                                                            <div className="col-6 text-start mt-1 mr-3">
                                                                <InputLabel id="">Username</InputLabel>
                                                            </div>
                                                            <div className="col-6">
                                                                <TextField id="filled-basic"
                                                                    // label="Username"
                                                                    name="Username"
                                                                    variant="filled"
                                                                    placeholder='Username'
                                                                    onChange={handleAuthValuesChange}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-6 text-start mt-1 mr-3">
                                                                <InputLabel id="">Password</InputLabel>
                                                            </div>
                                                            <div className="col-6">
                                                                <TextField
                                                                    id="filled-basic"
                                                                    // label="Password"
                                                                    name="Password"
                                                                    variant="filled"
                                                                    placeholder='Password'
                                                                    onChange={handleAuthValuesChange} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </p>
                                        )
                                    }
                                    {
                                        authType === "Bearer Token" && (
                                            <p className='col-12 mt-5'>
                                                <div className="row">
                                                    <div className="col-6 text-start mt-1 mr-3">
                                                        <InputLabel id="">Token</InputLabel>
                                                    </div>
                                                    <div className="col-6">
                                                        <TextField
                                                            id="filled-basic"
                                                            // label="Token"
                                                            name="Token"
                                                            variant="filled"
                                                            placeholder='Token'
                                                            onChange={handleAuthValuesChange}
                                                        />
                                                    </div>
                                                </div>
                                            </p>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
