import { TaskType } from "@/app/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://task-backend-bay.vercel.app/api",
  }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    addTask: builder.mutation({
      query: ({ data }) => ({
        url: "/tasks",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),

    getAllTasks: builder.query<TaskType[], string>({
      query: () => `/tasks`,
      providesTags: ["Tasks"],
    }),

    deleteTask: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: builder.mutation({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    toggleComplete: builder.mutation({
      query: ({ id }) => ({
        url: `/tasks/${id}/toggle-completion`,
        method: "PATCH",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAddTaskMutation,
  useGetAllTasksQuery,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
  useToggleCompleteMutation,
} = tasksApi;
