-- CreateEnum
CREATE TYPE "Mood" AS ENUM ('angry', 'happy', 'sad', 'neutral');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mood" "Mood" NOT NULL DEFAULT 'neutral';

-- CreateIndex
CREATE INDEX "Chat_user1Id_idx" ON "Chat"("user1Id");

-- CreateIndex
CREATE INDEX "Chat_user2Id_idx" ON "Chat"("user2Id");
