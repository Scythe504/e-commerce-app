import { auth } from '@/auth';
import db from '@/db/prisma'

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        return user;
    } catch (error) {
        console.error({ error })
        return null;
    }
}

export const getUserById = async (id: string | undefined) => {
    try {
        const user = await db.user.findUnique({
            where: {
                id
            }
        });
        return user;
    } catch (error) {
        console.error({error})
        return null;
    }
}

export const getUserCart = async ({userId}: {
    userId : string,
})=> {
    try {
        const cart = db.cart.findUnique({
            where : {
                userId
            }, include : {
                items : true
            }
        })
        if (!cart) {
            await db.cart.create({
                data : {
                    userId : userId
                }
            })
        }

        return cart;
    } catch (error) {
        console.log({
            error
        })
        return null;
    }
}