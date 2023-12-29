const express = require('express');
const router = express.Router();
import loggerMessage from "../controllers/logger.Controller"

router.post('/', loggerMessage.logMessage);

export default router;