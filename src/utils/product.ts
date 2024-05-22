import db from "@/db/prisma"

export const getAllReviews = async ({ itemId }: {
    itemId : string
})=> {
    try {
        const review = await db.item.findMany({
            where : {
                id : itemId
            }, include : {
                review : true
            }
        });
        
        return review;
    } catch (error) {
        console.error("review",{error});
        return null;
    }
}