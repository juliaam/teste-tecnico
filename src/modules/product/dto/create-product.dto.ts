import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'O preço não pode ser vazio' })
  @IsNumber({}, { message: 'O preço deve ser um número' })
  price: number;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  @IsString({ message: 'O nome deve ser um texto' })
  name: string;

  @IsNotEmpty({ message: 'A imagem não pode ser vazia' })
  @IsString({ message: 'A imagem deve ser um texto' })
  image: string;

  @IsNotEmpty({ message: 'A descrição não pode ser vazia' })
  @IsString({ message: 'A descrição deve ser um texto' })
  description: string;
}
