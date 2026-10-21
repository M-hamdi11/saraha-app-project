import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import { error_handler } from "../../errorHandling/errorclass.js";
import User_Repo from "../../reposetories/user-repo.js";
import { generatetoken } from "../createToken/generatetoken.js";
import { encryption } from "../encryption/phoneencryption.js";
import { hashpass } from "../hashing/hashpassword.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const user_repo = new User_Repo()

export async function signupwithgmailService(idToken) {
  if (!idToken) {
    throw new error_handler('Token required', 400)
  }
  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID
  })
  const payload = ticket.getPayload();
  if (!payload.email_verified) {
    throw new error_handler("Email not verified", 401);
  }
  const { sub, email, given_name, family_name, picture } = payload;

  let user = await user_repo.finddocument({ googleSub: sub });

  if (!user) {
    user = await user_repo.finddocument({ email });
    if (user) {
      await user_repo.updatedocument({ _id: user._id }, { googleSub: sub,firstName: given_name, lastName: family_name, picture });
    }
  }

  if (!user) {
    user = await user_repo.createdocument({
      googleSub: sub,
      password:await hashpass('1111'),
      phone:encryption("01012345678") ,
      email,
      firstName: given_name || "User",
      lastName: family_name || given_name || "Google",
      picture,
      provider: "google",
    });
  }
  const token = generatetoken(user);
  return token;
}
export async function signinwithgmailService(idToken) {
  if (!idToken) {
    throw new error_handler('Token required', 400)
  }
  const ticket=await client.verifyIdToken({
    idToken,
    audience:process.env.GOOGLE_CLIENT_ID
  })
 const payload=ticket.getPayload()
 if(!payload.email_verified){
   throw new error_handler("Email not verified", 401);
 }
  const { sub, email, given_name, family_name, picture } = payload;

  let user = await user_repo.finddocument({ googleSub: sub });
  if(!user){
    user=await user_repo.finddocument({email})
    if(user){
     await user_repo.updatedocument({ _id: user._id }, {googleSub: sub,firstName: given_name, lastName: family_name, picture});
    }
  }
  if(!user){
    throw new error_handler('there is no user to sign in we will make you sign up')
  }
  
  const token =generatetoken(user)
   return token
}
