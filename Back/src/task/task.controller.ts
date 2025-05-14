import { Controller, UseGuards, Post, Get, Delete, Req, Res, Body, Param, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { TaskDto } from './dto/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

/**
 * @swagger
 * /task/new:
 *   post:
 *     tags:
 *       - Task
 *     summary: Create a new task.
 *     description: Create a new task with the provided data.
 *     security:
 *      - authorization: []
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Task data
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             triggerid:
 *               type: string
 *             actionid:
 *               type: string
 *             triggerdata:
 *               type: string
 *             actiondata:
 *               type: string
 *     responses:
 *       '200':
 *         description: Task created successfully.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 */
  @Post("new")
  @UseGuards(JwtAuthGuard)
  async newTask(@Body() dto: TaskDto, @Req() req, @Res() res) {
    return this.taskService.newTask(dto, req, res);
  }

  /**
 * @swagger
 * /task/delete/{id}:
 *   delete:
 *     tags:
 *      - Task
 *     summary: Delete a task by ID.
 *     description: Delete a task with the specified ID.
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the task to delete.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Task deleted successfully.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 *       '404':
 *         description: Task not found.
 */
  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @Req() req) {
    return this.taskService.deleteTask(id, req);
  }

/**
 * @swagger
 * /task/mytasks:
 *   get:
 *     tags:
 *      - Task
 *     summary: Get tasks associated with the authenticated user.
 *     description: Retrieve tasks associated with the authenticated user.
 *     security:
 *       - authorization: []
 *     responses:
 *       '200':
 *         description: Successful response with user's tasks.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 */
  @Get('mytasks')
  @UseGuards(JwtAuthGuard)
  async getTasksUser(@Req() req) {
    return this.taskService.getTasksUser(req.user.id, req);
  }

}
