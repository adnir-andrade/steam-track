import { IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAchievementsDto {
    @ApiProperty({
        example: 42,
        description: 'Number of achievements unlocked by the user',
    })
    @IsInt()
    @Min(0)
    unlocked: number;
}