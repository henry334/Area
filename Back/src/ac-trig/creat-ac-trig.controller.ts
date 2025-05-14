import { Controller, Post, Body, Req, UseGuards, Get, Param, Delete, Put } from '@nestjs/common';
import { CreatAcTrigService } from './creat-ac-trig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from '../admin/admin.guard';
import {NewActionDto, NewTriggerDto, NewServiceDto} from './dto/ac-trig.dto';

@Controller('actrig')
export class CreatAcTrigController {
  constructor(private readonly creatAcTrigService: CreatAcTrigService) {}

  // Add a new action
  /**
   * @swagger
   * /actrig/addaction:
   *   post:
   *     tags:
   *       - Actrig
   *     summary: Add a new action.
   *     description: Add a new action with provided data.
   *     security:
   *       - authorization: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewActionDto'
   *     responses:
   *       '200':
   *         description: Action added successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Post("addaction")
  @UseGuards(JwtAuthGuard)
  async newAction(@Body() dto: NewActionDto) {
    return this.creatAcTrigService.newAction(dto);
  }

  // Add a new trigger
  /**
   * @swagger
   * /actrig/addtrigger:
   *   post:
   *     tags:
   *       - Actrig
   *     summary: Add a new trigger.
   *     description: Add a new trigger with the provided data.
   *     security:
   *       - authorization: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewTriggerDto'
   *     responses:
   *       '200':
   *         description: Trigger added successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Post("addtrigger")
  @UseGuards(JwtAuthGuard)
  async newTrigger(@Body() dto: NewTriggerDto) {
    return this.creatAcTrigService.newTrigger(dto);
  }

   // Get all actions
  /**
   * @swagger
   * /actrig/getactions:
   *   get:
   *     tags:
   *       - Actrig
   *     summary: Get all actions.
   *     description: Retrieve all available actions.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: Successful response with all available actions.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("getactions")
  @UseGuards(JwtAuthGuard)
  async getActions(@Req() req) {
    return this.creatAcTrigService.getActions(req);
  }

   // Get all triggers
  /**
   * @swagger
   * /actrig/gettriggers:
   *   get:
   *     tags:
   *       - Actrig
   *     summary: Get all triggers.
   *     description: Retrieve all available triggers.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: Successful response with all available triggers.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("gettriggers")
  @UseGuards(JwtAuthGuard)
  async getTriggers(@Req() req) {
    return this.creatAcTrigService.getTriggers(req);
  }

  // Add a new service
  /**
   * @swagger
   * /actrig/addservice:
   *   post:
   *     tags:
   *       - Actrig
   *     summary: Add a new service.
   *     description: Add a new service with the provided data.
   *     security:
   *       - authorization: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewServiceDto'
   *     responses:
   *       '200':
   *         description: Service added successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */

  @Post("addservice")
  @UseGuards(JwtAuthGuard)
  async addService(@Body() dto: NewServiceDto, @Req() req) {
    return this.creatAcTrigService.addService(dto, req);
  }

  // Get all services
  /**
   * @swagger
   * /actrig/getservices:
   *   get:
   *     tags:
   *       - Actrig
   *     summary: Get all services.
   *     description: Retrieve all available services.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: Successful response with all available services.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("getservices")
  @UseGuards(JwtAuthGuard)
  async getServices(@Req() req) {
    return this.creatAcTrigService.getServices();
  }

  /**
 * Get a service by ID
 *
 * @swagger
 * /actrig/getservices/{id}:
 *   get:
 *     tags:
 *       - Actrig
 *     summary: Get a service by ID.
 *     description: Retrieve a service by its unique ID.
 *     security:
 *       - authorization: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the service to retrieve.
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response with the requested service.
 *       '401':
 *         description: Unauthorized, authentication token is missing or invalid.
 *       '404':
 *         description: Service not found.
 */
  @Get("getservices/:id")
  @UseGuards(JwtAuthGuard)
  async getService(@Param('id') id: string) {
    return this.creatAcTrigService.getServicesById(id);
  }

