"use server"
import { hashPassword } from "@/utils/bcrypt"
import { getUserByEmail } from "@/utils/getUser"
import { loginSchema } from "@/utils/types"
import bcrypt from 'bcryptjs'
import db from '@/db/prisma'

async function login({ email, password }: {
    email: string,
    password: string
}) {
    const validCredentials = loginSchema.safeParse({
        email, password
    })
    if (!validCredentials) {
        return {
            message: "Invalid Credentials",
            success: false
        }
    }
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            return { message: "User Does Not Exist" }
        }
        const isValidPassword = bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return {
                message: "Wrong Password",
                success: false
            }
        }
        return {
            message: "Logged In Successfully",
            success: true
        }
    } catch (error) {
        console.error({ error })
        return {
            message: "Some Error Occured"
        }
    }
}

async function register({ email, password }: {
    email: string,
    password: string
}) {
    const validCredentials = loginSchema.safeParse({ email, password });
    if (!validCredentials) return { message: "Invalid Inputs", success: false };

    const hashedPassword = await hashPassword(password);

    try {
        const user = await getUserByEmail(email);
        if (user) return { message: "A user with your email id already exists" };

        await db.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        })
        return { message: "User Created Successfully", success: true }
    } catch (error) {
        console.error({error})
        return {
            message: "Some error occurred",
            success: false
        }
    }
}