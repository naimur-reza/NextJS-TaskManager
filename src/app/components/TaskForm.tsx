/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import styles from "../styles/TaskForm.module.css";

export default function TaskForm({ onSubmit, initialTask = null }) {
  const [task, setTask] = useState({
    name: "",
    description: "",
    dueDate: "",
    priority: "low",
    tags: [],
    reminder: false,
  });

  useEffect(() => {
    if (initialTask) {
      setTask(initialTask);
    }
  }, [initialTask]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleTagChange = (e: any) => {
    const tags = e.target.value.split(",").map((tag: string) => tag.trim());
    setTask((prevTask) => ({ ...prevTask, tags }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    onSubmit(task);
    setTask({
      name: "",
      description: "",
      dueDate: "",
      priority: "low",
      tags: [],
      reminder: false,
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
