import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HStack, Text } from '~components/ui';

type TablePaginationProps = {
    page: number;
    numPages: number;
    handleSkipToPage: (page: number) => void;
    handleIncrementPage: (numPages: number) => void;
    handleDecrementPage: () => void;
};

export default function TablePagination({
    page,
    numPages,
    handleSkipToPage,
    handleIncrementPage,
    handleDecrementPage,
}: TablePaginationProps) {
    return (
        <HStack className="flex w-full justify-between bg-background-100 py-4">
            <HStack className="mx-4">
                <Text className="font-info">
                    Page {page + 1} of {numPages}
                </Text>
            </HStack>

            <HStack className="flex justify-between gap-2">
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-double-left"
                    onPress={() => handleSkipToPage(0)}
                    size={24}
                />
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-left"
                    onPress={() => handleDecrementPage()}
                    size={24}
                />
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-right"
                    onPress={() => handleIncrementPage(numPages)}
                    size={24}
                />
                <MaterialCommunityIcons
                    className="hover:text-typography-500 active:text-typography-600"
                    name="chevron-double-right"
                    onPress={() => handleSkipToPage(numPages - 1)}
                    size={24}
                />
            </HStack>
        </HStack>
    );
}
