import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomException extends HttpException {
    constructor() {
        super('Erro personalizado, não tive ideia do erro ainda, mas este é personalizado.', HttpStatus.BAD_REQUEST);
    }
}