-- CreateTable
CREATE TABLE "Delay" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "externalId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "expectedTime" DATETIME NOT NULL,
    "newTime" DATETIME NOT NULL,
    "info" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "track" TEXT NOT NULL,
    "train" TEXT NOT NULL,
    "type" TEXT NOT NULL
);
