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
			if (obj.category) {
				category = await prisma.category.findUnique({
					where: {
						slug: obj.category.toLowerCase().replace(/ /g, '-')
					}
				});
				
				if (!category) {
					category = await prisma.category.create({
						data: {
							name: obj.category,
							slug: obj.category.toLowerCase().replace(/ /g, '-')
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
			
			return {
				Name: obj.name,
				Picture: obj.imageURL,
				Description: obj.Description,
				Publisher: obj.brand ,
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
