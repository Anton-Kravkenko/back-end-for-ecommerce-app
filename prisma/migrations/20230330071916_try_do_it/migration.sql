/*
  Warnings:

  - You are about to drop the column `userCartId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `rewiew` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_userId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "user_id";

-- DropForeignKey
ALTER TABLE "rewiew" DROP CONSTRAINT "rewiew_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userCartId",
DROP COLUMN "userId";

-- AlterTable
ALTER TABLE "rewiew" DROP COLUMN "productId";
