// Definición del tipo de gasto
export type Expense = {
    id: string;
    expenseName: string;
    amount: number;
    category: string;
    date: string;
}

export type DraftExpense = Omit<Expense, 'id'>;

// Definicion del tipo de categoría
export type Category = {
    id: string;
    name: string;
    category: string;
}