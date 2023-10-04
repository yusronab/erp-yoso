/*
  Warnings:

  - Added the required column `toolsId` to the `ToolsReduction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ToolsReduction" ADD COLUMN     "toolsId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "ToolsReduction" ADD CONSTRAINT "ToolsReduction_toolsId_fkey" FOREIGN KEY ("toolsId") REFERENCES "Tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
