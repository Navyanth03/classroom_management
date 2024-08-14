/*
  Warnings:

  - You are about to alter the column `startTime` on the `Classroom` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `endTime` on the `Classroom` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `classroomId` on the `Teacher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Classroom` MODIFY `startTime` INTEGER NOT NULL,
    MODIFY `endTime` INTEGER NOT NULL,
    MODIFY `teacherId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Teacher` DROP COLUMN `classroomId`;
