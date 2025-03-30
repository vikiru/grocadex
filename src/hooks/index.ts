import { useColorScheme } from '~hooks/useColorScheme';
import useDashboard from '~hooks/useDashboard';
import { useDeleteItem, useUpdateItem } from '~hooks/useItem';
import useLogin from '~hooks/useLogin';
import {
    useCreateReceipt,
    useDeleteReceipt,
    useUpdateReceipt,
} from '~hooks/useReceiptForm';
import useRegistration from '~hooks/useRegistration';
import useTablePagination from '~hooks/useTablePagination';
import { useThemeColor } from '~hooks/useThemeColor';

export {
    useTablePagination,
    useColorScheme,
    useCreateReceipt,
    useDashboard,
    useDeleteItem,
    useDeleteReceipt,
    useLogin,
    useRegistration,
    useThemeColor,
    useUpdateItem,
    useUpdateReceipt,
};
