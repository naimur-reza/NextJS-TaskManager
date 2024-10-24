/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "../styles/TaskList.module.css";

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggleCompletion,
  onToggleReminder,
}: any) {
  const isTaskDueSoon = (dueDate: string) => {
    const now = new Date();
    const taskDate = new Date(dueDate);
    const diffHours = (taskDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours <= 24;
  };

  const sortedTasks = tasks?.sort((a: any, b: any) => {
    return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
  });

  return (
    <ul className={styles.taskList}>
      {sortedTasks?.map((task: any) => (
        <li
          key={task._id}
          className={`${styles.taskItem} ${
            task.completed ? styles.completed : ""
          } ${styles[task.priority]}`}
        >
          <div className={styles.taskHeader}>
            <h3>{task.name}</h3>
            <span className={styles.dueDate}>Due: {task.dueDate}</span>
          </div>
          <p>{task.description}</p>
          <div className={styles.tags}>
            {task.tags.map((tag: string) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className={styles.taskActions}>
            <button
              onClick={() => onToggleCompletion(task._id)}
              className={styles.button}
            >
              {task.completed ? "Mark Incomplete" : "Mark Complete"}
            </button>
            <button
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
                onEdit(task);
              }}
              className={styles.button}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className={styles.button}
            >
              Delete
            </button>
            <button
              onClick={() => onToggleReminder(task)}
              className={`${styles.button} ${styles.reminder}`}
            >
              {task.reminder ? "Remove Reminder" : "Set Reminder"}
            </button>
          </div>
          {task.reminder && isTaskDueSoon(task.dueDate) && (
            <div className={styles.reminderAlert}>This task is due soon!</div>
          )}
        </li>
      ))}
    </ul>
  );
}
