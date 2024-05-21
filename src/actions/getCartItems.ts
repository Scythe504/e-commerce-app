"use server"
import db from "@/db/prisma"
import { auth } from "@/auth"
import { getUserById } from "@/utils/getUser"
import { Cart, Item } from "@prisma/client"

export const getCartItems = async () => {
    const userSession = await auth()
    if (!userSession) return { error: "User not logged in" };
    try {
        const user = await getUserById(userSession?.user?.id);
        if (!user) {
            return { error: "Cart items could not be found, please try again later" };
        }
        const cart = await db.cart.findUnique({
            where: {
                userId: user.id
            }
        })
        if (!cart) {
            return { error: "Cart items could not be found, please try again later" };
        }
        const cartItems = await db.cart.findMany({
            where: {
                userId: cart.userId
            }, include: {
                items: true
            }
        })

        return { success: cartItems };
    } catch (error) {
        console.error({ error });
        return { error: "Something went wrong" }
    }

}