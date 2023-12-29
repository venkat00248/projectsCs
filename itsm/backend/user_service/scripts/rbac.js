import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

const app = express();

// Set up middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up a simple authentication endpoint
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  // In a real application, you would check the username and password against a database
  // and return a JWT token if they are valid. For this example, we will use a dummy token.

  const roles = ['user'];
  if (username === 'admin') {
    roles.push('admin');
  }
  if (username === 'staff') {
    roles.push('staff');
  }
  const token = jwt.sign({ username, roles }, 'secret_key', { expiresIn: '1h' });

  res.json({ token });
});

// Set up a protected endpoint that requires authentication and authorization
app.get('/protected', (req: Request, res: Response) => {
  // Get the authorization header from the request
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    // If there is no authorization header, return a 401 Unauthorized response
    res.status(401).send('Unauthorized');
    return;
  }

  // Get the token from the authorization header
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token and decode the payload
    const decoded: any = jwt.verify(token, 'secret_key');

    // Check if the user has the required role
    if (decoded.roles.includes('admin')) {
      // If the user has the required role, return a success response
      res.send('Protected content for admin');
      return;
    }

    if (decoded.roles.includes('staff')) {
      // If the user has the required role, return a success response
      res.send('Protected content for staff');
      return;
    }

    if (decoded.roles.includes('user')) {
      // If the user has the required role, return a success response
      res.send('Protected content for user');
      return;
    }

    // If the user does not have the required role, return a 403 Forbidden response
    res.status(403).send('Forbidden');
  } catch (err) {
    // If the token is invalid or expired, return a 401 Unauthorized response
    res.status(401).send('Unauthorized');
  }
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});


