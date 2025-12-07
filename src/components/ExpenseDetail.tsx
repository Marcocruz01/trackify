import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions } from "react-swipeable-list";
import { useBudget } from "../hooks/useBudget";
import type { Expense } from "../types";
import { formatCurrency, formatDateTime } from "../helpers";

// Definimos el type
type ExpenseDetailProps = {
    expense: Expense;
}

// Definimos el componente ExpenseDetail
export default function ExpenseDetail({ expense } : ExpenseDetailProps) {

    // Funciones para manejar las acciones de deslizamiento
    const { dispatch } = useBudget();

    // Definimos las acciones al deslizar hacia la derecha
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
                onClick={() => dispatch({ type: 'edit_expense', payload: { id: expense.id } })}
            >
                Edit
            </SwipeAction>
        </LeadingActions>
    );

    // Definimos las acciones al deslizar hacia la izquierda
    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
                destructive={true}
                onClick={() => dispatch({ type: 'remove_expense', payload: { id: expense.id } })}
            >
                Delete
            </SwipeAction>
        </TrailingActions>
    );

    return (
        <SwipeableList>
            <SwipeableListItem
                maxSwipe={1.0}
                leadingActions={leadingActions()}
                trailingActions={trailingActions()}
            >
                <div
                    className="flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-900 px-2 py-4 cursor-pointer w-full"
                >
                    <div className="flex itemcenter gap-4">
                        <div className="bg-blue-600/10 text-blue-600 rounded-full p-2 dark:bg-blue-600/20">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>
                        </div>
                        <div>
                            <p className="font-bold text-md text-gray-800 dark:text-gray-50">{expense.expenseName}</p>
                            <p className="text-gray-500 text-sm dark:text-gray-400">{formatDateTime(expense.date)}</p>
                        </div>
                    </div>
                    <p className="font-semibold text-red-500 text-lg">-{formatCurrency(expense.amount)}</p>
                </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
