-- Rename column instead of drop + add
ALTER TABLE "Chat"
RENAME COLUMN "initiatedBy" TO "statusUpdatedBy";

-- Rename foreign key constraint
ALTER TABLE "Chat"
RENAME CONSTRAINT "Chat_initiatedBy_fkey" TO "Chat_statusUpdatedBy_fkey";