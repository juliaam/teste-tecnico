import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '@/prisma/prisma.service';

const fakeProducts = [
  {
    id: 1,
    name: 'Massas',
    description: 'ALguma',
    image: 'a',
    price: 22,
    idCategory: 1,
  },
  {
    id: 2,
    name: 'sada',
    description: 'ALguma',
    image: 'a',
    price: 22,
    idCategory: 2,
  },
];

describe('ProductService', () => {
  let service: ProductService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findMany: jest.fn().mockResolvedValue(fakeProducts),
              findFirst: jest.fn().mockResolvedValue(fakeProducts[0]),
              update: jest.fn().mockResolvedValue(fakeProducts[0]),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('create', () => {
    it('should create a product', async () => {
      jest
        .spyOn(prismaServiceMock.product, 'create')
        .mockResolvedValue(fakeProducts[0]);

      const response = await service.create(fakeProducts[0]);

      expect(response).toEqual({
        id: response.id,
        name: response.name,
        description: response.description,
        price: response.price,
        image: response.image,
      });
      expect(prismaServiceMock.product.create).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.product.create).toHaveBeenCalledWith({
        data: fakeProducts[0],
      });
    });
  });

  describe('findAll', () => {
    it(`should return an array of categories`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeProducts);
      expect(prismaServiceMock.product.findMany).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.product.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it(`should return a single category`, async () => {
      const fakeProductFind: any = fakeProducts[0];

      const response = await service.findOne(1);

      expect(response).toEqual(fakeProductFind);
      expect(prismaServiceMock.category.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });
  });
});
