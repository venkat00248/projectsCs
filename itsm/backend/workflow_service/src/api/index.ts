import { Router } from "express";
import AuthRoutes from "./authentication";
import PingRoutes from "./ping";
//import Workflow from "./workflow";
import WorkFlowRoutes from "./routes/workflow.route";
import NodeRoutes from "./routes/nodes.routes";
import ActionRoutes from "./routes/actions.routes";
import ApiIntegrationRoutes from "./routes/api.routes";
import ApiTesting from './routes/ApiTesting.routes'
import xmlparser from 'express-xml-bodyparser'

const router: Router = Router();


router.use(xmlparser());

router.use("/auth", AuthRoutes);
router.use("/ping", PingRoutes);
router.use("/workflow", WorkFlowRoutes);
router.use("/nodes", NodeRoutes );
router.use('/actions', ActionRoutes)
router.use('/apiActions',ApiIntegrationRoutes)

router.use('/clone',ApiTesting)
export default router;