import { IsEnum, IsString } from 'class-validator';
import { daytime } from 'src/enums/daytime-menu';
export class CreateMenuDto {
  @IsString()
  name: string;

  @IsEnum(daytime, {
    message: 'daytime deve ser algumas dessas opções: day, night',
  })
  daytime: 'day' | 'night';
}
