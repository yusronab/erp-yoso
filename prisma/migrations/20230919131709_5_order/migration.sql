-- CreateTable
CREATE TABLE "Sjso" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,
    "tanggalKirim" TIMESTAMP(3) NOT NULL,
    "tanggalTerima" TIMESTAMP(3) NOT NULL,
    "isStatus" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Sjso_pkey" PRIMARY KEY ("id")
);
