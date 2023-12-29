import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import { useFormData } from "../API/context/FormDataProvider";
import VisibilityIcon from "@mui/icons-material/Visibility";
import APIListTable from "./APIListTable";
import { WorkFlowService } from "../../../services/WorkFlowService";
type Anchor = "top" | "left" | "bottom" | "right";

export const APIListView = () => {

  // const { listOfAPIs, actionId } = useFormData();
  // const fetchData = async () => {
  //   try {
  //     const res: any = await WorkFlowService.fetchALLAPIs({
  //       id: actionId
  //     });
  //     console.log("response from APL list", res)
  //   } catch (error) {
  //     console.log("error while adding API Action", error);
  //   }
  // };

  // React.useEffect(() => {
  //   console.log("from use Effect")
  //   fetchData();
  // }, []);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const listItems = (
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
      <APIListTable />
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"bottom"}>
        <Button onClick={toggleDrawer("bottom", true)}>
          <VisibilityIcon />
        </Button>
        <Drawer
          anchor={"bottom"}
          open={state["bottom"]}
          onClose={toggleDrawer("bottom", false)}
        >
          {listItems}
        </Drawer>
      </React.Fragment>
    </div>
  );
};
