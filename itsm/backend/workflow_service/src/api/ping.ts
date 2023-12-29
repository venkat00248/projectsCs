import { Request, Response, NextFunction, Router } from "express";
const ping = require('ping');

const router: Router = Router();
const hosts = [
  'google.com', 
  '10.10.121.101', 
  '10.10.121.102', 
  '10.10.144.10',
  'MUMAULUKAF101',
  'MUMAULURED102',
  'MUCSAUTLPA10'
];


// Listen to messages in topic
router.get("/", async (_: Request, res: Response, next: NextFunction) => {
  try {
    let ping_response = []
    for await (let host of hosts){
        let res = await ping.promise.probe(host);
        console.log(res);
        ping_response.push(res)
    }

    res.status(200).send({
    success: true,
    message: "hello from kafka service",
    result: ping_response
   });
  } catch (err) {
   next(err);
  }
 });

export default router;
