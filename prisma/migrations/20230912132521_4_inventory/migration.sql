-- CreateTable
CREATE TABLE "Limbah" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Limbah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "productType" INTEGER NOT NULL,
    "formulaId" INTEGER NOT NULL,
    "isActive" INTEGER DEFAULT 1,
    "priceX" INTEGER,
    "statusCheck" INTEGER DEFAULT 0,
    "satuanId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_satuanId_fkey" FOREIGN KEY ("satuanId") REFERENCES "Ukuran"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
