-- AlterTable
ALTER TABLE "BarangSubcont" ALTER COLUMN "paymentMethod" SET DEFAULT 1,
ALTER COLUMN "paymentStatus" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "paymentStatus" SET DEFAULT 1,
ALTER COLUMN "paymentMethod" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "PurchaseTools" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "supplier" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "ppn" INTEGER NOT NULL,
    "paymentMethod" INTEGER DEFAULT 1,
    "paymentStatus" INTEGER DEFAULT 1,
    "total" INTEGER NOT NULL,
    "tenor" INTEGER,
    "tempo" INTEGER,
    "reffSj" TEXT,
    "isStatus" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "PurchaseTools_pkey" PRIMARY KEY ("id")
);
