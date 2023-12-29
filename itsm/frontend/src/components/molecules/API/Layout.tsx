import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import BasicTabs from "./TabsData";
import Form from "./Form";
import "./Layout.scss";
import { Footer } from "./Footer";
import FormDataProvider, { useFormData } from "./context/FormDataProvider";
import Response from "./Response";
import AddIcon from "@mui/icons-material/Add";
import { Alert, FormControl } from "@mui/material";
import { WorkFlowService } from "../../../services/WorkFlowService";

type Anchor = "top" | "left" | "bottom" | "right";

export const Layout = () => {
  const { state, toggleDrawer, selectedTaskId, seActionId, successMsg } =
    useFormData();
  const fetchData = async () => {
    try {
      const res: any = await WorkFlowService.addAction({
        taskId: selectedTaskId,
        actionData: {
          type: "api",
        },
      });
      seActionId(res?.data.data.result._id);
      console.log("response from Action", res?.data.data.result._id);
    } catch (error) {
      console.log("error while adding API Action", error);
    }
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  const list = (
    <Box
      //   sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }},
      height="87vh"
      role="presentation"
    // onClick={toggleDrawer("bottom", false)}
    // onKeyDown={toggleDrawer("bottom", false)}
    >
      <button className="closeicon" onClick={toggleDrawer("bottom", false)}>
        <CloseIcon />
      </button>
     
      {successMsg && <FormControl sx={{ m: 1, width: "90%" }}>
      <Alert severity="success">{successMsg}</Alert>
      </FormControl >}
      <Form />
      <BasicTabs />
      <Response />
      <Footer />
    </Box>
  );

  return (
    <div>
      {/* <FormDataProvider> */}
      <React.Fragment key={"bottom"}>
        <Button onClick={toggleDrawer("bottom", true)}>
          <AddIcon />
        </Button>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {list}
        </Drawer>
      </React.Fragment>
      {/* </FormDataProvider> */}
    </div>
  );
};
