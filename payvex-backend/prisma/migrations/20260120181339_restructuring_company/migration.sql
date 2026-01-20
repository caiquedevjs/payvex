/*
  Warnings:

  - You are about to drop the column `cnpj` on the `Company` table. All the data in the column will be lost.
  - Added the required column `City` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `State` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postalCode` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."Company_cnpj_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "cnpj",
ADD COLUMN     "City" TEXT NOT NULL,
ADD COLUMN     "State" TEXT NOT NULL,
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "neighborhood" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "postalCode" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Filial" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "cnpj" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Filial_cnpj_key" ON "Filial"("cnpj");

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
