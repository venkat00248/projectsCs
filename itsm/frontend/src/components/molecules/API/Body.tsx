import React, { useEffect, useRef, useState } from 'react';
import { FormControl, FormControlLabel, Paper, Radio, RadioGroup, TextareaAutosize, Typography } from '@mui/material';
import './Body.scss'
import CreateTable from './CreateTable';
import { useFormData } from './context/FormDataProvider';
export const Body = () => {
  const { setRows, rows, headers, setHeaders, queryParams, setQueryParams, urlEncoded, setUrlEncoded, postFormData, setPostFormData, body, setBody } = useFormData();
  const [lines, setLines] = useState<string[]>(['']);
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [radioValue, setRadioValue] = useState<string>('none');

  useEffect(() => {
    if (textAreaRef.current) {
      const linesArray = textAreaRef.current.value.split('\n');
      setLines(linesArray);
    }
  }, []);

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // const linesArray = e.target.value.split('\n');
    // setLines(linesArray);
    setBody(e.target.value)
  };
  const renderDivBasedOnRadioValue = () => {
    switch (radioValue) {
      case 'none':
        return <div></div>;
      case 'form-data':
        return <CreateTable rows={postFormData} setRows={setPostFormData} />;
      case 'x-www-form-urlencoded':
        return <CreateTable rows={urlEncoded} setRows={setUrlEncoded} />;
      case 'raw':
        return <Paper elevation={3} style={{ padding: '20px', display: 'flex' }}>
          <div style={{ paddingRight: '10px' }}>
            {Array.from({ length: lineCount }, (_, index) => (
              <Typography key={index} variant="body2" color="textSecondary">
                {index + 1}
              </Typography>
            ))}
          </div>

          <TextareaAutosize
            ref={textAreaRef}
            minRows={5}
            onChange={handleTextAreaChange}
            // body={'{\n\t\n}'}
            // setBody={setBody}
            style={{ width: '100%', border: '1px solid #ddd' }}
            placeholder="Type your text here..."
            defaultValue=""
          />
        </Paper>;
      case 'binary':
        return <div>binary</div>;
      case 'GraphQL':
        return <div>graph ql</div>;
      default:
        return null;
    }
  }
  const lineCount = Math.max(lines.length, 5); // Minimum of 5 rows

  return (
    <>
      <FormControl className='radioDiv'>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={radioValue}
          onChange={(e) => setRadioValue(e.target.value)}
        >
          <FormControlLabel value="none" control={<Radio />} label="none" />
          <FormControlLabel value="form-data" control={<Radio />} label="form-data" />
          <FormControlLabel value="x-www-form-urlencoded" control={<Radio />} label="x-www-form-urlencoded" />
          <FormControlLabel value="raw" control={<Radio />} label="raw" />
          {/* <FormControlLabel value="binary" control={<Radio />} label="binary" /> */}
          {/* <FormControlLabel value="GraphQL" control={<Radio />} label="GraphQL" /> */}
        </RadioGroup>
      </FormControl>
      {/* <Paper elevation={3} style={{ padding: '20px', display: 'flex' }}>
      <div style={{ paddingRight: '10px' }}>
        {Array.from({ length: lineCount }, (_, index) => (
          <Typography key={index} variant="body2" color="textSecondary">
            {index + 1}
          </Typography>
        ))}
      </div>
      
      <TextareaAutosize
        ref={textAreaRef}
        minRows={5}
        onChange={handleTextAreaChange}
        style={{ width: '100%', border: '1px solid #ddd' }}
        placeholder="Type your text here..."
        defaultValue="{
        }"
      />
    </Paper> */}
      {renderDivBasedOnRadioValue()}

    </>
  );
};

