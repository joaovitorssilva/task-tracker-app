import { Injectable } from '@nestjs/common';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ListsService {
  constructor(private prisma: PrismaService) { }

  async create(createListDto: CreateListDto) {
    return await this.prisma.list.create({
      data: createListDto
    })
  }

  async findAll() {
    return await this.prisma.list.findMany({
      include: {
        tasks: true,
      }
    })
  }

  async findOne(id: number) {
    return await this.prisma.list.findUnique({
      where: { id },
      include: {
        tasks: true
      }
    })
  }

  async update(id: number, updateListDto: UpdateListDto) {
    return await this.prisma.list.update({
      where: { id },
      data: updateListDto,
    })
  }

  async remove(id: number) {
    return await this.prisma.list.delete({
      where: { id }
    })
  }
}
