export function getSecretByRole(role, tokenType) {
  const secrets = {
    ACCESS: {
      user: process.env.ACCESS_TOKEN_USER_SECRET,
      admin: process.env.ACCESS_TOKEN_ADMIN_SECRET,
    },
    REFRESH: {
      user: process.env.REFRESH_TOKEN_USER_SECRET,
      admin: process.env.REFRESH_TOKEN_ADMIN_SECRET,
    },
  }

  const secret = secrets[tokenType]?.[role]
  if (!secret) throw new Error('invalid token role or type')
  return secret
}