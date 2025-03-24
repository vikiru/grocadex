import * as Yup from 'yup';

export const grocerySchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    quantity: Yup.number()
        .required('Quantity is required')
        .positive('Quantity must be positive'),
    unitPrice: Yup.number()
        .positive('Unit price must be positive')
        .notRequired(),
    totalPrice: Yup.number()
        .positive('Total price must be positive')
        .required('Total price is required'),
    expiryDate: Yup.date().required('Expiry date is required'),
});
