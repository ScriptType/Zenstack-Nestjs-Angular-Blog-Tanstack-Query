import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiHandlerService } from '@zenstackhq/server/nestjs';

@Controller('rpc/:type')
export class RpcController {
  constructor(private readonly apiHandlerService: ApiHandlerService) {}

  @Get('findMany')
  async findMany() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }
  @Get('findUnique')
  async findUnique() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Get('findFirst')
  async findFirst() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Get('count')
  async count() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Get('aggregate')
  async aggregate() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Get('groupBy')
  async groupBy() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Get('check')
  async check() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Post('create')
  async create() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Post('createMany')
  async createMany() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Put('update')
  async update() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Put('updateMany')
  async updateMany() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Post('upsert')
  async upsert() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Delete('delete')
  async delete() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }

  @Delete('deleteMany')
  async deleteMany() {
    return this.apiHandlerService.handleRequest({
      baseUrl: '/v1/api/rpc',
    });
  }
}
