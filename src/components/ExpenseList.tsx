import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import "react-swipeable-list/dist/styles.css";
import ExpenseDetail from "./ExpenseDetail";


// Definimos el componente ExpenseList
export default function ExpenseList() {

    // Accedemos al state del contexto de presupuesto
    const { state } = useBudget();

    // Funcion para filtrar los gastos segun la categoria seleccionada
    const filterExpense = state.currentCategory ? state.expenses.filter( expense => expense.category === state.currentCategory) : state.expenses;

    // Verificamos si la lista de gastos está vacía
    const isEmpty = useMemo(() => filterExpense.length === 0, [filterExpense]);

    return (
        <div>
            {isEmpty ? (
                <div className="max-w-xl md:mx-auto mx-4 mt-10 flex flex-col items-center gap-3 rounded-xl border border-gray-200 p-9 bg-white dark:bg-gray-900 dark:border-gray-700">
                    <div className="p-2 rounded-full bg-red-600/10 ">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 text-red-600">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                        </svg>
                    </div>
                    <p className="text-xl text-center text-gray-950 font-bold dark:text-gray-50">No expenses added yet.</p>
                    <p className="text-center text-gray-500 dark:text-gray-300">Start adding your expenses to see them listed here.</p>
                </div>
            ) : (
                <ul className="divide-y divide-gray-200 md:mx-2 dark:divide-gray-900">
                    {filterExpense.map(expense => (
                        <ExpenseDetail key={expense.id} expense={expense} />
                    ))}
                </ul>
            )}
        </div>
    )
}
