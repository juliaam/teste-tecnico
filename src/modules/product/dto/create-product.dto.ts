import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'price não pode ser vazio' })
  @IsNumber({}, { message: 'price deve ser um número' })
  price: number;

  @IsNotEmpty({ message: 'name não pode ser vazio' })
  @IsString({ message: 'name deve ser um texto' })
  name: string;

  @IsNotEmpty({ message: 'image não pode ser vazia' })
  @IsString({ message: 'image deve ser um texto' })
  image: string;

  @IsNotEmpty({ message: 'description não pode ser vazia' })
  @IsString({ message: 'description deve ser um texto' })
  description: string;

  @IsNotEmpty({ message: 'idCategory não pode ser vazio' })
  @IsNumber({}, { message: 'A categoria deve ser um número' })
  idCategory: number;
}
