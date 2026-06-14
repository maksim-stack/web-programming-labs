import { Controller, Get, Post, Patch, Delete, Body, Param, HttpCode, NotFoundException } from "@nestjs/common";
import { TagsService } from "./tags.service";

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

    @Post()
    create(@Body('name') name: string) {
    return this.tagsService.create(name);
    }

    @Get()
    findAll() {
    return this.tagsService.findAll();
    }

    @Patch(':id')
    update(
    @Param('id') id: string,
    @Body('name') name: string,
    ) {
    const updated = this.tagsService.update(+id, name);

    if (!updated) {
        throw new NotFoundException(`Tag #${id} not found`);
    }

    return updated;
    }

    @Delete(':id')
    @HttpCode(204)
    remove(@Param('id') id: string) {
        const deleted = this.tagsService.remove(+id);

        if (!deleted) {
            throw new NotFoundException(`Tag #${id} not found`);
        }
    }
}