import * as React from 'react';

import { Searchbar } from 'react-native-paper';

export default function SearchBar({ placeholder }: { placeholder: string }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <Searchbar
            className="m-2 border-2 border-primary bg-white shadow-md"
            onChangeText={onChangeSearch}
            placeholder={placeholder}
            style={{ fontFamily: 'Open Sans' }}
            value={searchQuery}
        />
    );
}
