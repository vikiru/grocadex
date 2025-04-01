import { useColorScheme } from '~hooks/useColorScheme';
import useDashboard from '~hooks/useDashboard';
import useDashboardData from '~hooks/useDashboardData';
import useGraphData from '~hooks/useGraphData';
import useGroceryModal from '~hooks/useGroceryModal';
import { useDeleteItem, useUpdateItem } from '~hooks/useItem';
import useLogin from '~hooks/useLogin';
import useLogout from '~hooks/useLogout';
import {
    useCreateReceipt,
    useDeleteReceipt,
    useUpdateReceipt,
} from '~hooks/useReceiptForm';
import useRegistration from '~hooks/useRegistration';
import useSearchGroceries from '~hooks/useSearchGroceries';
import useSearchReceipts from '~hooks/useSearchReceipts';
import useTablePagination from '~hooks/useTablePagination';
import { useThemeColor } from '~hooks/useThemeColor';

export {
    useDashboardData,
    useGroceryModal,
    useLogout,
    useGraphData,
    useSearchGroceries,
    useSearchReceipts,
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
