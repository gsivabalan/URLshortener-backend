const fs = require('fs');
const crypto = require('crypto');

const generateJwtSecret = () => {
  const secretLength = 64; // Length of the secret in bytes
  const buffer = crypto.randomBytes(secretLength);
  return buffer.toString('hex');
};

const jwtSecret = generateJwtSecret();

// Create .env file with JWT_SECRET if it doesn't exist
if (!fs.existsSync('.env')) {
  fs.writeFileSync('.env', `JWT_SECRET=${jwtSecret}\n`);
} else {
  // Update JWT_SECRET in existing .env file
  fs.appendFileSync('.env', `\nJWT_SECRET=${jwtSecret}\n`);
}

console.log('JWT secret generated and stored in .env file.');
