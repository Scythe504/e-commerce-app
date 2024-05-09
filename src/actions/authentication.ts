"use server"
import { hashPassword } from "@/utils/bcrypt"
import { getUserByEmail } from "@/utils/getUser"
import { loginSchema } from "@/utils/types"
import bcrypt from 'bcryptjs'
import db from '@/db/prisma'
import { z } from "zod"
import { signIn } from "@/auth"
import { DEFAULT_LOGIN_REDIRECT } from "@/routes"

export const login = async (values: z.infer<typeof loginSchema>) => {
    const validCredentials = loginSchema.safeParse(values);
    if (!validCredentials.success) {
        return {
            error: "Invalid Credentials",
        }
    }
    const { email, password } = validCredentials.data;
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return { error: "User Does Not Exist" }
        }
        const isValidPassword = bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return {
                error: "Wrong Password",
            }
        }
        try {
            await signIn("credentials",{
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT
            })
        } catch (error) {
            if(error){
                // @ts-ignore
                switch (error.type){
                    case "CredentialsSignin": return { error: "Invalid Credentials" }
                    default: 
                    return { error : "Something went wrong!"}
                }
            }
            throw error;
        }
        return {
            success: "Logged In Successfully",
        }
    } catch (error) {
        console.error({ error })
        return {
            error: "Some Error Occured"
        }
    }
}

export const register = async (values: z.infer<typeof loginSchema>) => {
    const validCredentials = loginSchema.safeParse(values);
    if (!validCredentials.success) return { error: "Invalid Inputs"};
    const { email, password } = validCredentials.data;
    const hashedPassword = await hashPassword(password);
    try {
        const user = await getUserByEmail(email);
        if (user) return { error: "A user with your email id already exists" };

        await db.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })
        return { success: "User Created Successfully" }
    } catch (error) {
        console.error({ error })
        return {
            error: "Some error occurred",
        }
    }
}