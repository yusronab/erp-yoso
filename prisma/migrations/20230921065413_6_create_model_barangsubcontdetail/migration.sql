-- CreateTable
CREATE TABLE "BarangSubcontDetail" (
    "id" SERIAL NOT NULL,
    "barangSubcontId" INTEGER NOT NULL,
    "produksiId" INTEGER,
    "productId" INTEGER NOT NULL,
    "productName" TEXT NOT NULL,
    "bayar" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL,
    "satuan" TEXT NOT NULL,
    "subtotal" INTEGER NOT NULL,
    "isStatus" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "BarangSubcontDetail_pkey" PRIMARY KEY ("id")
);
