/*
  Warnings:

  - You are about to drop the `Guestbook` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Guestbook";

-- CreateTable
CREATE TABLE "guestbook" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "created_by" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "guestbook_pkey" PRIMARY KEY ("id")
);
