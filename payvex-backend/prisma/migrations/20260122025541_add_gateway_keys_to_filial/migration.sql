/*
  Warnings:

  - Made the column `name` on table `Filial` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."Filial" DROP CONSTRAINT "Filial_companyId_fkey";

-- AlterTable
ALTER TABLE "Filial" ADD COLUMN     "mercadoPagoAccessToken" TEXT,
ADD COLUMN     "stripePublicKey" TEXT,
ADD COLUMN     "stripeSecretKey" TEXT,
ADD COLUMN     "stripeWebhookSecret" TEXT,
ALTER COLUMN "name" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Filial_companyId_idx" ON "Filial"("companyId");

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
