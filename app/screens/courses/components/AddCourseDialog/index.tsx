import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "@/app/components/Dialog";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import Alert from "@/app/components/Alert";
import RadioGroup, { RadioOption } from "@/app/components/RadioGroup";
import { useAddCourse } from "@/app/hooks/courses/courses.client";
import { addCourseSchema, AddCourseSchema } from "./schema";
import styles from "./addCourseDialog.module.scss";
import { PLAYLIST_ID_REQUIRED, VIDEO_ID_REQUIRED } from "@/app/api/user-courses/add/add.constants";

interface AddCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const courseTypeOptions: RadioOption[] = [
  {
    label: "YouTube Playlist",
    value: "playlist",
    description: "Import an entire playlist of videos as a course",
  },
  {
    label: "YouTube Video",
    value: "video",
    description: "Import a single video as a course",
  },
];

export default function AddCourseDialog({ isOpen, onClose }: AddCourseDialogProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    control,
  } = useForm<AddCourseSchema>({
    defaultValues: {
      type: "playlist",
      url: "",
    },
    resolver: zodResolver(addCourseSchema),
  });

  const selectedType = watch("type");
  const addCourseMutation = useAddCourse();

  function onSubmit(data: AddCourseSchema) {
    addCourseMutation.mutate(
      { url: data.url, type: data.type },
      {
        onSuccess: () => {
          reset();
          onClose();
        },
      }
    );
  }

  const errorMessage = getAddCourseErrorMessage(addCourseMutation.error?.message);

  function handleClose() {
    if (!addCourseMutation.isPending) {
      reset();
      onClose();
    }
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Add New Course"
      maxWidth="md"
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate className={styles.form}>
        {addCourseMutation.isError && (
          <Alert
            variant="danger"
            message={errorMessage}
            isVisible={true}
            dismissible={false}
          />
        )}
        <div className={styles.formGroup}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup
                label="Course Type"
                options={courseTypeOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.type?.message}
                disabled={addCourseMutation.isPending}
              />
            )}
          />
        </div>

        <div className={styles.formGroup}>
          <Input
            id="course-url"
            label="YouTube URL"
            type="url"
            placeholder={
              selectedType === "playlist"
                ? "https://www.youtube.com/playlist?list=..."
                : "https://www.youtube.com/watch?v=..."
            }
            error={errors.url?.message}
            description={
              selectedType === "playlist"
                ? "Enter a YouTube playlist URL"
                : "Enter a YouTube video URL"
            }
            {...register("url", {
              setValueAs: (value: string) => value.trim(),
            })}
            required
          />
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="error"
            onClick={handleClose}
            disabled={addCourseMutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={addCourseMutation.isPending}
          >
            {addCourseMutation.isPending ? "Adding..." : "Add Course"}
          </Button>
        </div>
      </form>
    </Dialog>
  );
}

// Utility function to map error messages
function getAddCourseErrorMessage(message?: string) {
  if (message?.includes(PLAYLIST_ID_REQUIRED)) {
    return "Please enter a valid YouTube playlist URL";
  }

  if (message?.includes(VIDEO_ID_REQUIRED)) {
    return "Please enter a valid YouTube video URL";
  }

  return "Something went wrong, please try again";
}
