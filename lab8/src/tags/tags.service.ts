import { Injectable } from '@nestjs/common';
import { InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tag.entity'; 

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag)
        private readonly tagsRepository: Repository<Tag>
    ){}

    findAll(): Promise<Tag[]>{
        return this.tagsRepository.find();
    }

    async create(
        name: string,
    ): Promise<Tag> {

        const tag =
            this.tagsRepository.create({
            name,
            });

        return this.tagsRepository.save(tag);
    }

    findOne(id:number){
        return this.tagsRepository.findOne({
            where:{
                id
            }
        });
    }

   async update(
        id: number,
        name: string,
    ): Promise<Tag | null> {
        const tag =
            await this.tagsRepository.findOneBy({
            id,
            });

        if (!tag) {
            return null;
        }

        tag.name = name;
        return this.tagsRepository.save(tag);
    }

    async remove(
        id: number,
    ): Promise<boolean> {
        const result =
            await this.tagsRepository.delete(id);

        return result.affected! > 0;
    }
}