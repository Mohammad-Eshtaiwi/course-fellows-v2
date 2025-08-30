import { useState } from "react";
import Dialog from "@/app/components/Dialog";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";
import styles from "./updateChapterModal.module.scss";

interface UpdateChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (title: string) => void;
  initialTitle: string;
}

export default function UpdateChapterModal({
  isOpen,
  onClose,
  onUpdate,
  initialTitle,
}: UpdateChapterModalProps) {
  const [title, setTitle] = useState(initialTitle);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    debugger;
    onUpdate(title);
    onClose();
    setTitle(initialTitle); // Reset form state after submission
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Update Chapter">
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input
          label="Chapter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter chapter title"
          required
          id="chapter-title"
        />
        <div className={styles.actions}>
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary">
            Update
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
