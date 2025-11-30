import TaskService from "../services/task.service.js";
import catchAsync from "../utils/catchAsync.js";

class TaskController {
  createTask = catchAsync(async (req, res) => {
    const task = await TaskService.createTask(req.body);
    return res
      .status(201)
      .json({ success: true, message: "Task created successfully", task });
  });

  getTasks = catchAsync(async (req, res) => {
    const tasks = await TaskService.getTasks();
    return res
      .status(200)
      .json({ success: true, message: "Tasks fetched successfully", tasks });
  });
}

export default new TaskController();
