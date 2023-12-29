import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateTable from './CreateTable';
import { Body } from './Body';
import './TabsData.scss'
import { useFormData } from './context/FormDataProvider';
import Authorization from './Authorization';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const { setRows, rows, headers, setHeaders, queryParams, setQueryParams } = useFormData();
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  console.log("quers", queryParams)
  console.log("headerssssssss", headers)
  return (
    <Box sx={{ width: '100%', padding: 2 }}>
      <Box sx={{ borderBottom: 1, }} className='maintabs'>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Params" {...a11yProps(0)} />
          <Tab label="Authorization" {...a11yProps(1)} />
          <Tab label="Headers" {...a11yProps(2)} />
          <Tab label="Body" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <CreateTable h1="Query Params" rows={queryParams} setRows={setQueryParams} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Authorization />
      </CustomTabPanel>

      <CustomTabPanel value={value} index={2}>
        <CreateTable h1="Headers" rows={headers} setRows={setHeaders} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Body />
      </CustomTabPanel>
    </Box>
  );
}
