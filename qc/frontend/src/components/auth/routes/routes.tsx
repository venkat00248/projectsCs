import { DashBoard } from "../../dashboard/DashBoard";
import DataTableWrapper from "../../dataTable/DataTableWrapper";
import { Reports } from "../../reports/Reports";
import { Roles } from "../../roles/Roles";
import UserProfile from "../../userProfile/UserProfile";
import { Videos } from "../../videos/Videos";
import { Documents } from "../../documents/Documents";
import VideoPlayer from "../../R&D/VideoPlayer";
import Indexed from "../../R&D/Indexed";
import { Trainingschedule } from "../../training/Trainingschedule";
import { Trainingresults } from "../../training/Trainingresults";
import { Employees } from "../../employees/Employees";

export const routes: any = [
  
  { path: "/", element: <DashBoard/> },
  { path: "/data", element: <DataTableWrapper/> },
  { path: "/user", element: <UserProfile/> },
  { path: "/reports", element: <Reports/> },
  { path: "/roles", element: <Roles/> },
  { path: "/videos", element: <Videos/> },
  { path: "/randD", element: <Indexed/> },
  
  { path: "/documents", element: <Documents/> },
  { path: "/trainingschedule", element: <Trainingschedule/> },
  { path: "/trainingresults", element: <Trainingresults/> },
  { path: "/employees", element: <Employees/> },
  
  // { path: "admin/workflow", element: <WorkFlow /> }
];
