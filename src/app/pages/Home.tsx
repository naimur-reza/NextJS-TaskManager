"use client";

import { useState, useMemo } from "react";
import styles from "../styles/Home/Home.module.css";
import FilterBar from "../components/FilterBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import {
  useGetAllTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useToggleCompleteMutation,
} from "../redux/api/taskApi";
import { TaskType } from "../types/types";
import toast from "react-hot-toast";
import Loader from "../components/ui/Loader";

export default function Home() {
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    tags: [] as string[],
    search: "",
  });

  const { data, isLoading } = useGetAllTasksQuery("");
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleComplete] = useToggleCompleteMutation();

  const filteredTasks = useMemo(() => {
    if (!data) return [];
    return data.filter((task: TaskType) => {
      const matchesStatus =
        filters.status === "all" ||
        (filters.status === "completed" && task.completed) ||
        (filters.status === "pending" && !task.completed);
      const matchesPriority =
        filters.priority === "all" || task.priority === filters.priority;
      const matchesTags =
        filters.tags.length === 0 ||
        filters.tags.some((tag) => task.tags.includes(tag));
      const matchesSearch =
        task.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      return matchesStatus && matchesPriority && matchesTags && matchesSearch;
    });
  }, [data, filters]);

  const handleAddTask = async (task: TaskType) => {
    try {
      await addTask({ data: task }).unwrap();
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const handleUpdateTask = async (task: TaskType) => {
    try {
      const { _id, ...taskData } = task;
      console.log(task);
      await updateTask({ id: _id, data: taskData }).unwrap();
      setEditingTask(null);
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  const handleDeleteTask = async (_id: string) => {
    try {
      await deleteTask({ id: _id }).unwrap();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleToggleCompletion = async (taskId: string) => {
    try {
      await toggleComplete({ id: taskId }).unwrap();
      toast.success("Task completion status updated successfully");
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const handleToggleReminder = async (task: TaskType) => {
    await updateTask({
      id: task._id,
      data: { reminder: !task.reminder },
    }).unwrap();
    toast.success("Task reminder status updated successfully");
  };

  const handleFilter = (name: "status" | "priority", value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
  };

  const handleTagsSearch = (tags: string[]) => {
    setFilters((prev) => ({ ...prev, tags }));
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management</h1>
      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialTask={editingTask}
      />
      <FilterBar
        onStatusChange={(status: string) => handleFilter("status", status)}
        onPriorityChange={(priority: string) =>
          handleFilter("priority", priority)
        }
        onTagsChange={handleTagsSearch}
        onSearchChange={handleSearch}
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
