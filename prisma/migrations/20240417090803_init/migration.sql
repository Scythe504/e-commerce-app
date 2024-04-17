-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "signInCredentials" SET DEFAULT 'EMAIL';
