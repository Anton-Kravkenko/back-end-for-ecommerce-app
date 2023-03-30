/*
  Warnings:

  - You are about to drop the `_ReviewProduct` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `rewiew` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ReviewProduct" DROP CONSTRAINT "_ReviewProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_ReviewProduct" DROP CONSTRAINT "_ReviewProduct_B_fkey";

-- DropTable
DROP TABLE "_ReviewProduct";

-- DropTable
DROP TABLE "rewiew";

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "rating" INTEGER NOT NULL,
    "message" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
