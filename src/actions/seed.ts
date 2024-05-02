"use server"

import db from "@/db/prisma"
// import { randomBytes } from "crypto";

// const items = [
//     {
//         title: "Product1",  
//         description: "Product description",
//         price: 5000.20,
//         cartId: randomBytes(32).toLocaleString()
//     },
//     {
//         title: "Product1",
//         description: "Product description",
//         price: 5000.20,
//         cartId: randomBytes(32).toLocaleString()
//     },
//     {
//         title: "Product1",
//         description: "Product description",
//         price: 5000.20,
//         cartId: randomBytes(32).toLocaleString()
//     },
//     {
//         title: "Product1",
//         description: "Product description",
//         price: 5000.20,
//         cartId: randomBytes(32).toLocaleString()
//     },
//     {
//         title: "Product1",
//         description: "Product description",
//         price: 5000.20,
//         cartId: randomBytes(32).toLocaleString()
//     },
//     {
//         title: "Product1",
//         description: "Product description",
//         price: 5000.20,
//         cartId: randomBytes(32).toLocaleString()
//     },

// ]

// export const itemList = async () => {
//     try {
//         const itemsList = await db.cart.findMany();
//         if (itemsList.length !== 0) return;
//         await db.item.createMany({ data: items });
//         const bulkItem = await db.item.findMany();
//         console.log({ bulkItem });
//         return bulkItem;
//     } catch (error) {
//         console.error({ error })
//     }
// }

async function getItems() {
    try {
      const itemsList = await db.item.findMany();
      return itemsList
    } catch (e) {
      console.log("error" + e)
      return []
    }
  }

export default getItems;
