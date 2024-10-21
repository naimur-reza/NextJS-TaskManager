/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import styles from "../styles/FilterBar.module.css";
export default function FilterBar({
  onStatusChange,
  onPriorityChange,
  onTagsChange,
  onSearchChange,
}: any) {
  const [tags, setTags] = useState<string>("");

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTags = e.target.value;
    setTags(newTags);
    onTagsChange(
      newTags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
    );
  };

  return (
    <div className={styles.filterBar}>
      <select
        onChange={(e) => onStatusChange(e.target.value)}
        className={styles.select}
      >
        <option value="all">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
      <select
        onChange={(e) => onPriorityChange(e.target.value)}
        className={styles.select}
      >
        <option value="all">All Priorities</option>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <input
        type="text"
        value={tags}
        onChange={handleTagsChange}
        placeholder="Filter by tags (comma-separated)"
        className={styles.input}
      />
      <input
        type="text"
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks"
        className={styles.input}
      />
    </div>
  );
}
