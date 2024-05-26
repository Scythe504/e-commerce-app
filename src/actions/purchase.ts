"use server"
import db from "@/db/prisma"
import { getAllItems } from "./getItem"

interface Purchase {
    itemIds: string[],
    email: string
}

export const addPurchase = async ({ itemIds, email }: Purchase) => {
    try {
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

        const purchase = await db.purchase.create({
            data: {
                userEmail: email,
                items: {
                    connect: items.map((item) => ({ 
                        id: item.id,
                        title : item.title,
                        description : item.description,
                        price : item.price,
                        image : item.image
                     }))
                }
            },
            include: {
                items: true
            }
        });

        return true;
    } catch (error) {
        console.error({ error });
        throw error;
    }
}
