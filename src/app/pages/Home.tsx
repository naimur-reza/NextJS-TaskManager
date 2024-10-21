"use client";

import { useState } from "react";

import styles from "../styles/Home/Home.module.css";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { useGetAllTasksQuery } from "../redux/api/taskApi";

export default function Home() {
  const [editingTask, setEditingTask] = useState(null);

  const { data: filteredTasks, isLoading } = useGetAllTasksQuery("");

  const handleUpdateTask = () => {};
  const handleAddTask = () => {};
  const handleDeleteTask = () => {};
  const handleToggleCompletion = () => {};
  const handleToggleReminder = () => {};

  if (isLoading) return <h1>loading...</h1>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management</h1>
      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialTask={editingTask}
      />
      <FilterBar
      // onStatusChange={(status) => dispatch(setStatusFilter(status))}
      // onPriorityChange={(priority) => dispatch(setPriorityFilter(priority))}
      // onTagsChange={(tags) => dispatch(setTagsFilter(tags))}
      // onSearchChange={(search) => dispatch(setSearchFilter(search))}
      />
      <TaskList
        tasks={filteredTasks}
        onEdit={setEditingTask}
        onDelete={handleDeleteTask}
        onToggleCompletion={handleToggleCompletion}
        onToggleReminder={handleToggleReminder}
      />
    </div>
  );
}
