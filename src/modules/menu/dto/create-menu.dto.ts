import { IsString } from 'class-validator';

export class CreateMenuDto {
  @IsString()
  name: string;
}
