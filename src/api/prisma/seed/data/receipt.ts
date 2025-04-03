import { Prisma, Receipt } from '@prisma/client';

export const receipts: Omit<Receipt, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
        store: 'Costco',
        total: new Prisma.Decimal(150.5),
        purchaseDate: new Date('2025-01-10T10:00:00Z'),
        userId: 1,
    },
    {
        store: 'Loblaws',
        total: new Prisma.Decimal(185.0),
        purchaseDate: new Date('2025-02-12T11:00:00Z'),
        userId: 1,
    },
    {
        store: 'Metro',
        total: new Prisma.Decimal(210.75),
        purchaseDate: new Date('2025-03-08T13:30:00Z'),
        userId: 1,
    },
    {
        store: 'Costco',
        total: new Prisma.Decimal(240.4),
        purchaseDate: new Date('2025-04-15T15:00:00Z'),
        userId: 1,
    },
    {
        store: 'Loblaws',
        total: new Prisma.Decimal(230.3),
        purchaseDate: new Date('2025-05-12T12:00:00Z'),
        userId: 1,
    },
    {
        store: 'Metro',
        total: new Prisma.Decimal(250.0),
        purchaseDate: new Date('2025-06-10T10:30:00Z'),
        userId: 1,
    },
    {
        store: 'Costco',
        total: new Prisma.Decimal(265.45),
        purchaseDate: new Date('2025-07-07T10:00:00Z'),
        userId: 1,
    },
    {
        store: 'Loblaws',
        total: new Prisma.Decimal(210.0),
        purchaseDate: new Date('2025-08-11T11:00:00Z'),
        userId: 1,
    },
    {
        store: 'Metro',
        total: new Prisma.Decimal(270.25),
        purchaseDate: new Date('2025-09-05T13:30:00Z'),
        userId: 1,
    },
    {
        store: 'Costco',
        total: new Prisma.Decimal(255.6),
        purchaseDate: new Date('2025-10-14T15:00:00Z'),
        userId: 1,
    },
    {
        store: 'Loblaws',
        total: new Prisma.Decimal(240.0),
        purchaseDate: new Date('2025-11-10T12:00:00Z'),
        userId: 1,
    },
    {
        store: 'Metro',
        total: new Prisma.Decimal(290.75),
        purchaseDate: new Date('2025-12-05T14:00:00Z'),
        userId: 1,
    },
];
