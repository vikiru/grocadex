import * as React from 'react';

import { StyledComponent } from 'nativewind';
import { Searchbar } from 'react-native-paper';

export default function SearchBar({ placeholder }: { placeholder: string }) {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: string) => setSearchQuery(query);

    return (
        <StyledComponent
            component={Searchbar}
            placeholder={placeholder}
            onChangeText={onChangeSearch}
            value={searchQuery}
            className="m-2 bg-white shadow-md border-primary border-2"
            style={{ fontFamily: 'Open Sans' }}
        />
    );
}
