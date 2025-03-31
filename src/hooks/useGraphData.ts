import { useEffect, useState } from 'react';
import { useReceiptStore } from '~store';
import { Expense, GraphData } from '~types';
import { parseDate } from '~utils/date';
import { constructExpenses, constructGraphData } from '~utils/expense';

export default function useGraphData() {
    const date = new Date();
    const year = date.getFullYear();
    const receipts = useReceiptStore((state) => state.receipts);
    const filteredReceipts = receipts.filter(
        (receipt) => parseDate(receipt.purchaseDate).getFullYear() == year,
    );
    const [graphData, setGraphData] = useState<GraphData[]>([]);

    useEffect(() => {
        const expenses = constructExpenses(filteredReceipts);
        const data = constructGraphData(expenses as Expense[]);
        setGraphData(data);
    }, [receipts]);

    return { graphData };
}
