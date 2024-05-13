import { IsArray, IsEnum, IsString, Length } from 'class-validator';
import { DayTimeEnum, TDayTime } from 'src/enums/daytime-menu';
export class CreateMenuDto {
  @Length(2)
  @IsString()
  name: string;

  @IsEnum(DayTimeEnum, {
    message: 'daytime deve ser algumas dessas opções: day, night',
  })
  daytime: TDayTime;

  @IsArray()
  products: number[];
}
