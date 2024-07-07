/*
  Warnings:

  - Added the required column `full_name` to the `Profile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profile_picture` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'UNKNOWN');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "full_name" VARCHAR(255) NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL DEFAULT 'UNKNOWN',
ADD COLUMN     "profile_picture" TEXT NOT NULL;
