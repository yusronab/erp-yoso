-- AddForeignKey
ALTER TABLE "BarangSubcontDetail" ADD CONSTRAINT "BarangSubcontDetail_barangSubcontId_fkey" FOREIGN KEY ("barangSubcontId") REFERENCES "BarangSubcont"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
