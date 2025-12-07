import { useEffect, useState } from "react";
import type { DraftExpense } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";
import { categories } from "../db/categories";

// Definimos el componente ExpenseForm
export default function ExpenseForm() {

    // Estado local para manejar el formulario de gasto
    const [expense, setExpense] = useState<DraftExpense>({
        expenseName: '',
        amount: 0,
        category: '',
        date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
    });

    // Estado para manejar errores
    const [error, setError] = useState<string>("");

    // Accedemos al state y dispatch del contexto de presupuesto
    const { state, dispatch, reminingBudget } = useBudget();

    // Efecto para manejar la edición de un gasto
    useEffect(() => {
        if(state.editingExpense) {
            // Buscamos el gasto a editar
            const expenseToEdit = state.expenses.filter(prevExpens => prevExpens.id === state.editingExpense)[0];
            setExpense(expenseToEdit);
        }
    }, [state.editingExpense]);

    // Funcon para manejar cambios en los campos del formulario
    const handleChange = (e : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const isAmountField = ['amount'].includes(name);
        setExpense({
            ...expense,
            [name]: isAmountField ? Number(value) : value,
        });
    }

    // Función para manejar el envío del formulario
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
        if(Object.values(expense).includes('') || expense.amount <= 0) {
            setError("Please fill in all fields correctly.");
            return;
        }
        // Validar que antes de agregar el gasto tengamos saldo disponible
        if(expense.amount > reminingBudget) {
            setError("Your budget has reached its limit.");
            return;
        }

        // Si todo está bien, agregamos el gasto o editamos
        if(state.editingExpense) {
            // Editamos el gasto existente
            dispatch({ type: 'update_expense', payload: { expense: { id: state.editingExpense, ...expense }}});
        } else {
            // Agregamos un nuevo gasto
            dispatch({ type: 'add_expense', payload: { expense } });
        }

        // reiniciamos el state
        setExpense({
            expenseName: '',
            amount: 0,
            category: '',
            date: new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000)).toISOString().slice(0, 16),
        });
    }

    return (
        <form className="space-y-5" onSubmit={handleSubmit}>
            <legend className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-4">{state.editingExpense ? "Edit your expense" : "Add new expense"}</legend>
            { error && (
                <ErrorMessage>
                    {error}
                </ErrorMessage>
            )}
            <div className="flex flex-col gap-2">
                {/* Aquí irán los campos del formulario */}
                <label htmlFor="expenseName" className="font-medium text-gray-700 dark:text-gray-200">
                    Expense name
                </label>
                <input
                    type="text"
                    id="expenseName"
                    value={expense.expenseName}
                    onChange={handleChange}
                    placeholder="Ej: netflix subscription"
                    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
                    name="expenseName"
                />
            </div>
            <div className="flex flex-col gap-2">
                {/* Aquí irán los campos del formulario */}
                <label htmlFor="amount" className="font-medium text-gray-700 dark:text-gray-200">
                    Amount
                </label>
                <input
                    type="number"
                    id="amount"
                    value={expense.amount === 0 ? '' : expense.amount}
                    onChange={handleChange}
                    placeholder="Ej: $399.99"
                    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
                    name="amount"
                />
            </div>
            <div className="flex flex-col gap-2">
                {/* Aquí irán los campos del formulario */}
                <label htmlFor="category" className="font-medium text-gray-700 dark:text-gray-200">
                    Category
                </label>
                <select
                    id="category"
                    value={expense.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
                    name="category"
                >
                    <option value="" disabled>Select a category</option>
                    {categories.map(category => (
                        <option 
                            key={category.id} 
                            value={category.name.toLowerCase()}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>
            <input 
                type="submit"
                value={state.editingExpense ? "Save changes" : "Add Expense"}
                className="w-full flex items-center gap-3 justify-center bg-gray-950 text-white font-medium cursor-pointer py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-500 dark:bg-blue-600 dark:hover:bg-blue-500 dark:disabled:bg-blue-300"
            />
        </form>
    )
}
