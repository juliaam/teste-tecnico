import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateProductDto {
  @IsNumber({}, { message: 'number deve ser um número' })
  @IsNotEmpty({ message: 'price não pode ser vazio' })
  price: number;

  @Length(2)
  @IsNotEmpty({ message: 'name não pode ser vazio' })
  @IsString({ message: 'name deve ser um texto' })
  name: string;

  @Length(2, 150)
  @IsNotEmpty({ message: 'description não pode ser vazia' })
  @IsString({ message: 'description deve ser um texto' })
  description: string;

  @IsNotEmpty({ message: 'image não pode ser vazia' })
  @IsString({ message: 'image deve ser um texto' })
  image: any;

  @IsNotEmpty({ message: 'idCategory não pode ser vazio' })
  idCategory: any;
}