  // Get actions of a specific service
  /**
   * @swagger
   * /actrig/getactions/{service}:
   *   get:
   *     tags:
   *       - Actrig
   *     summary: Get actions of a specific service.
   *     description: Retrieve actions associated with the specified service.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: service
   *         required: true
   *         description: Name of the service to get actions for.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Successful response with actions of the specified service.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("getactions/:service")
  @UseGuards(JwtAuthGuard)
  async getAction(@Param('service') name: string, @Req() req) {
    return this.creatAcTrigService.getActionOfService(name, req);
  }

  // Get triggers of a specific service
  /**
   * @swagger
   * /actrig/gettriggers/{service}:
   *   get:
   *     tags:
   *       - Actrig
   *     summary: Get triggers of a specific service.
   *     description: Retrieve triggers associated with the specified service.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: service
   *         required: true
   *         description: Name of the service to get triggers for.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Successful response with triggers of the specified service.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("gettriggers/:service")
  @UseGuards(JwtAuthGuard)
  async getTrigger(@Param('service') name: string, @Req() req) {
    return this.creatAcTrigService.getTriggerOfService(name, req);
  }

  // Delete an action by ID
  /**
   * @swagger
   * /actrig/deleteaction/{id}:
   *   delete:
   *     tags:
   *       - Actrig
   *     summary: Delete an action by ID.
   *     description: Delete an action with the specified ID.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the action to delete.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Action deleted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Delete("deleteaction/:id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteAction(@Param('id') id: string, @Req() req) {
    return this.creatAcTrigService.deleteAction(id, req);
  }

  // Delete a trigger by ID
  /**
   * @swagger
   * /actrig/deletetrigger/{id}:
   *   delete:
   *     tags:
   *       - Actrig
   *     summary: Delete a trigger by ID.
   *     description: Delete a trigger with the specified ID.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the trigger to delete.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Trigger deleted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Delete("deletetrigger/:id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteTrigger(@Param('id') id: string, @Req() req) {
    return this.creatAcTrigService.deleteTrigger(id, req);
  }

  // Delete a service by ID
  /**
   * @swagger
   * /actrig/deleteservice/{id}:
   *   delete:
   *     tags:
   *       - Actrig
   *     summary: Delete a service by ID.
   *     description: Delete a service with the specified ID.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the service to delete.
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Service deleted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Delete("deleteservice/:id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async deleteService(@Param('id') id: string, @Req() req) {
    return this.creatAcTrigService.deleteService(id, req);
  }

  // Modify a service by ID
  /**
   * @swagger
   * /actrig/modifyservice/{id}:
   *   post:
   *     tags:
   *       - Actrig
   *     summary: Modify a service by ID.
   *     description: Modify a service with the specified ID.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the service to modify.
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/NewServiceDto'
   *     responses:
   *       '200':
   *         description: Service modified successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Post("modifyservice/:id")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async modifyService(@Param('id') id: string, @Body() dto: NewServiceDto, @Req() req) {
    return this.creatAcTrigService.modifyService(id, dto, req);
  }

   // Set trigger-action availability status
  /**
   * @swagger
   * /actrig/trigactionavailability/{id}/{status}:
   *   put:
   *     tags:
   *       - Actrig
   *     summary: Set trigger-action availability status.
   *     description: Set the availability status for a trigger-action with the specified ID.
   *     security:
   *       - authorization: []
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: ID of the trigger-action to modify.
   *         schema:
   *           type: string
   *       - in: path
   *         name: status
   *         required: true
   *         description: New availability status (e.g., 'enabled' or 'disabled').
   *         schema:
   *           type: string
   *     responses:
   *       '200':
   *         description: Trigger-action availability status set successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Put("trigactionavailability/:id/:status")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async serviceAvailability(@Param('id') id: string, @Param('status') status: string, @Req() req) {
    return this.creatAcTrigService.serviceAvailability(id, status, req);
  }

  // Delete all
  /**
   * @swagger
   * /actrig/deleteall:
   *   get:
   *     tags:
   *       - Actrig
   *     summary: Delete all.
   *     description: Delete all trigger-actions and services.
   *     security:
   *       - authorization: []
   *     responses:
   *       '200':
   *         description: All trigger-actions and services deleted successfully.
   *       '401':
   *         description: Unauthorized, authentication token is missing or invalid.
   */
  @Get("deleteall")
  @UseGuards(JwtAuthGuard)
  async deleteAll(@Req() req) {
    return this.creatAcTrigService.deleteAll(req);
  }
}
