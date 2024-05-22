"use server"
import { auth } from "@/auth"
import db from "@/db/prisma"

export const postReview = async ({ itemId, content, rating }: {
    itemId: string
    content: string
    rating: number
}) => {
    const session = await auth();

    try {
        if (!session) {
            throw new Error("User not logged in");
        }

        if (session.user?.id === undefined) {
            return { error: "user not found please relogin" }
        }

        await db.review.create({
            data: {
                itemId: itemId,
                content: content,
                rating: rating,
                reviewerId: session.user.id
            }
        })
    } catch (error) {
        console.error({ error })
        return { error: "Review could not be posted" };
    }
}