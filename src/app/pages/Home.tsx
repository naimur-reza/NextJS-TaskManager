"use client";

import { useEffect, useState } from "react";

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

export default function Home() {
  const [editingTask, setEditingTask] = useState(null);

  const { data, isLoading } = useGetAllTasksQuery("");
  const [addTask] = useAddTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();
  const [toggleComplete] = useToggleCompleteMutation();

  const [filteredTasks, setFilteredTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    if (data) {
      setFilteredTasks(data);
    }
  }, [data]);

  const handleAddTask = async (task: TaskType) => {
    try {
      const res = await addTask({ data: task });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateTask = async (task: TaskType) => {
    const { _id, ...taskData } = task;
    await updateTask({ id: _id, data: taskData });
  };
  const handleDeleteTask = async (_id: string) => {
    console.log(_id);
    await deleteTask({ id: _id });
  };
  const handleToggleCompletion = async (taskId: string) => {
    await toggleComplete({ id: taskId });
  };
  const handleToggleReminder = async (task: TaskType) => {
    const { _id, ...taskData } = task;

    await updateTask({
      id: _id,
      data: {
        reminder: !taskData.reminder,
      },
    });
  };

  const handleFilter = (name: keyof TaskType, field: string) => {
    const filterData = filteredTasks.filter(
      (item: TaskType) => item[name] === field
    );
    setFilteredTasks(filterData);
  };

  const handleSearch = (value: string) => {
    const searchData = filteredTasks.filter((item: TaskType) =>
      item.name.includes(value)
    );
    setFilteredTasks(searchData);
  };

  const handleTagsSearch = (tags: string[]) => {
    console.log(tags);
  };

  if (isLoading) return <h1>loading...</h1>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Management</h1>
      <TaskForm
        onSubmit={editingTask ? handleUpdateTask : handleAddTask}
        initialTask={editingTask}
      />
      <FilterBar
        onStatusChange={(status: string) => handleFilter("completed", status)}
        onPriorityChange={(priority: string) =>
          handleFilter("priority", priority)
        }
        onTagsChange={(tags: string[]) => handleTagsSearch(tags)}
        onSearchChange={(search: string) => handleSearch(search)}
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
