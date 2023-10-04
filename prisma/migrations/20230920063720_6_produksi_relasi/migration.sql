-- AddForeignKey
ALTER TABLE "BarangSubcont" ADD CONSTRAINT "BarangSubcont_subcontId_fkey" FOREIGN KEY ("subcontId") REFERENCES "Subcont"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BarangSubcont" ADD CONSTRAINT "BarangSubcont_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
