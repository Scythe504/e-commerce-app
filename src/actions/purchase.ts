"use server"
import db from "@/db/prisma"
import { auth } from "@/auth"

interface Purchase {
    itemIds: string[],
}

export const addPurchase = async ({ itemIds }: Purchase) => {
    const session = await auth();
    try {
        if (!session?.user || !session) {
            throw new Error("Not Logged In");
        }
        const items = await db.item.findMany({
            where: {
                id: {
                    in: itemIds
                }
            }
        });

        if (items.length === 0) {
            throw new Error("No Items Found");
        }

        const userPurchase = await db.purchase.findUnique({
            where: {
                userId: session.user.id,
            }
        })

        if (!userPurchase) {
            await db.purchase.create({
                data: {
                    userId: session.user.id!,
                    items: {
                        connect: items.map((item) => ({
                            id: item.id,
                            title: item.title,
                            description: item.description,
                            price: item.price,
                            image: item.image
                        }))
                    }
                },
                include: {
                    items: true
                }
            });

        } else {
            await db.$transaction([
                db.purchase.update({
                    where: {
                        userId: session.user.id,
                    }, data: {
                        items: {
                            connect: items.map((item) => ({
                                id: item.id,
                                title: item.title,
                                description: item.description,
                                price: item.price,
                                image: item.image
                            }))
                        }
                    },
                }),
                db.cart.update({
                    where: {
                        userId: session.user.id
                    }, data: {
                        items: {
                            set: []
                        }
                    }
                })
            ])
        }

        return { success: "Purchase Successfull" };
    } catch (error) {
        console.error({ error });
        return { error: "Purchase Unsuccessfull" };
    }
}

export const getPurchases = async () => {
    const session = await auth();
    try {
        if (!session || !session.user) {
            throw new Error("Not logged in");
        }
        const id = session.user.id as string;
        const purchase = await db.purchase.findUnique({
            where: {
                userId: id,
            }, include: {
                items: true
            }
        })

        return { success: purchase };
    } catch (error) {
        console.error({
            error
        })
        return { error: "Some error occurred" };
    }
}


