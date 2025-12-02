import { AppDataSource } from "../config/database.js";
import Task from "../entities/Task.js";

class TaskService {
  createTask = async (taskData) => {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const newTask = taskRepository.create(taskData);
      const task = await taskRepository.save(newTask);
      return task;
    } catch (error) {
      throw error;
    }
  };

  getTasks = async () => {
    try {
      const taskRepository = AppDataSource.getRepository(Task);
      const tasks = await taskRepository.find();
      return tasks;
    } catch (error) {
      throw error;
    }
  };
}

export default new TaskService();
