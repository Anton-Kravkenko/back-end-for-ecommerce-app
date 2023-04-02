import { PrismaClient } from '@prisma/client';
import { readFile } from 'fs/promises';

const prisma = new PrismaClient();

async function seedDatabase() {
	try {
		// Step 1: Parse the JSON file
		const jsonData = await readFile("./seed/data.json", "utf-8");
		const data = JSON.parse(jsonData);
		
		// Step 2: Map the JSON object to your database schema
		const mappedData = await Promise.all(data.map(async obj => {
			let category;
			if (obj.genre) {
				category = await prisma.category.findUnique({
					where: {
						slug: obj.genre.toLowerCase().replace(/ /g, '-')
					}
				});
				
				if (!category) {
					category = await prisma.category.create({
						data: {
							name: obj.genre,
							slug: obj.genre.toLowerCase().replace(/ /g, '-')
						}
					});
				}
			} else {
				category = await prisma.category.findFirst({
					where: {
						name: 'Other',
						slug: 'other'
					}
				});
				
				if (!category) {
					category = await prisma.category.create({
						data: {
							name: 'Other',
							slug: 'other'
						}
					});
				}
			}
			
			console.log(category);
			return {
				Name: obj.title,
				Picture: obj.url,
				Description: obj.description.join("").replace(/<[^>]*>?/gm, "") ?? "No description",
				Publisher: obj.publisher ? obj.publisher : obj.brand ?? "No publisher",
				category: {
					connect: {
						id: category.id
					}
				},
				Price: obj.price ? obj.price : 100,
				Currency: obj.currency ?? "USD",
			}}));
		
	for (const item of mappedData) {
		console.error(item);
		await prisma.product.create({
			data: item,
		});
	}

		console.log("Seed file created successfully!");
	} catch (error) {
		console.error(error);
	} finally {
		await prisma.$disconnect();
	}
}

seedDatabase();
