"use server"
import { auth } from "@/auth"
import db from "@/db/prisma"
import { getUserById, getUserCart } from "@/utils/getUser"
import { Cart, Item } from "@prisma/client"


export const addToCart = async ({item} : {
    item : Item
}) => {
    const session = await auth();
    try {
        if (session === null) {
            throw { error: "user not logged in" };
        }
        const user = await getUserById(session.user?.id);
        console.log({user});
        if (!user) {
            throw { error: "user not found, please log in, if is not" };
        }
        const cart = await getUserCart({
            userId: user.id
        });
        console.log({cart});
        let createdCart;
        if (cart === null) {
           createdCart = await db.cart.create({
                data : {
                    userId : user.id,
                }
            })
        }
        console.log({createdCart});
        if (createdCart === undefined && cart === null) {
            console.log("Something happended")
            throw { error : "Cart not initialised, please try again later"}
        }
        const pushToCart = await db.cart.update({
            where: {
                userId : user.id,
            }, data: {
                items: {
                    connect: {
                        id : item.id,
                        title : item.title,
                        description : item.description,
                        price : item.price,
                    }
                }
            }
        })
        console.log({pushToCart});
        if (pushToCart.userId === user.id) {
            return { success : "Item has been added to your cart" };
        }

    } catch (e) {
        console.error({
            e
        })
        return { error : e as string };
    }
}