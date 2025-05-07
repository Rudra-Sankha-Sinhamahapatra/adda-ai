/*
  Warnings:

  - Added the required column `embedding` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "embedding" vector(768) NOT NULL;
