import { ScrollView, Text, View } from 'react-native';
import { Card, DataTable } from 'react-native-paper';

import { StyledComponent } from 'nativewind';

const testData = [
    {
        name: 'Apples',
        quantity: 4,
        price: '2.99',
        expiry: 'Expiring in 5 days',
        image: 'https://via.placeholder.com/150?text=Apples',
    },
    {
        name: 'Bananas',
        quantity: 6,
        price: '1.29',
        expiry: 'Expiring in 10 days',
        image: 'https://via.placeholder.com/150?text=Bananas',
    },
    {
        name: 'Milk',
        quantity: 1,
        price: '3.49',
        expiry: 'Expiring in 3 days',
        image: 'https://via.placeholder.com/150?text=Milk',
    },
    {
        name: 'Bread',
        quantity: 2,
        price: '2.49',
        expiry: 'Expiring in 7 days',
        image: 'https://via.placeholder.com/150?text=Bread',
    },
    {
        name: 'Cheese',
        quantity: 1,
        price: '4.99',
        expiry: 'Expiring in 15 days',
        image: 'https://via.placeholder.com/150?text=Cheese',
    },
];

export default function Dashboard() {
    return (
        <StyledComponent component={View} className="bg-background min-h-full min-w-full flex">
            <StyledComponent component={View} className="bg-background">
                <StyledComponent component={Text} className="text-white text-center bg-accent p-2 text-lg">
                    Expiring Groceries
                </StyledComponent>
                <StyledComponent
                    component={ScrollView}
                    className="flex flex-row space-x-2 m-2 pb-2"
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    {testData.map((item, index) => (
                        <StyledComponent
                            component={Card}
                            key={index}
                            className="m-2 w-50 p-2 rounded-full shadow-md border-2 border-accent"
                        >
                            <StyledComponent
                                component={Card.Title}
                                title={item.name}
                                subtitle={item.expiry}
                                className="font-heading"
                            />
                            <StyledComponent component={Card.Content} className="flex flex-row space-x-2">
                                <StyledComponent component={Text} className="text-text text-sm">
                                    Quantity: {item.quantity} | Price: ${item.price}
                                </StyledComponent>
                            </StyledComponent>
                        </StyledComponent>
                    ))}
                </StyledComponent>

                <StyledComponent component={Text} className="text-white text-center bg-accent p-2 text-lg">
                    Current Monthly Expenses
                </StyledComponent>

                <StyledComponent
                    component={Text}
                    className="font-body text-center mt-4 pb-4 p-2 text-lg w-1/2 mx-auto text-white  bg-accent rounded-full"
                >
                    $ 400.00
                </StyledComponent>

                <StyledComponent component={ScrollView}>
                    <StyledComponent component={DataTable} className="">
                        <DataTable.Header>
                            <DataTable.Title>Date</DataTable.Title>
                            <DataTable.Title numeric>Cost ($)</DataTable.Title>
                        </DataTable.Header>
                        <DataTable.Row>
                            <DataTable.Cell>08/15/2025</DataTable.Cell>
                            <DataTable.Cell numeric>100.50</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>08/15/2025</DataTable.Cell>
                            <DataTable.Cell numeric>100.50</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>08/15/2025</DataTable.Cell>
                            <DataTable.Cell numeric>100.50</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>08/15/2025</DataTable.Cell>
                            <DataTable.Cell numeric>100.50</DataTable.Cell>
                        </DataTable.Row>
                        <DataTable.Row>
                            <DataTable.Cell>08/15/2025</DataTable.Cell>
                            <DataTable.Cell numeric>100.50</DataTable.Cell>
                        </DataTable.Row>
                    </StyledComponent>
                </StyledComponent>
            </StyledComponent>
        </StyledComponent>
    );
}
