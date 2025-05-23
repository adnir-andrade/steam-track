import {
    Controller,
    Get,
    Param,
    Query,
    NotFoundException,
    BadRequestException,
    ForbiddenException, HttpException, HttpStatus,
} from '@nestjs/common';
import {CustomException} from "./custom.exception";

@Controller('errors')
export class ErrorsController {
    @Get('default-error')
    throwDefaultError() {
        throw new HttpException('Erro genérico lançado com HttpException', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Get('custom')
    throwCustom() {
        throw new CustomException();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        if (id !== '1') {
            throw new NotFoundException('Recurso não encontrado');
        }
        return { id, message: 'Recurso id 1 encontrado' };
    }

    @Get()
    testBadRequest(@Query('value') value: string) {
        if (!value) {
            throw new BadRequestException('O parâmetro "value" é obrigatório');
        }
        return { value, message: 'Parâmetro válido' };
    }

    @Get('forbidden/test')
    testForbidden() {
        const userRole = 'guest'; // Simulação
        if (userRole === 'guest') {
            throw new ForbiddenException('Você não tem permissão para acessar este recurso');
        }
        return { message: 'Acesso permitido' };
    }
}