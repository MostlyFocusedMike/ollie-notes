/*
  Warnings:

  - Added the required column `bio` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_pic` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `provider` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" TEXT NOT NULL,
ADD COLUMN     "profile_pic" TEXT NOT NULL,
ADD COLUMN     "provider" TEXT NOT NULL;
