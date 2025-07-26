// TODO will move it to organise screen
import {
  CreateChapterSchema,
  createChapterSchema,
} from "@/app/api/chapters/[courseId]/schema";
import Button from "@/app/components/Button";
import Dialog from "@/app/components/Dialog";
import Input from "@/app/components/Input";
import { useCreateChapter } from "@/app/hooks/chapters/chapters.client";
import { useDialog } from "@/app/hooks/useDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { PiPlus } from "react-icons/pi";
import styles from "./addChapter.module.scss";

export default function AddChapter() {
  const { isOpen, open, close } = useDialog();

  const { id: courseId } = useParams<{ id: string }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createChapterSchema),
  });

  function onSubmit(data: CreateChapterSchema) {
    createChapter({
      courseId,
      title: data.title,
    });
  }
  function onClose() {
    close();
    reset();
  }
  const { mutate: createChapter, isPending } = useCreateChapter(onClose);

  return (
    <>
      <button className={styles.addChapter} onClick={open}>
        <PiPlus className={styles.icon} /> Add a new chapter
      </button>

      <Dialog
        isOpen={isOpen}
        onClose={isPending ? () => {} : onClose}
        title="Add New Chapter"
      >
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <Input
            type="text"
            id="title"
            className={styles.input}
            placeholder="Enter chapter title"
            label="Chapter Title"
            error={errors.title?.message}
            {...register("title", {
              setValueAs: (value: string) => value.trim(),
            })}
            required
          />

          <div className="button-group">
            <Button
              type="button"
              onClick={onClose}
              variant="error"
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Chapter"}
            </Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
