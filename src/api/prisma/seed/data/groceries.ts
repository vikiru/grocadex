import { Prisma, GroceryItem } from '@prisma/client';

export const groceries:
    | Omit<
          GroceryItem,
          | 'id'
          | 'userId'
          | 'receiptId'
          | 'createdAt'
          | 'updatedAt'
          | 'purchaseDate'
      >[]
    | Partial<GroceryItem>[] = [
    {
        name: 'Pasta',
        isActive: true,
        quantity: 3,
        unitPrice: new Prisma.Decimal(1.99),
        totalPrice: new Prisma.Decimal(5.97),
        expiryDate: new Date('2026-12-05T10:00:00Z'),
    },
    {
        name: 'Rice',
        isActive: true,
        quantity: 2,
        unitPrice: new Prisma.Decimal(3.49),
        totalPrice: new Prisma.Decimal(6.98),
        expiryDate: new Date('2027-03-01T12:00:00Z'),
    },
    {
        name: 'Tomatoes',
        isActive: true,
        quantity: 5,
        unitPrice: new Prisma.Decimal(0.79),
        totalPrice: new Prisma.Decimal(3.95),
        expiryDate: new Date('2025-06-15T10:00:00Z'),
    },
    {
        name: 'Spinach',
        isActive: true,
        quantity: 1,
        unitPrice: new Prisma.Decimal(2.49),
        totalPrice: new Prisma.Decimal(2.49),
        expiryDate: new Date('2025-04-20T10:00:00Z'),
    },
    {
        name: 'Carrots',
        isActive: true,
        quantity: 4,
        unitPrice: new Prisma.Decimal(0.99),
        totalPrice: new Prisma.Decimal(3.96),
        expiryDate: new Date('2025-05-01T10:00:00Z'),
    },
    {
        name: 'Lettuce',
        isActive: true,
        quantity: 1,
        unitPrice: new Prisma.Decimal(1.79),
        totalPrice: new Prisma.Decimal(1.79),
        expiryDate: new Date('2025-04-30T10:00:00Z'),
    },
    {
        name: 'Apples',
        isActive: true,
        quantity: 6,
        unitPrice: new Prisma.Decimal(1.29),
        totalPrice: new Prisma.Decimal(7.74),
        expiryDate: new Date('2025-07-10T10:00:00Z'),
    },
    {
        name: 'Bananas',
        isActive: true,
        quantity: 6,
        unitPrice: new Prisma.Decimal(0.59),
        totalPrice: new Prisma.Decimal(3.54),
        expiryDate: new Date('2025-04-25T10:00:00Z'),
    },
    {
        name: 'Bell Peppers',
        isActive: true,
        quantity: 3,
        unitPrice: new Prisma.Decimal(1.49),
        totalPrice: new Prisma.Decimal(4.47),
        expiryDate: new Date('2025-05-15T10:00:00Z'),
    },
    {
        name: 'Zucchini',
        isActive: true,
        quantity: 2,
        unitPrice: new Prisma.Decimal(1.29),
        totalPrice: new Prisma.Decimal(2.58),
        expiryDate: new Date('2025-05-12T10:00:00Z'),
    },
    {
        name: 'Potatoes',
        isActive: true,
        quantity: 5,
        unitPrice: new Prisma.Decimal(0.79),
        totalPrice: new Prisma.Decimal(3.95),
        expiryDate: new Date('2025-08-20T10:00:00Z'),
    },
    {
        name: 'Broccoli',
        isActive: true,
        quantity: 1,
        unitPrice: new Prisma.Decimal(1.99),
        totalPrice: new Prisma.Decimal(1.99),
        expiryDate: new Date('2025-04-18T10:00:00Z'),
    },
];
