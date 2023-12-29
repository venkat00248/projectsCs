import express, { Express, Request, Response } from 'express';
import * as http from "http";
import { Socket, Server} from "socket.io"
import dotenv from 'dotenv';
import { connect } from './config/database.config';
import { Message } from './models/message';
import { getUnreadMessages } from './services/message.service';
import * as bodyParser from "body-parser";
import routes from "./routes";
import path from 'path';
import { consumer } from './utils/consumerKafka';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;
const server = http.createServer(app);
const io = new Server(server,{
        cors: {
            origin: "*",
            methods: ["GET", "POST", "OPTIONS"],
          },
        transports: ['websocket']
})

app.use(bodyParser.json());
app.use("/api", routes);

app.set( "views", path.join( __dirname, "views" ) );
app.set( "view engine", "ejs" );

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});


io.on("connection",async(socket: Socket )=>{
    try{
    const data = await getUnreadMessages()
    await consumer(socket)
    if(!data) socket.emit('error',{
        errType: 'no messages found',
        data: {}
    })
    socket.emit('unread',data)
    } catch(err){
        socket.emit('error',{
            errType: 'unkwown exception',
            data: err
        })
    }
})

enum Status {
    read = "READ",
    unread = "UNREAD"
}

server.listen(port,async() => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
  await connect()
  const msg = new Message({
    title: "test",
    message: "test",
    status: Status.unread
  })
  const res = await msg.save()
});