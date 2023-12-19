/*
  Warnings:

  - Made the column `password` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "RentDurationType" AS ENUM ('PER_DAY', 'PER_WEEK', 'PER_MONTH');

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "password" SET NOT NULL;

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT[],
    "description" TEXT NOT NULL,
    "purchasePrice" DOUBLE PRECISION NOT NULL,
    "rentPrice" DOUBLE PRECISION NOT NULL,
    "rentDurationType" "RentDurationType" NOT NULL,
    "summary" TEXT NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
