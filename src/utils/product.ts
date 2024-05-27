import db from "@/db/prisma"

export const getAllReviews = async (itemId : string)=> {
    try {
        const review = await db.item.findUnique({
            where : {
                id : itemId
            }, include : {
                review : true
            }
        });
        return review;
    } catch (error) {
        console.error("review",{error});
        return { error : "No review Found"};
    }
}