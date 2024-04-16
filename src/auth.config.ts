import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google"
import { loginSchema } from "./utils/types";

export default {
    providers: {
        Credentials: {
            async authorize (credentials : CredentialsSignin){
               const validatedFields = loginSchema.safeParse(credentials);

            }
        },
        Google : {
            ClientId : process.env.GOOGLE_CLIEND_ID,
            Client_Secret : process.env.GOOGLE_CLIENT_SECRET
        }
    }
}