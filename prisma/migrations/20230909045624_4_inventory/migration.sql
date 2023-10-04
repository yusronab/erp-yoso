-- CreateTable
CREATE TABLE "SubItem" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "formulaItemId" INTEGER NOT NULL,
    "formulaUtamaId" INTEGER NOT NULL,

    CONSTRAINT "SubItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubItem" ADD CONSTRAINT "SubItem_formulaItemId_fkey" FOREIGN KEY ("formulaItemId") REFERENCES "FormulaItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubItem" ADD CONSTRAINT "SubItem_formulaUtamaId_fkey" FOREIGN KEY ("formulaUtamaId") REFERENCES "FormulaUtama"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
