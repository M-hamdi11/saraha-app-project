
import jwt from 'jsonwebtoken'
import User_Repo from '../../reposetories/user-repo.js'
const user_repo=new User_Repo()
export async function verify_token_middleware(req, res, next) {

    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'token is required' })
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
            issuer: 'my-app',
            audience: 'my-app-users',
    })
        const user = await user_repo.finddocbyid(payload.id)
        if (!user) {
            return res.status(401).json({ message: 'user not found' })
        }

          if (user.passwordChangedAt) {
            const passwordChangedTimestamp = Math.floor(user.passwordChangedAt.getTime() / 1000)
            if (payload.iat < passwordChangedTimestamp) {
                return res.status(401).json({ message: 'token revoked, please login again' })
            }
        } 

    req.user=payload
     next()
     
    } catch (err) {
        next(err)
    }

}