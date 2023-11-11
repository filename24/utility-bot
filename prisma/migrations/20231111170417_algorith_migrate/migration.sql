-- CreateTable
CREATE TABLE "Algorithm" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "message" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "Algorithm_message_key" ON "Algorithm"("message");
