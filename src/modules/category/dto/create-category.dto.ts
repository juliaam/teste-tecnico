import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @Length(2)
  @IsNotEmpty({ message: 'name não pode ser vazio' })
  @IsString({ message: 'name deve ser um texto' })
  name: string;
}
