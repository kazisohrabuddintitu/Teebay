-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "isAvailableForRent" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isAvailableForSale" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "isRented" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isSold" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "rentEndDate" TIMESTAMP(3),
ADD COLUMN     "rentStartDate" TIMESTAMP(3),
ADD COLUMN     "rentedById" INTEGER;

-- CreateTable
CREATE TABLE "_Buyer" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_Seller" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Buyer_AB_unique" ON "_Buyer"("A", "B");

-- CreateIndex
CREATE INDEX "_Buyer_B_index" ON "_Buyer"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Seller_AB_unique" ON "_Seller"("A", "B");

-- CreateIndex
CREATE INDEX "_Seller_B_index" ON "_Seller"("B");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_rentedById_fkey" FOREIGN KEY ("rentedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Buyer" ADD CONSTRAINT "_Buyer_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Buyer" ADD CONSTRAINT "_Buyer_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Seller" ADD CONSTRAINT "_Seller_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Seller" ADD CONSTRAINT "_Seller_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
