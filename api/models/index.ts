import { ActiveItem } from './ActiveItem';
import { GroceryItem } from './GroceryItem';
import { Receipt } from './Receipt';
import { User } from './User';

ActiveItem.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

ActiveItem.belongsTo(Receipt, {
    foreignKey: 'receiptId',
    as: 'receipt',
});

ActiveItem.belongsTo(GroceryItem, {
    foreignKey: 'groceryItemId',
    as: 'groceryItem',
});

GroceryItem.belongsTo(Receipt, {
    foreignKey: 'receiptId',
    as: 'receipt',
});

Receipt.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user',
});

Receipt.hasMany(GroceryItem, {
    foreignKey: 'receiptId',
    as: 'groceryItems',
});

User.hasMany(Receipt, {
    foreignKey: 'userId',
    as: 'receipts',
});

export { ActiveItem, GroceryItem, Receipt, User };
