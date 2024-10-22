import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import styles from "../styles/TaskForm.module.css";
import { TaskType } from "../types/types";

interface TaskFormProps {
  onSubmit: (task: TaskType) => Promise<void>;
  initialTask: TaskType | null;
}

export default function TaskForm({
  onSubmit,
  initialTask = null,
}: TaskFormProps) {
  const [task, setTask] = useState<TaskType>({
    name: "",
    description: "",
    dueDate: "",
    priority: "low",
    tags: [] as string[],
    reminder: false,
    completed: false,
  });

  useEffect(() => {
    if (initialTask) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, ...taskData } = initialTask;
      setTask(taskData);
    }
  }, [initialTask]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleTagChange = (e: ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setTask((prevTask) => ({ ...prevTask, tags }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ _id: initialTask?._id, ...task });
    setTask({
      name: "",
      description: "",
      dueDate: "",
      priority: "low",
      tags: [],
      reminder: false,
      completed: false,
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        name="name"
        value={task.name}
        onChange={handleChange}
        placeholder="Task name"
        required
        className={styles.input}
      />
      <textarea
        name="description"
        value={task.description}
        onChange={handleChange}
        placeholder="Description"
        className={styles.textarea}
      />
      <input
        type="date"
        name="dueDate"
        value={task.dueDate}
        onChange={handleChange}
        required
        className={styles.input}
      />
      <select
        name="priority"
        value={task.priority}
        onChange={handleChange}
        className={styles.select}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        name="tags"
        value={task.tags.join(", ")}
        onChange={handleTagChange}
        placeholder="Tags (comma-separated)"
        className={styles.input}
      />
      <label className={styles.checkbox}>
        <input
          type="checkbox"
          name="reminder"
          checked={task.reminder}
          onChange={(e) =>
            setTask((prevTask) => ({ ...prevTask, reminder: e.target.checked }))
          }
        />
        Set reminder
      </label>
      <button type="submit" className={styles.button}>
        {initialTask ? "Update Task" : "Add Task"}
      </button>
    </form>
  );
}
