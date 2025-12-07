import { formatCurrency } from "../helpers";
import { useBudget } from "../hooks/useBudget";
import FilterByCategory from "./FilterByCategory";
import ProgressBar from "./ProgressBar";

// Definimos el componente BudgetTracker
export default function BudgetTracker() {

    // Accedemos al dispatch del contexto de presupuesto
    const { state, dispatch } = useBudget();

    return (
        <>
            <ProgressBar />
            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-between gap-3 mt-5">
                <div className="flex flex-col gap-2 items-center md:items-start">
                    <h2 className="text-base font-normal text-gray-500 dark:text-gray-300">Estimated budget:</h2>
                    <div className="flex items-center gap-2">
                        {state.editingBudget ? (
                            <input
                                type="number"
                                className="border rounded-lg px-3 py-1 text-base w-32 bg-white text-gray-800 dark:bg-gray-900 dark:text-gray-50"
                                defaultValue={state.budget}
                                autoFocus

                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        dispatch({
                                            type: 'update_budget',
                                            payload: { budget: Number(e.currentTarget.value) }
                                        });
                                    }

                                    if (e.key === 'Escape') {
                                        dispatch({ type: 'cancel_edit_budget' });
                                    }
                                }}

                                onBlur={() => {
                                    dispatch({ type: 'cancel_edit_budget' });
                                }}
                            />
                        ) : (
                            <p className="flex items-end gap-2 text-4xl text-blue-600 font-bold">
                                {formatCurrency(state.budget)}
                            </p>
                        )}
                        <button
                            type="button"
                            onClick={() => dispatch({ type: 'edit_budget' })}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:hover:bg-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                            title="Edit budget"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="w-full md:w-auto flex flex-col-reverse md:flex-row items-center gap-3 justify-center md:justify-end">
                    <FilterByCategory />
                    <button
                        type="button"
                        onClick={() => dispatch({ type: 'show_expense_modal' })}
                        className="w-full md:w-auto flex items-center justify-center gap-3 bg-gray-950 text-gray-50 font-semibold text-sm px-4 py-2.5 rounded-xl hover:bg-gray-800 dark:bg-blue-600 dark:hover:bg-blue-500"
                    >
                        Add Expense
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-5 p-1 bg-white text-gray-950 rounded-full">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
