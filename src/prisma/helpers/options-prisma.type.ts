import { Prisma } from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';

export type CategoryOptionsPrisma = Prisma.CategoryFindFirstArgs<DefaultArgs>;
export type ProductOptionsPrisma = Prisma.ProductFindFirstArgs<DefaultArgs>;
export type MenuOptionsPrisma = Prisma.MenuFindFirstArgs<DefaultArgs>;
