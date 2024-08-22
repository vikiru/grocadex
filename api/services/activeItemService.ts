import ActiveItem, { ActiveItemCreationAttributes } from '../models/ActiveItem';

export async function saveActiveItem(activeItem: ActiveItemCreationAttributes): Promise<void> {
    try {
        await ActiveItem.addActiveItem(activeItem);
        console.log('Successfully saved active item to database.');
    } catch (error) {
        console.error(`Error saving active item to database: ${error}`);
    }
}

export async function retrieveActiveItems(): Promise<ActiveItem[]> {
    try {
        const activeItems = await ActiveItem.findAllActiveItems();
        console.log('Successfully retrieved active items from database.');
        return activeItems;
    } catch (error) {
        console.error(`Error retrieving active items from database: ${error}`);
    }
}

export async function retrieveActiveItemById(id: number): Promise<ActiveItem | null> {
    try {
        const activeItem = await ActiveItem.findActiveItemById(id);
        if (!activeItem) {
            console.warn(`Active item with id ${id} not found.`);
        } else {
            console.log('Successfully retrieved active item from database.');
        }
        return activeItem;
    } catch (error) {
        console.error(`Error retrieving active item with id ${id}: ${error}`);
    }
}

export async function updateActiveItemById(id: number, updatedFields: ActiveItemCreationAttributes): Promise<void> {
    try {
        await ActiveItem.updateActiveItemById(id, updatedFields);
        console.log('Successfully updated active item in the database.');
    } catch (error) {
        console.error(`Error updating active item with id ${id}: ${error}`);
    }
}

export async function removeActiveItemById(id: number): Promise<void> {
    try {
        await ActiveItem.removeActiveItemById(id);
        console.log('Successfully removed active item from the database.');
    } catch (error) {
        console.error(`Error removing active item with id ${id}: ${error}`);
    }
}
