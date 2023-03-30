/*
  Warnings:

  - You are about to drop the `_CartProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoriteProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartProduct" DROP CONSTRAINT "_CartProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartProduct" DROP CONSTRAINT "_CartProduct_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteProduct" DROP CONSTRAINT "_FavoriteProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoriteProduct" DROP CONSTRAINT "_FavoriteProduct_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cart" INTEGER[],
ADD COLUMN     "favorites" INTEGER[];

-- DropTable
DROP TABLE "_CartProduct";

-- DropTable
DROP TABLE "_FavoriteProduct";
