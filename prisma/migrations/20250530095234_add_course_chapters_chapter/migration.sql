-- AlterTable
ALTER TABLE "CourseVideo" ADD COLUMN     "chapterId" TEXT;

-- CreateTable
CREATE TABLE "CourseChapter" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "CourseChapter_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CourseVideo" ADD CONSTRAINT "CourseVideo_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "CourseChapter"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseChapter" ADD CONSTRAINT "CourseChapter_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;
