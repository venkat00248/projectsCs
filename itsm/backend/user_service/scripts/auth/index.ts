import * as express from 'express';
import * as pg from 'pg';
import * as  bcrypt from 'bcrypt';
import * as  jwt from 'jsonwebtoken';
import * as bodyParser from 'body-parser';


import pool from "./src/dbconfig/dbconnector";

const app = express();
process.env.DATABASE_URL = "postgres://postgres:Rock921Mach521%40@localhost:5432/itsm"
process.env.JWT_SECRET = "my_secret"

// Connect to the database
// const connection = pg.createConnection(process.env.DATABASE_URL);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());


// Create a user model
const User = {
    id: {
        type: 'integer',
        primaryKey: true,
    },
    email: {
        type: 'string',
        unique: true,
    },
    password: {
        type: 'string',
    },
};

// Create a user repository
// const userRepository = connection.getRepository(User);


// Create a signup route
app.post('/signup', async (req, res) => {
    try {
        const client = await pool.connect();

        const { name, email, password } = req.body;

        console.log(req.body.email)
        // Check if the email already exists
        // const existingUser = await userRepository.findOne({ email });
        const existingUser: any = await client.query(`SELECT * FROM users WHERE email='${email}'`);
        console.log(existingUser)
        if (existingUser.rows.length) {
            return res.status(400).send('Email already exists');
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        // const user = new User({
        //     name,
        //     email,
        //     password: hashedPassword,
        // });

        // await userRepository.save(user);
        const user:any = await client.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        // Set the JWT token in the response
        res.status(201).json({
            token,
        });
    } catch (error) {
        console.log(error)
    }

});


// Create a login route
app.post('/login', async (req, res) => {
    try {


        const client = await pool.connect();

        console.log(req.body)

        const { email, password } = req.body;

        // Check if the user exists
        //   const user = await userRepository.findOne({ email });
        const user: any = await client.query(`SELECT * FROM users WHERE email='${email}'`);
        console.log(user.rows[0].password)
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        //   console.log(user)

        // Check if the password is correct
        const isPasswordValid = await bcrypt.compare(password, user.rows[0].password);

        console.log(isPasswordValid)

        if (!isPasswordValid) {
            return res.status(401).send('Invalid email or password');
        }

        // Generate a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

        // Set the JWT token in the response
        res.status(200).json({
            token,
        });
    } catch (error) {
        console.log(error)
    }
});

// Create a protected route
app.get('/protected', async (req, res) => {
    // Check if the user is authenticated
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        return res.status(401).send('Unauthorized');
    }

    // Verify the JWT token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // The user is authenticated, so we can proceed
        // TODO: decoded.iat can be used to validate the token created time for additional security
        res.send('Hello, ' + JSON.stringify(decoded));
    } catch (error) {
        return res.status(401).send('Unauthorized');
    }


});

// Start the server
app.listen(3000, () => {
    console.log('App is listening on port 3000');
});
