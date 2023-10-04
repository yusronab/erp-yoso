-- CreateTable
CREATE TABLE "FormulaItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormulaItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormulaProduksi" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "formulaItemId" INTEGER NOT NULL,
    "divisiId" INTEGER NOT NULL,

    CONSTRAINT "FormulaProduksi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FormulaUtama" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "FormulaUtama_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FormulaProduksi" ADD CONSTRAINT "FormulaProduksi_formulaItemId_fkey" FOREIGN KEY ("formulaItemId") REFERENCES "FormulaItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FormulaProduksi" ADD CONSTRAINT "FormulaProduksi_divisiId_fkey" FOREIGN KEY ("divisiId") REFERENCES "Divisi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
