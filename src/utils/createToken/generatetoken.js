import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { getSecretByRole } from './getsecret.js'

export function generatetoken(user) {
  return jwt.sign(
    { id: user._id, username: user.firstName, role: user.role },
    getSecretByRole(user.role, 'ACCESS'),
    {
      issuer: 'my-app',
      audience: 'my-app-users',
      expiresIn: '1h',
      jwtid: uuidv4(),
    }
  )
}

export function generaterefreshtoken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    getSecretByRole(user.role, 'REFRESH'),
    {
      issuer: 'my-app',
      audience: 'my-app-users',
      expiresIn: '7d',
      jwtid: uuidv4(),
    }
  )
}