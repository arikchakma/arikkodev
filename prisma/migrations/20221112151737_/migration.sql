-- CreateTable
CREATE TABLE "Guestbook" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(256) NOT NULL,
    "body" VARCHAR(500) NOT NULL,
    "created_by" VARCHAR(256) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Guestbook_pkey" PRIMARY KEY ("id")
);
