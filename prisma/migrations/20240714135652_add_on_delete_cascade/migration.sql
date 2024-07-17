-- DropForeignKey
ALTER TABLE "category_to_learning_content" DROP CONSTRAINT "category_to_learning_content_learning_content_id_fkey";

-- AddForeignKey
ALTER TABLE "category_to_learning_content" ADD CONSTRAINT "category_to_learning_content_learning_content_id_fkey" FOREIGN KEY ("learning_content_id") REFERENCES "learning_contents"("id") ON DELETE CASCADE ON UPDATE CASCADE;
