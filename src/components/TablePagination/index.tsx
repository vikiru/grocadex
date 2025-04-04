import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HStack, Text } from '~components/ui';

type TablePaginationProps = {
    page: number;
    pageSize: number;
    numPages: number;
    itemSize: number;
    handleSkipToPage: (page: number, pageSize: number) => void;
    handleIncrementPage: (numPages: number, pageSize: number) => void;
    handleDecrementPage: (pageSize: number) => void;
};

export default function TablePagination({
    page,
    pageSize,
    numPages,
    itemSize,
    handleSkipToPage,
    handleIncrementPage,
    handleDecrementPage,
}: TablePaginationProps) {
    const currentItems = Math.min((page + 1) * pageSize, itemSize);

    return (
        <HStack className="flex w-full justify-between bg-background-100 py-4">
            <HStack className="mx-4">
                <Text className="font-info">
                    Page {page + 1} of {numPages} ({currentItems} of {itemSize}{' '}
                    items)
                </Text>
            </HStack>

            <HStack className="flex justify-between gap-2">
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-double-left"
                    onPress={() => handleSkipToPage(0, pageSize)}
                    size={24}
                />
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-left"
                    onPress={() => handleDecrementPage(pageSize)}
                    size={24}
                />
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-right"
                    onPress={() => handleIncrementPage(numPages, pageSize)}
                    size={24}
                />
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-double-right"
                    onPress={() => handleSkipToPage(numPages - 1, pageSize)}
                    size={24}
                />
            </HStack>
        </HStack>
    );
}
