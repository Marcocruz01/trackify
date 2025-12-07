import { useReducer, createContext, useMemo } from "react"
import { budgetReducer, initialState, type BudgetActions, type BudgetState } from "../reducer/budget-reducer"

// Definimos el tipo para el contexto del presupuesto
type BudgetContextProps = {
    state: BudgetState;
    dispatch: React.Dispatch<BudgetActions>;
    totalExpenses: number;
    reminingBudget: number;
}

// Definimos las props para el proveedor del contexto
type BudgetProviderProps = {
    children: React.ReactNode;
}

// Creamos el contexto del presupuesto
export const BudgetContext = createContext<BudgetContextProps>(null!);

// Definimos el contexto para el presupuesto
export const BudgetProvider = ({ children }: BudgetProviderProps) => {

    // Usamos el reductor para manejar el estado del presupuesto
    const [state, dispatch] = useReducer(budgetReducer, initialState);

    // Calculamos el total de gastos
    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses]);

    // Calculamos el presupuesto disponible
    const reminingBudget = useMemo(() => state.budget - totalExpenses, [state.budget, totalExpenses]);

    return (
        <BudgetContext.Provider
            value={{
                state, 
                dispatch,
                totalExpenses,
                reminingBudget
            }}
        >
            {children}
        </BudgetContext.Provider>
    )
}