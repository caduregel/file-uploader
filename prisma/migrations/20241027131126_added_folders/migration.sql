-- CreateTable
CREATE TABLE "folders" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "userUsername" TEXT,

    CONSTRAINT "folders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "folders" ADD CONSTRAINT "folders_userUsername_fkey" FOREIGN KEY ("userUsername") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;
