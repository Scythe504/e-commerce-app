"use server"
import { Item } from "@prisma/client";
import { getAllItems } from "./seed"
import FuzzySearch from "fuzzy-search"

export const searchItems = async (regex: string)=> {
    try {
        const products = await getAllItems();
        console.log(regex)
        if (products) {
            const searcher = new FuzzySearch(products, ['title', 'description'], {
                caseSensitive : false,
            })
            const result: Item[] = searcher.search(regex);
            if (!result) {
                return { error : "No results found"}
            }
            return { success : result };
        }
    } catch (error) {
        console.error({error});
        return { error : "Some error occured on our side" };
    }
}