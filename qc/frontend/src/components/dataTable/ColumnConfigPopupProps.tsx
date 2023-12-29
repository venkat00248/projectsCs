import React, { useEffect, useState } from 'react';
import { OverlayTrigger, Tooltip } from "react-bootstrap";

import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SettingsIcon from '@mui/icons-material/Settings';

interface ColumnConfigPopupProps {
  headers: string[];
  visibleColumns: string[];
  onColumnToggle: (columnName: string) => void;
  onCheckAll: (checked: boolean) => void; // New prop
}

const ColumnConfigPopup: React.FC<ColumnConfigPopupProps> = ({
  headers,
  visibleColumns,
  onColumnToggle,
  onCheckAll
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCheckAll(event.target.checked);
  };

  const columnSelections = [
    <MenuItem key="checkAll">
      <FormControlLabel
        control={
          <Checkbox
            checked={visibleColumns.length === headers.length}
            onChange={handleCheckAll}
          />
        }
        label={visibleColumns.length === 0 ?"Check All" :"Uncheck All"}
      />
    </MenuItem>,
    ...headers.map((header) => (
      <MenuItem key={header}>
        <FormControlLabel
          control={
            <Checkbox
              name={header}
              checked={visibleColumns.includes(header)}
              onChange={() => onColumnToggle(header)}
            />
          }
          label={header}
        />
      </MenuItem>
    )),
  ];

  return (
    <>
      <IconButton
        aria-controls="column-menu"
        aria-haspopup="true"
        onClick={handleMenuOpen}
      >
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id={`tooltip-settings`}>{'Configure columns'}</Tooltip>}
        >
          <SettingsIcon />
        </OverlayTrigger>
      </IconButton>
      <Menu
        id="themeClassName"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {columnSelections}
      </Menu>
    </>
  );
};

export default ColumnConfigPopup;
