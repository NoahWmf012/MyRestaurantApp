import * as yup from 'yup';
export const createVoteValidation = yup.object({
    title: yup
        .string()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title must not exceed 100 characters')
        .required('Title is required'),
    description: yup
        .string()
        .max(500, 'Description must not exceed 500 characters')
        .optional(),
    expiresAt: yup
        .date()
        .min(new Date(), 'Expiration date must be in the future')
        .required('Expiration date is required'),
    options: yup
        .array()
        .of(
            yup.object({
                restaurantName: yup
                    .string()
                    .min(2, 'Restaurant name must be at least 2 characters')
                    .max(100, 'Restaurant name must not exceed 100 characters')
                    .required('Restaurant name is required'),
                restaurantId: yup
                    .number()
                    .optional(),
            })
        )
        .min(2, 'At least two restaurant options are required')
        .max(10, 'No more than 10 restaurant options are allowed')
        .required('Restaurant options are required')
});