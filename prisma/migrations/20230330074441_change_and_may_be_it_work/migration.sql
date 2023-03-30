-- AlterTable
ALTER TABLE "rewiew" ADD COLUMN     "productId" INTEGER;

-- CreateTable
CREATE TABLE "_FavoriteProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_CartProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ReviewProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteProduct_AB_unique" ON "_FavoriteProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteProduct_B_index" ON "_FavoriteProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_CartProduct_AB_unique" ON "_CartProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_CartProduct_B_index" ON "_CartProduct"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ReviewProduct_AB_unique" ON "_ReviewProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_ReviewProduct_B_index" ON "_ReviewProduct"("B");

-- AddForeignKey
ALTER TABLE "_FavoriteProduct" ADD CONSTRAINT "_FavoriteProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteProduct" ADD CONSTRAINT "_FavoriteProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartProduct" ADD CONSTRAINT "_CartProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartProduct" ADD CONSTRAINT "_CartProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewProduct" ADD CONSTRAINT "_ReviewProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReviewProduct" ADD CONSTRAINT "_ReviewProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "rewiew"("id") ON DELETE CASCADE ON UPDATE CASCADE;
