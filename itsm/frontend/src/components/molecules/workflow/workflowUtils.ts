import { toast } from "react-toastify";
import { config } from "../../../config/config";
import { WorkFlowService } from "../../../services/WorkFlowService";

export const createNodeFunc = async (newNode:any,workFlowID :String) => {
    try {
      // "workflowId":"649be87e71c9a06cb1289bda",
      // "taskData":{ "actions":[], "validations":[] }
      const reqBody = {
        workflowId:workFlowID,
        taskData:{id:newNode.id, name:newNode.data.label,isStart:newNode.isStart,isEnd: newNode.isEnd,actions:[], validations:[] }   };
        console.log("createNode Req BOdy :: ", reqBody)
       const  response:any = await WorkFlowService.addTask(reqBody)
        console.log("res",response)
  
      if (response?.source == "handleSuccess") {
        return { ...newNode, _id: response.data.data.result._id  }; // Return the updated node with the returned ID
      } else {
          const filteredErrors = response?.filter((err:any) => err?.errorMsg === config.API_ERROR_MSG["https://itsmworkflow.cloud4c.com/nodes/unpublished/add-task"]);
          toast.error(filteredErrors[0]['errorMsg'], {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,  
            progress: undefined,
            theme: "dark",
            });
        console.error('Error creating node:');
        return null;
      }
    } catch (error) {
      console.error('Error creating node:', error);
      return null;
    }
  };
 