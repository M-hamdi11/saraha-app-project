import jwt from 'jsonwebtoken'
import User_Repo from '../../reposetories/user-repo.js'
import { getSecretByRole } from '../createToken/getsecret.js'
import { isblacklisted } from '../../reposetories/redisrepo.js'

const user_repo = new User_Repo()

export async function verify_refresh_token_middleware(req, res, next) {
  try {
    const { refreshtoken } = req.body
    if (!refreshtoken) {
      return res.status(400).json({ message: 'refresh token is required' })
    }

    const unverified = jwt.decode(refreshtoken)
    if (!unverified || !unverified.role) {
      return res.status(401).json({ message: 'invalid token' })
    }

    const payload = jwt.verify(refreshtoken, getSecretByRole(unverified.role, 'REFRESH'), {
      issuer: 'my-app',
      audience: 'my-app-users',
    })

    if (await isblacklisted(payload.jti)) {
      return res.status(401).json({ message: 'token revoked, please login again' })
    }

    const user = await user_repo.finddocbyid(payload.id)
    if (!user) return res.status(401).json({ message: 'user not found' })

    if (user.passwordChangedAt) {
      const changedAt = Math.floor(user.passwordChangedAt.getTime() / 1000)
      if (payload.iat < changedAt) {
        return res.status(401).json({ message: 'token revoked, please login again' })
      }
    }

    req.refreshtoken = payload
    next()
  } catch (err) {
    next(err)
  }
}