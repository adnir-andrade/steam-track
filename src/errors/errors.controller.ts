import {
    Controller,
    Get,
    Param,
    Query,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { CustomException } from './custom.exception';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('errors')
@Controller('errors')
export class ErrorsController {
    @Get('default-error')
    @ApiOperation({ summary: 'Throws a generic HttpException with 500 status' })
    @ApiResponse({ status: 500, description: 'Internal server error simulated' })
    throwDefaultError() {
        throw new HttpException('Erro genérico lançado com HttpException', HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Get('custom')
    @ApiOperation({ summary: 'Throws a custom exception' })
    @ApiResponse({ status: 400, description: 'Custom exception thrown' })
    throwCustom() {
        throw new CustomException();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Throws 404 if the given ID is not 1' })
    @ApiResponse({ status: 200, description: 'Resource found with id 1' })
    @ApiResponse({ status: 404, description: 'Resource not found' })
    findOne(@Param('id') id: string) {
        if (id !== '1') {
            throw new NotFoundException('Recurso não encontrado');
        }
        return { id, message: 'Recurso id 1 encontrado' };
    }

    @Get()
    @ApiOperation({ summary: 'Throws 400 if the "value" query param is missing' })
    @ApiResponse({ status: 200, description: 'Valid parameter provided' })
    @ApiResponse({ status: 400, description: 'Missing "value" parameter' })
    testBadRequest(@Query('value') value: string) {
        if (!value) {
            throw new BadRequestException('O parâmetro "value" é obrigatório');
        }
        return { value, message: 'Parâmetro válido' };
    }

    @Get('forbidden/test')
    @ApiOperation({ summary: 'Throws 403 if user role is guest' })
    @ApiResponse({ status: 200, description: 'Access allowed' })
    @ApiResponse({ status: 403, description: 'Access forbidden for guest users' })
    testForbidden() {
        const userRole = 'guest'; // Simulated role
        if (userRole === 'guest') {
            throw new ForbiddenException('Access denied. You do not have permission to visit this place');
        }
        return { message: 'Go on! Access granted.' };
    }
}