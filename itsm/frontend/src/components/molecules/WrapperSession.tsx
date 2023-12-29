import RouteModal from "./routeModal/RouteModal";
import { isAdminUser } from "../Utils/isAdminUser";
import { Authenticate } from "../uidashboard/Authenticate";

interface WrapperSessionProps {
    component: React.ReactNode;
    isAdmin?: boolean
  }
  
  const WrapperSession: React.FC<WrapperSessionProps> = ({ component, isAdmin = true }) => {
    return (
      <>
        {isAdminUser(isAdmin) ? (           
          component
        ) : 
        (isAdmin)? 
        (
          <RouteModal isAdmin={false} />
        ): <Authenticate/>}
      </>
    );
  };
  
  export default WrapperSession;
  