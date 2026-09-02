-- CreateTable
CREATE TABLE "AuthorData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "BookData" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "bookName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "authorDataId" TEXT,
    CONSTRAINT "BookData_authorDataId_fkey" FOREIGN KEY ("authorDataId") REFERENCES "AuthorData" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "AuthorData_id_key" ON "AuthorData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookData_id_key" ON "BookData"("id");

-- CreateIndex
CREATE UNIQUE INDEX "BookData_image_key" ON "BookData"("image");
