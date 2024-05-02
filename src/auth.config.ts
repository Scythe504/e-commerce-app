import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import type { CredentialsSignin, NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google"
import { loginSchema } from "./utils/types";
import { getUserByEmail } from "./utils/getUser";

export default {
    providers: [
        Credentials({//@ts-ignore
            async authorize(credentials: CredentialsSignin) {
                const validatedFields = loginSchema.safeParse(credentials);
                if(!validatedFields.success){
                    return null;
                }
                const { email, password } = validatedFields.data;
                const user = await getUserByEmail(email);

                if(!user || !user.password) return null;

                const isPassword = bcrypt.compare(password, user.password);

                if(!isPassword) return null;

                return user;
            }
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ]
} satisfies NextAuthConfig