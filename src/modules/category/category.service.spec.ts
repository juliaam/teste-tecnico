import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { ProductService } from '../product/product.service';

const fakeCategorys = [
  {
    id: 1,
    name: 'Massas',
  },
  {
    id: 2,
    name: 'Carnes',
  },
  {
    id: 3,
    name: 'Bebidas',
  },
];

describe('CategoryService', () => {
  let service: CategoryService;
  let prismaServiceMock: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: PrismaService,
          useValue: {
            category: {
              create: jest.fn(),
              findMany: jest.fn().mockResolvedValue(fakeCategorys),
              findFirst: jest.fn().mockResolvedValue(fakeCategorys[0]),
              update: jest.fn().mockResolvedValue(fakeCategorys[0]),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prismaServiceMock = module.get<PrismaService>(PrismaService);
    productServiceMock = module.get<ProductService>(ProductService);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a category', async () => {
      jest
        .spyOn(prismaServiceMock.category, 'create')
        .mockResolvedValue(fakeCategorys[0]);

      const response = await service.create(fakeCategorys[0]);

      expect(response).toEqual({
        id: response.id,
        name: response.name,
      });
      expect(prismaServiceMock.category.create).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.category.create).toHaveBeenCalledWith({
        data: fakeCategorys[0],
      });
    });
  });

  describe('findAll', () => {
    it(`should return an array of categories`, async () => {
      const response = await service.findAll();

      expect(response).toEqual(fakeCategorys);
      expect(prismaServiceMock.category.findMany).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.category.findMany).toHaveBeenCalledWith();
    });
  });

  describe('findOne', () => {
    it(`should return a single category`, async () => {
      const fakeCategoryFindOne: any = fakeCategorys[0];
      fakeCategoryFindOne.include = [];

      const response = await service.findOne(1);

      expect(response).toEqual(fakeCategoryFindOne);
      expect(prismaServiceMock.category.findFirst).toHaveBeenCalledTimes(1);
      expect(prismaServiceMock.category.findFirst).toHaveBeenCalledWith({
        where: { id: 1 },
        include: {
          product: true,
        },
      });
    });

    // it(`should return a notFoundException when category is not found`, async () => {
    //   jest
    //     .spyOn(prismaServiceMock.category, 'findFirst')
    //     .mockResolvedValue(new NotFoundException('Categoria não encontrada'));

    //   const response = await service.findOne(99);

    //   expect(response).toEqual(
    //     new NotFoundException('Categoria não encontrada'),
    //   );
    //   expect(prismaServiceMock.category.findFirst).toHaveBeenCalledTimes(1);
    //   expect(prismaServiceMock.category.findFirst).toHaveBeenCalledWith({
    //     where: { id: 99 },
    //   });
    // });
    describe('deleteOne', () => {
      it(`should delete category and return a body`, async () => {
        const request = await service.remove(1);
        console.log(request);

        expect(request).toBe(fakeCategorys[0]);
        expect(prismaServiceMock.category.delete).toHaveBeenCalledTimes(1);
        expect(prismaServiceMock.category.delete).toHaveBeenCalledWith({
          where: { id: 1 },
        });
      });

      // it(`should return NotFoundException if category does not exist`, async () => {
      //   jest
      //     .spyOn(prismaServiceMock.category, 'delete')
      //     .mockRejectedValue(new Error());

      //   try {
      //     await service.remove(99);
      //   } catch (error) {
      //     expect(error).toEqual(new NotFoundException());
      //   }

      //   expect(prismaServiceMock.category.delete).toHaveBeenCalledTimes(1);
      //   expect(prismaServiceMock.category.delete).toHaveBeenCalledWith({
      //     where: { id: 99 },
      //   });
      // });
    });
  });
});
