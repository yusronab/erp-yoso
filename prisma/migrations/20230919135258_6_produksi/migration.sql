-- AlterTable
ALTER TABLE "Sjso" ALTER COLUMN "tanggalTerima" DROP NOT NULL;

-- CreateTable
CREATE TABLE "BarangSubcont" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "subcontId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "paymentMethod" INTEGER,
    "paymentStatus" INTEGER,
    "tenor" INTEGER,
    "tempo" INTEGER,
    "refSj" TEXT,
    "isStatus" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BarangSubcont_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Sjso" ADD CONSTRAINT "Sjso_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
