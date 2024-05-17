"use server"

import db from "@/db/prisma"

interface item {
	title: string;
	description: string;
	price: number;
}

const items: item[] = [
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,

	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,

	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,
	},
	{
		title: "Product1",
		description: "Product description",
		price: 5000.20,

	},

]

async function seedItems() {
	try {
		items.forEach(async (item) => {
			await db.item.create({
				data: {
					title: item.title,
					description: item.description,
					price: item.price
				}
			})
		})
	} catch (error) {
		console.error({
			error
		})
	}
}


export const getAllItems = async () => {
	try {
		const items = await db.item.findMany();
		return items;
	} catch (error) {
		console.error({
			error
		})
	}
}
