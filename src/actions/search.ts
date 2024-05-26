import { Item } from "@prisma/client";
import { getAllItems } from "./getItem";
import Fuse from "fuse.js";

export const searchItems = async (products: Item[], regex: string) => {
    try {
        // TODO - Transfer the search using fuse to a client component, too many database calls are being made
        console.log(regex);
        if (products) {
            const options = {
                keys: ["title", "description"],
                threshold: 0.6, // Adjust the threshold to control the fuzziness
                minMatchCharLength: 3, // Minimum number of characters that must be matched
                includeScore: true,
            };
            const fuse = new Fuse(products, options);
            //@ts-ignore
            const result: Fuse.FuseResult<Item>[] = fuse.search(regex);
            if (!result || result.length === 0) {
                return { error: "No results found" };
            }
            // Sort the results by score
            result.sort((a, b) => a.score - b.score);
            return { success: result.map((item) => item.item) };
        }
    } catch (error) {
        console.error({ error });
        return { error: "Some error occurred on our side" };
    }
};