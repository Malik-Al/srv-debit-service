import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/modules/database/repository/user.repository';
import { Request } from 'express';
import uuid from 'uuid-base62';
import { User } from 'src/modules/database/entities/user.entity';

export interface CustomRequest extends Request {
    user: User;
}

@Injectable()
export class CheckUserGuard implements CanActivate {
    constructor(private readonly userRepository: UserRepository) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<CustomRequest>();
        const { user_id } = request.body;

        const refId: string = request.headers['reference-id'] || uuid.v4();

        if (!user_id) {
            throw new NotFoundException('user_id is required');
        }

        const user = await this.userRepository.findByValue({ user_id }, refId);

        if (!user) {
            throw new NotFoundException(`User with ID ${user_id} not found`);
        }

        request.user = user;
        return true;
    }
}