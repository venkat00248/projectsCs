import React from 'react';
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import DoneTwoToneIcon from "@mui/icons-material/DoneTwoTone";
import { TextField } from "@mui/material";
import { useTranslation } from 'react-i18next';
const PopupComponent = ({ setShowPopup,setSideBar, nodeName, setNodeName, deleteNode }:any) => {
  const {t} = useTranslation()
  return (
    <div >
      <div >
        <div >
          <button
            className="btn  btn-sm close"
            onClick={() => {
              setSideBar(true);
              setNodeName('');
            }}
          >
            <CloseTwoToneIcon />
          </button>
          <TextField
            id="outlined-basic"
            fullWidth
            label= {t("label")}
            variant="outlined"
            value={nodeName}
            size='small'
            onChange={(evt:any) => setNodeName(evt.target.value)}
          />
        </div>
        <div  style={{position:"fixed", bottom:"15px", width:"260px"}}>
        <div className="deleteNodeWrapper">
          <p>{t("delete this node")}?</p>
          <div className="buttonWrappper">
            <button className="btn btn-success btn-sm p-0" onClick={deleteNode}>
              <DoneTwoToneIcon />
            </button>
            {/* <button
              className="btn btn-danger btn-sm"
              onClick={() => {
                // setShowPopup(false);
                setNodeName('');
              }}
            >
              <CloseTwoToneIcon />
            </button> */}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupComponent;
