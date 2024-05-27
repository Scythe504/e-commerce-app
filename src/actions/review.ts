"use server"
import { auth } from "@/auth"
import db from "@/db/prisma"

export const getAllReviews = async () => {
    try {
        const review = await db.item.findMany({
            include : {
                review : true
            }
        });
        return {success : review};
    } catch (error) {
        console.error("review", { error });
        return { error: "No review Found" };
    }
}

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
        const review = await db.review.create({
            data: {
                itemId: itemId,
                content: content,
                rating: rating,
                reviewerId: session.user.id
            }
        })

        return { success: "Review Successfully Posted" }
    } catch (error) {
        console.error({ error })
        return { error: "Review could not be posted" };
    }
}