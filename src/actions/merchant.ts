"use server"
import db from "@/db/prisma"
import { itemDetailsSchema } from "@/utils/types";
import { z } from "zod"

export const publishProduct = async (values : z.infer<typeof itemDetailsSchema>, imageKey : string) => {
    const payload = itemDetailsSchema.safeParse(values);
    if (!payload.success) {
        return { error: "Invalid Inputs" }
    }
    const { title, description, price } = payload.data
    try {
        if(imageKey === "") {
            return { error : "Image not uploaded" };
        }
        await db.item.createMany({
            data: {
                title: title,
                description: description,
                price: Number(price),
                image : imageKey
            }
        })
        return { success: "Product has been published" }
    } catch (error) {
        console.error({ error })
        return ({ error: "Product could not be published" })
    }
}

export const merchantLogin = ()=> {
    //TODO - do the login logic for seller logic
}