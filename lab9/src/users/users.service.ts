import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // 👇 создать пользователя
  create(data: { email: string; password: string }) {
    const user = this.usersRepository.create(data);
    return this.usersRepository.save(user);
  }

  // 👇 найти по email (нужно для login)
  findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  // 👇 найти по id (будет нужно для /me)
  findById(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  // 👇 получить всех пользователей (не обязательно, но полезно)
  findAll() {
    return this.usersRepository.find();
  }

  // 👇 удалить пользователя (опционально)
  remove(id: string) {
    return this.usersRepository.delete(id);
  }
}