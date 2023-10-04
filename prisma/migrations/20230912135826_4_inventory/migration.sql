-- CreateTable
CREATE TABLE "LimbahJual" (
    "id" SERIAL NOT NULL,
    "desc" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "LimbahJual_pkey" PRIMARY KEY ("id")
);
