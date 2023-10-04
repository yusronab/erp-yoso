-- AddForeignKey
ALTER TABLE "PurchaseTools" ADD CONSTRAINT "PurchaseTools_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
