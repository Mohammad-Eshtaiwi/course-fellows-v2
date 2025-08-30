"use client";

import { createChapterSchema } from "@/app/api/chapters/[courseId]/schema";
import Button from "@/app/components/Button";
import Dialog from "@/app/components/Dialog";
import Input from "@/app/components/Input";
import { useDialog } from "@/app/hooks/useDialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { GrFormAdd } from "react-icons/gr";
import styles from "./addChapter.module.scss";
import IconButton from "@/app/components/IconButton";

interface AddChapterProps {
  createChapter: (title: string) => void;
}

export default function AddChapter({ createChapter }: AddChapterProps) {
  const { isOpen, open, close } = useDialog();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ title: string }>({
    defaultValues: {
      title: "",
    },
    resolver: zodResolver(createChapterSchema),
  });

  function onSubmit({ title }: { title: string }) {
    createChapter(title);
    onClose();
  }

  function onClose() {
    close();
    reset();
  }

  return (
    <>
      <IconButton
        icon={GrFormAdd}
        size="sm"
        variant="secondary"
        circle
        onClick={open}
      />

      <Dialog isOpen={isOpen} onClose={onClose} title="Add New Chapter">
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

          <div className={styles.buttonGroup}>
            <Button type="button" onClick={onClose} variant="error">
              Cancel
            </Button>
            <Button type="submit">Create Chapter</Button>
          </div>
        </form>
      </Dialog>
    </>
  );
}
