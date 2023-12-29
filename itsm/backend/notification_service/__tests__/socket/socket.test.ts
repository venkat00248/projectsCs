import { SocketServerMock } from 'socket.io-mock-ts';
const socket = new SocketServerMock();
const client = socket.clientMock;


test('send unread event to client on socket server establishment', async() => {
    const socket = new SocketServerMock();
    const data = [
        {
            title: 'Testing tweet',
            message: "test",
            status: "UNREAD"
        }
    ]
    socket.emit("unread",data)
    socket.clientMock.on("unread",(msg)=>{
        expect(msg).toEqual(expect.arrayContaining(data))
    })
  });

test('send error event on empty value in data',()=>{
    const socket = new SocketServerMock();
    const data = undefined
    socket.emit("error",data)
    socket.clientMock.on("error",(msg)=>{
        expect(msg).not.toBeDefined()
    })
})