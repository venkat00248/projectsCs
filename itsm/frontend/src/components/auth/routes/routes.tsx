import CustomSelect from "../../molecules/CustomSelect/CustomSelect";
// import { CheckBox } from "../../molecules/CheckBox/CheckBox";
import { Radio } from "../../molecules/Radio/Radio";
import Search from "../../layouts/Search/Search";
import { SampleInput } from "../../molecules/customInput/SampleInput";
import { ChartsComponent } from "../../molecules/Charts/ChartComponent";
import { Authenticate } from "../../uidashboard/Authenticate";
import { Errors } from "../../uidashboard/Errors";
import { OffRamp } from "../../molecules/OffRamp/OffRamp";
import VerticalLinearStepper from "../../molecules/Stepper/VerticalLinearStepper";
import RestrictForm from "../../admin/restrictForm";
import Notification from "../../layouts/Header/Notification";
import { Priority } from '../../ManagePriority/Priority'
import WorkFlow  from "../../molecules/workflow/WorkFlow";
import { FileExtension } from '../../FileExtensions/FileExtension';
import {AdminDashboard} from '../../admin/Admin';
import {Dashboard} from '../../admin/Dashboard';
import DynamicWorkFlow from "../../molecules/workflow/DynamicWorkFlow";
import { WorkFlowList } from "../../molecules/workflow/WorkFlowList";
import { Mapping } from "../../molecules/workflow/Mapping";
import { MappingList } from "../../molecules/workflow/MappingList";
import WrapperSession from "../../molecules/WrapperSession";
import { Layout } from "../../molecules/API/Layout";

export const routes: any = [
  //routes
  { path: "customSelect", element: <WrapperSession component ={<CustomSelect />} isAdmin = {false}/> },
  // { path: "checkbox", element: <CheckBox /> },
  { path: "radio", element: <WrapperSession component ={<Radio />} isAdmin = {false}/> },
  { path: "search", element: <WrapperSession component ={<Search />} isAdmin = {false}/> },
  { path: "sampleInput", element: <WrapperSession component ={<SampleInput />} isAdmin = {false}/> },
  { path: "charts", element: <WrapperSession component ={<ChartsComponent />} isAdmin = {false}/> },
  { path: "Errors", element: <Errors /> },
  // { path: "admin/Priorities", element: <Priority /> },
  {
    path: 'admin',
    element: <WrapperSession component ={<AdminDashboard /> }/> ,
    children: [
      // { path: 'dashboard', element: <Dashboard /> },
      { path: 'dashboard', element: <WorkFlow /> },
      { path: 'Priorities', element: <Priority /> },
      { path: 'filextensions', element: <FileExtension /> },
      { path: 'workflow', element: <WorkFlowList /> },
      { path: 'newWorkflow', element: <DynamicWorkFlow /> },
      { path: "restrictform", element: <RestrictForm /> },
      { path: 'mapping', element: <MappingList/> },
      // Add more nested routes here if needed
    ]
  },

  { path: "dashboard", element: <Authenticate /> },
  { path: "", element: <Authenticate /> },
  // { path: "admin/dashboard", element: <AdminDashboard /> },
  // { path: "admin/filextensions", element: <FileExtension /> },
  { path: "*", element: <OffRamp /> },
  { path: "stepper", element: <WrapperSession component ={<VerticalLinearStepper />} isAdmin = {false}/> },
  { path: "/layout", element: <Layout/> },

  { path: "notification", element: <WrapperSession component ={<Notification />} isAdmin = {false}/> },
  // { path: "admin/workflow", element: <WorkFlow /> }
  {path:"postman" , element:<Layout/>}
];
