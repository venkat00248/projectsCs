const nodemailer = require('nodemailer')
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});

/*async function triggerEmailToUser() {
    try {
                const transporter = nodemailer.createTransport({
                    pool: true,
                    host: "10.10.121.10",
                    port: 25,
                    service: "Outlook365",
                    secure: false,
                    auth: {
                        user: "",
                        pass: ""
                    },
                    tls: {
                        ciphers: 'SSLv3'
                    },
                    debug: true,
                    logger: log
                })
                const mailOptions = {
                    from: "root@localhost.com",
                    to: "shanmukha.gadigi@cloud4c.com",
                    subject: "test email"
                };

                const info = await transporter.sendMail(mailOptions)
                console.log('message sent==================',info)
        } catch (error) {
            console.log('error=======================',error)
            throw error
        }
}*/

async function triggerEmailToUser() {
    try {
                const transporter = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: "testcloudc9@gmail.com",
                        pass: "elikapioymdzyunu"
                    },
                    debug: true,
                    logger: log
                })
                const mailOptions = {
                    from: "testcloudc9@gmail.com",
                    to: "shanmukha.gadigi@cloud4c.com",
                    subject: "test email"
                };

                const info = await transporter.sendMail(mailOptions)
                console.log('message sent==================',info)
        } catch (error) {
            console.log('error=======================',error)
            throw error
        }
}

triggerEmailToUser()