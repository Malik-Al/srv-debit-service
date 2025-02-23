import { CanActivate, ExecutionContext, HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/modules/database/repository/user.repository';
import { Request } from 'express';
import uuid from 'uuid-base62';
import { User } from 'src/modules/database/entities/user.entity';

export interface CustomRequest extends Request {
    user: User;
}

@Injectable()
export class CheckUserGuard implements CanActivate {
    constructor(private readonly userRepository: UserRepository) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<CustomRequest>();

        if (request.method === 'POST' && !request.body) {
            throw new HttpException(
                {
                    code: 400,
                    success: false,
                    message: 'fields is required',
                },
                400,
            );
        }

        const { user_id } = request.body || { user_id: Number(request.params.id) }
        const refId: string = request.headers['reference-id'] || uuid.v4();

        if (!user_id) {
            throw new HttpException(
                {
                    code: 404,
                    success: false,
                    message: 'userId is required',
                },
                404,
            );
        }

        const user = await this.userRepository.findByValue({ user_id }, refId);

        if (!user) {
            throw new HttpException(
                {
                    code: 404,
                    success: false,
                    message: `User with ID ${user_id} not found`,
                },
                404,
            );
        }

        (request as CustomRequest).user = user;
        return true;
    }
}