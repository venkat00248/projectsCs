const express = require("express");

const {setupLogging} = require("./utils/logging");

const app = express();

setupLogging(app);

const port = 8082;
app.get("/payment-list", (req,res)=>{
    let response = {
        data: {
            item: [
                {
                    id: 1,
                    name: 'Payment-1'
                },
                {
                    id: 2,
                    name: 'Payment-2'
                }
            ]
        }
    };
    res.status(200).json(response);
});

app.get("/", (req,res)=>{
    res.send("email service2 called");
});

app.listen(port, ()=>{
    console.log("Listening at localhost "+ port);    
})