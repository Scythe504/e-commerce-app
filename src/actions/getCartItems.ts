// "use server"
// import db from "@/db/prisma"
// import { auth } from "@/auth"
// import { getUserById } from "@/utils/getUser"

// export const getCartItems = async ()=>{
//     const userSession = await auth()
//     if(!userSession) return null;
//     try {
//         const userId = await getUserById(userSession?.user?.id);  
//         const cartItems = await db.cartItem.findMany({
//             where : {
//                  cartId : userId?.id
//             }
//         })
//         return { 
//             items : cartItems,
//             message : "OK"
//         }
//     } catch (error) {
//         return {
//             items : null

//         }
//         console.error({error});
//     }

// }