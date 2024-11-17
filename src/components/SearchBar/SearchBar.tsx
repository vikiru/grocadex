import * as React from 'react';

import { Searchbar } from 'react-native-paper';

export default function SearchBar({ placeholder }: { placeholder: string }) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <Searchbar
            placeholder={placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
            className="m-2 bg-white shadow-md border-primary border-2"
            style={{ fontFamily: 'Open Sans' }}
        />
    );
}
