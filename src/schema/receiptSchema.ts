import * as Yup from 'yup';

export const receiptSchema = Yup.object({
    store: Yup.string().required('Must provide a store name'),
    purchaseDate: Yup.date().required('Must provide a valid purchase date'),
    total: Yup.number()
        .required('Total should not be 0')
        .positive('Total price must be positive'),
    groceryItems: Yup.array()
        .of(
            Yup.object().shape({
                name: Yup.string().required(),
                quantity: Yup.number().required(),
                totalPrice: Yup.number().required(),
                unitPrice: Yup.number().required(),
                purchaseDate: Yup.date().required(),
                expiryDate: Yup.date().required(),
            }),
        )
        .required('No groceries added to receipt'),
});
