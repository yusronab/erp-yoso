-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "fontColor" SET DEFAULT '#ffffff';

-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT,
    "size" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "totalStock" INTEGER NOT NULL,
    "minPurchase" INTEGER NOT NULL,
    "isStatus" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "suplierId" INTEGER NOT NULL,
    "ukuranId" INTEGER NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_suplierId_fkey" FOREIGN KEY ("suplierId") REFERENCES "Suplier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Material" ADD CONSTRAINT "Material_ukuranId_fkey" FOREIGN KEY ("ukuranId") REFERENCES "Ukuran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
