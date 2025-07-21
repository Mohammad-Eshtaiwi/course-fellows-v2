import Dialog from "@/app/components/Dialog";
import Button from "@/app/components/Button";
import Alert from "@/app/components/Alert";
import { useDeleteCourse, Course } from "@/app/hooks/courses/courses.client";
import { IoWarningOutline } from "react-icons/io5";
import styles from "./deleteCourseDialog.module.scss";

interface DeleteCourseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  course: Course | null;
}

export default function DeleteCourseDialog({ isOpen, onClose, course }: DeleteCourseDialogProps) {
  const deleteCourseMutation = useDeleteCourse();

  function handleDelete() {
    if (!course) return;

    deleteCourseMutation.mutate(course.id, {
      onSuccess: () => {
        onClose();
      },
    });
  }

  function handleClose() {
    if (!deleteCourseMutation.isPending) {
      onClose();
    }
  }

  if (!course) {
    return null;
  }

  return (
    <Dialog
      isOpen={isOpen}
      onClose={handleClose}
      title="Delete Course"
      maxWidth="sm"
    >
      <div className={styles.content}>
        {deleteCourseMutation.isError && (
          <Alert
            variant="danger"
            message={deleteCourseMutation.error?.message || "Failed to delete course"}
            isVisible={true}
            dismissible={false}
          />
        )}
        
        <div className={styles.warning}>
          <IoWarningOutline className={styles.warningIcon} />
          <div className={styles.warningContent}>
            <h3 className={styles.warningTitle}>Are you sure?</h3>
            <p className={styles.warningMessage}>
              This will permanently delete <strong>"{course.title}"</strong>. 
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className={styles.actions}>
          <Button
            type="button"
            variant="primary"
            onClick={handleClose}
            disabled={deleteCourseMutation.isPending}
            size="small"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="error"
            onClick={handleDelete}
            disabled={deleteCourseMutation.isPending}
            size="small"
          >
            {deleteCourseMutation.isPending ? "Deleting..." : "Delete Course"}
          </Button>
        </div>
      </div>
    </Dialog>
  );
}
