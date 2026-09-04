-- CreateTable
CREATE TABLE "MediaAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kind" TEXT NOT NULL DEFAULT 'image',
    "url" TEXT NOT NULL,
    "storedName" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "mimeType" TEXT,
    "size" INTEGER NOT NULL DEFAULT 0,
    "alt" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "CmsEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "coverUrl" TEXT,
    "videoUrl" TEXT,
    "dateUz" TEXT NOT NULL DEFAULT '',
    "dateRu" TEXT NOT NULL DEFAULT '',
    "dateEn" TEXT NOT NULL DEFAULT '',
    "time" TEXT NOT NULL DEFAULT '',
    "titleUz" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL DEFAULT '',
    "titleEn" TEXT NOT NULL DEFAULT '',
    "locUz" TEXT NOT NULL DEFAULT '',
    "locRu" TEXT NOT NULL DEFAULT '',
    "locEn" TEXT NOT NULL DEFAULT '',
    "bodyUz" TEXT NOT NULL DEFAULT '',
    "bodyRu" TEXT NOT NULL DEFAULT '',
    "bodyEn" TEXT NOT NULL DEFAULT '',
    "goalsUz" TEXT NOT NULL DEFAULT '',
    "goalsRu" TEXT NOT NULL DEFAULT '',
    "goalsEn" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CmsNews" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "coverUrl" TEXT,
    "videoUrl" TEXT,
    "tagUz" TEXT NOT NULL DEFAULT '',
    "tagRu" TEXT NOT NULL DEFAULT '',
    "tagEn" TEXT NOT NULL DEFAULT '',
    "dateUz" TEXT NOT NULL DEFAULT '',
    "dateRu" TEXT NOT NULL DEFAULT '',
    "dateEn" TEXT NOT NULL DEFAULT '',
    "titleUz" TEXT NOT NULL,
    "titleRu" TEXT NOT NULL DEFAULT '',
    "titleEn" TEXT NOT NULL DEFAULT '',
    "excerptUz" TEXT NOT NULL DEFAULT '',
    "excerptRu" TEXT NOT NULL DEFAULT '',
    "excerptEn" TEXT NOT NULL DEFAULT '',
    "bodyUz" TEXT NOT NULL DEFAULT '',
    "bodyRu" TEXT NOT NULL DEFAULT '',
    "bodyEn" TEXT NOT NULL DEFAULT '',
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "CmsPerson" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "kind" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "coverUrl" TEXT,
    "nameUz" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL DEFAULT '',
    "nameEn" TEXT NOT NULL DEFAULT '',
    "roleUz" TEXT NOT NULL DEFAULT '',
    "roleRu" TEXT NOT NULL DEFAULT '',
    "roleEn" TEXT NOT NULL DEFAULT '',
    "aboutUz" TEXT NOT NULL DEFAULT '',
    "aboutRu" TEXT NOT NULL DEFAULT '',
    "aboutEn" TEXT NOT NULL DEFAULT '',
    "qualsUz" TEXT NOT NULL DEFAULT '',
    "qualsRu" TEXT NOT NULL DEFAULT '',
    "qualsEn" TEXT NOT NULL DEFAULT '',
    "countryCode" TEXT,
    "mapLat" REAL,
    "mapLng" REAL,
    "mapCategory" TEXT,
    "mapLabel" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ShopProduct" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'gifts',
    "price" INTEGER NOT NULL DEFAULT 0,
    "compareAt" INTEGER NOT NULL DEFAULT 0,
    "stock" INTEGER NOT NULL DEFAULT 0,
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "coverUrl" TEXT,
    "nameUz" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL DEFAULT '',
    "nameEn" TEXT NOT NULL DEFAULT '',
    "blurbUz" TEXT NOT NULL DEFAULT '',
    "blurbRu" TEXT NOT NULL DEFAULT '',
    "blurbEn" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "ShopOrder" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "pickup" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "lang" TEXT NOT NULL DEFAULT 'uz',
    "total" INTEGER NOT NULL DEFAULT 0,
    "itemsJson" TEXT NOT NULL,
    "requestId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',
    "adminNote" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "CmsEvent_slug_key" ON "CmsEvent"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CmsNews_slug_key" ON "CmsNews"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "CmsPerson_slug_key" ON "CmsPerson"("slug");

-- CreateIndex
CREATE INDEX "CmsPerson_kind_published_idx" ON "CmsPerson"("kind", "published");

-- CreateIndex
CREATE UNIQUE INDEX "ShopProduct_slug_key" ON "ShopProduct"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "ShopOrder_requestId_key" ON "ShopOrder"("requestId");

-- CreateIndex
CREATE INDEX "ShopOrder_status_createdAt_idx" ON "ShopOrder"("status", "createdAt");

-- CreateIndex
CREATE INDEX "ShopOrder_email_idx" ON "ShopOrder"("email");
