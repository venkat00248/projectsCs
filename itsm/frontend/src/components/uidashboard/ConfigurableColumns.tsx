import React, { useEffect, useState } from "react";
import {
  OverlayTrigger,
  Tooltip,
  Checkbox,
  FormControlLabel,
  IconButton,
  Menu,
  MenuItem,
  SettingsIcon,
  useSelector,
} from "./Imports";

import './ConfigurableColumns.scss'
export const ConfigurableColumns = ({ columns, selectedColumns, setSelectedColumns, handleColumnSelectionChange, t }: any) => {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useSelector((state: any) => state.allReducers.theme.theme);
  const [themeClassName, setThemeClassName] = useState('');
  useEffect(() => {
    setThemeClassName(theme ? 'DarkColumns' : '');
  }, [theme]);
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const columnSelections = [
    selectedColumns.length > 0 && (
      <MenuItem key="uncheck-all">
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedColumns.length !== columns.length}
              indeterminate={
                selectedColumns.length > 0 &&
                selectedColumns.length < columns.length
              }
              onChange={() =>
                setSelectedColumns(
                  selectedColumns.length === columns.length
                    ? []
                    : columns.map((col: any) => col.selector)
                )
              }
            />
          }
          label={t("Uncheck all")}
        />
      </MenuItem>
    ),
    selectedColumns.length === 0 && (
      <MenuItem key="check-all">
        <FormControlLabel
          control={
            <Checkbox
              checked={selectedColumns.length === columns.length}
              onChange={() => setSelectedColumns(columns.map((col: any) => col.selector))}
            />
          }
          label={t("Check all")}
        />
      </MenuItem>
    ),
    ...columns.map((col: any) => (
      <MenuItem key={col.selector}>
        <FormControlLabel
          control={
            <Checkbox
              name={col.selector}
              checked={selectedColumns.includes(col.selector)}
              onChange={handleColumnSelectionChange}
            />
          }
          label={col.name}
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
          overlay={
            <Tooltip id={`tooltip-settings`}>{t("Configurable columns")}</Tooltip>
          }
        >
          <SettingsIcon />
        </OverlayTrigger>

        {/* Settings */}
      </IconButton>
      <Menu
        id= {`${themeClassName}`}
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
