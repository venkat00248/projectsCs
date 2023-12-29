import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { FormControl } from "@mui/material";
import { useFormData } from "../API/context/FormDataProvider";
import { WorkFlowService } from "../../../services/WorkFlowService";
import APIViewDialog from "./APIViewDialog";

export default function APIListTable() {
  const { listOfAPIs,setListOfAPIs, actionId } = useFormData();
  const fetchData = async () => {
    try {
      const res: any = await WorkFlowService.fetchALLAPIs({
        id: actionId
      });
      if(res){
        setListOfAPIs(res?.data.data.result)
      }
      console.log("response from APL list  lit", res)
    } catch (error) {
      console.log("error while adding API Action", error);
    }
  };
const deleteHandler = async (id:any) => {
  try {
    const res: any = await WorkFlowService.deleteAPI({
      apiActionId:id, actionId:actionId
    });
    console.log("static data", listOfAPIs, id)
    if(res){
     setListOfAPIs(listOfAPIs.filter((item:any) => item._id !== id));
    console.log("static data", listOfAPIs)
    }
    console.log("response from deleteing list  lit", res)
  } catch (error) {
    console.log("error while deleting API Action", error);
  }
};
  React.useEffect(() => {
    fetchData();
  }, []);
  return (
    <FormControl sx={{ marginTop: 5, width: "100%" }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
            <TableCell>API</TableCell>
            <TableCell>Method</TableCell>
            <TableCell>id</TableCell>
            <TableCell>Action</TableCell>
            <TableCell>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {listOfAPIs.map((row: any) => (
              <TableRow
                key={row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.url}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row.method}
                </TableCell>
                <TableCell component="th" scope="row">
                  {row._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  <button className="btn btn-primary btn-sm" onClick={()=>deleteHandler(row._id)}>Delete</button>
                </TableCell>
                <TableCell component="th" scope="row">
                  <APIViewDialog item={row}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </FormControl>
  );
}
