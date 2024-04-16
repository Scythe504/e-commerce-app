import NextAuth from "next-auth"

export const {
    handlers : { GET, POST },
    auth, 
    signIn, 
    signOut
} = NextAuth({
    signIn : "/auth/login",
    error: "/auth/error"
})