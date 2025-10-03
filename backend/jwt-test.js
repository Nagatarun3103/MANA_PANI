const jwt = require('jsonwebtoken');

// Sign a token
const token = jwt.sign({ user: 'test' }, 'mysecret', { expiresIn: '1h' });

console.log('Token:', token);

// Verify the token
try {
  const payload = jwt.verify(token, 'mysecret');
  console.log('Verified payload:', payload);
} catch (err) {
  console.error('JWT verification failed:', err.message);
}
