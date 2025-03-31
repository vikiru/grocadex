import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HStack, Input, InputField } from '~components/ui';

type SearchbarProps = {
    placeholder: string;
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

export default function Searchbar({
    placeholder,
    query,
    setQuery,
}: SearchbarProps) {
    console.log(query);
    return (
        <HStack className="mx-4 mb-4 mt-2">
            <Input className="flex w-full items-center bg-background-0">
                <InputField
                    className="font-body"
                    onChangeText={setQuery}
                    placeholder={placeholder}
                    value={query}
                />
                <MaterialCommunityIcons
                    className="mr-2"
                    name="magnify"
                    size={24}
                />
            </Input>
        </HStack>
    );
}
