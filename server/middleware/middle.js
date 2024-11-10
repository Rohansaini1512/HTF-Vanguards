import jwt from 'jsonwebtoken';

const checkJwt = (req, res, next) => {
  let token;

  // Check for token in Authorization header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    // Check for token in cookies
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    next();
  });
};

// Log the request headers
const logHeaders = (req, res, next) => {
  console.log('Request Headers:', req.headers);
  next();
};

// Log the decoded token
const logToken = (req, res, next) => {
  console.log('Decoded Token:', req.user);
  next();
};

export { checkJwt, logHeaders, logToken };