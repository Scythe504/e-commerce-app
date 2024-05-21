"use server"
import { auth } from "@/auth"
import db from "@/db/prisma"
import { getUserById, getUserCart } from "@/utils/getUser"


export const addToCart = async (itemId: string) => {
    const session = await auth();
    if (!session) {
        return { error: "user not logged in" };
    }
    try {
        const user = await getUserById(session.user?.id);
        if (!user) {
            return { error: "user not found, please log in, if is not" };
        }
        const cart = await getUserCart({
            userId: user.id
        });
        if (cart === null) {
            return { error: "some error occurred please try again later" };
        }
        const pushToCart = await db.cart.update({
            where: {
                id: cart.id,
            }, data: {
                items: {
                    connect: {
                        id: itemId
                    }
                }
            }
        })
        if (pushToCart.userId === user.id) {
            return { success : "Item has been added to your cart" };
        }
    } catch (e) {
        console.error({
            e
        })
        return { error : "Some error occurred please try again later" };
    }
}