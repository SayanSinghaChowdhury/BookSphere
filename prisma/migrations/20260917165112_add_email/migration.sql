/*
  Warnings:

  - Added the required column `email` to the `AuthorData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AuthorData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL
);
INSERT INTO "new_AuthorData" ("id", "userName") SELECT "id", "userName" FROM "AuthorData";
DROP TABLE "AuthorData";
ALTER TABLE "new_AuthorData" RENAME TO "AuthorData";
CREATE UNIQUE INDEX "AuthorData_id_key" ON "AuthorData"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
