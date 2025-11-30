import { AppDataSource } from "../config/database.js";
import Task from "../entities/Task.js";

class TaskService {
  createTask = async (taskData) => {
    try {
      const task = await AppDataSource.createQueryBuilder()
        .insert()
        .into(Task)
        .values(taskData)
        .returning("id")
        .execute();
      return task;
    } catch (error) {
      throw error;
    }
  };

  getTasks = async () => {
    try {
      const tasks = await AppDataSource.createQueryBuilder()
        .select("Task")
        .from(Task, "Task")
        .getMany();
      return tasks;
    } catch (error) {
      throw error;
    }
  };
}

export default new TaskService();
