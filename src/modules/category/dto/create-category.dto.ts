import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser um texto' })
  name: string;
}
