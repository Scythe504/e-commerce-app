import NextAuth from "next-auth"
import prisma from "@/db/prisma"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { getUserById } from "@/utils/getUser"


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut //@ts-ignore
} = NextAuth({
    pages: {
        signIn: "/auth/login",
        error: "/auth/error"
    }, events: {
        async linkAccount({ user }) {
            await prisma.user.update({
                where: {
                    id: user.id
                }, data: {
                    emailVerified : new Date(),
                }
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider !== "credentials") return true;
            //@ts-ignore
            //prevent non-authorised email users to buy
            const existingUser = await getUserById(user.id);
            if(!existingUser) return false;
            //2FA-logic
            return true
        },
        async session({ token, session }) {
            // if(session.user){
                //     //@ts-ignore
                //     session.user.customField = token.customField;
                // }
                if (token.sub && session.user) {
                    session.user.id = token.sub;
                }
                return session;
            },
            async jwt({ token }) {
                // console.log({token})
                // token.customField = 'testtoken'
                if (!token.sub) {
                    return token
                }
                const existingUser = await getUserById(token.sub)
                if (!existingUser) {
                    return token
                }
                return token
            },
            
    },
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    ...authConfig
})