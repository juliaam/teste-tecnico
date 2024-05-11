import { Test, TestingModule } from '@nestjs/testing';
import { MenuService } from './menu.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';

describe('MenuService', () => {
  let service: MenuService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MenuService, PrismaService],
    }).compile();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
