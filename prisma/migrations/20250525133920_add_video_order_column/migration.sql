/*
  Warnings:

  - Added the required column `order` to the `CourseVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseVideo" ADD COLUMN     "order" INTEGER NOT NULL;
