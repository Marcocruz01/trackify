import { v4 as uuidv4 } from "uuid";
import type { Category, DraftExpense, Expense } from "../types";

// Acciones permitidas para el reductor de presupuesto
export type BudgetActions = 
    | { type: 'add_budget'; payload: { budget: number } }
    | { type: 'show_expense_modal' }
    | { type: 'hide_expense_modal' }
    | { type: 'add_expense'; payload: { expense: DraftExpense } }
    | { type: 'remove_expense', payload: { id: Expense['id'] } }
    | { type: 'edit_expense', payload: { id: Expense['id'] } }
    | { type: 'update_expense', payload: { expense: Expense } }
    | { type: 'filter_category', payload: { id: Expense['id'] } }
    | { type: 'edit_budget' }
    | { type: 'update_budget', payload: { budget: number } }
    | { type: 'cancel_edit_budget' }
    | { type: 'reset_app' }

// Estado inicial del presupuesto
export type BudgetState = {
    budget: number;
    expenseModal: boolean;
    expenses: Expense[];
    editingExpense: Expense['id'];
    currentCategory: Category['id'];
    editingBudget: boolean;
}

// Función para obtener el presupuesto inicial desde el localStorage
const initialBudget = () : number => {
    const localStorageBudget = localStorage.getItem('budget');
    return localStorageBudget ? Number(localStorageBudget) : 0;
}

// Agregar al localStorage los gastos
const localStorageExpenses = () : Expense[] => {
    const localStorageExpenses = localStorage.getItem('expenses');
    return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
}

// Función reductora para manejar las acciones del presupuesto
export const initialState : BudgetState = {
    budget: initialBudget(),
    expenseModal: false,
    expenses: localStorageExpenses(),
    editingExpense: '',
    currentCategory: '',
    editingBudget: false,

}

// Función para crear un nuevo gasto con un ID único
const createExpense = (draftExpense : DraftExpense) : Expense => {
    return {
        ...draftExpense,
        id: uuidv4(),
    }
}

// Reductor que maneja las acciones relacionadas con el presupuesto
export const budgetReducer = (state: BudgetState, action: BudgetActions): BudgetState => {
    switch(action.type) {
        case 'add_budget':
            return {
                ...state,
                budget: action.payload.budget,
            };
        case 'show_expense_modal':
            return {
                ...state,
                expenseModal: true,
            };
        case 'hide_expense_modal':
            return {
                ...state,
                expenseModal: false,
                editingExpense: '',
            };
        case 'add_expense':
            const expense = createExpense(action.payload.expense);
            return {
                ...state,
                expenses: [...state.expenses, expense],
                expenseModal: false,

            };
        case 'remove_expense':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.id !== action.payload.id),
            };
        case "edit_expense": 
            return {
                ...state,
                editingExpense: action.payload.id,
                expenseModal: true,
            };
        case "update_expense":
            return {
                ...state,
                expenses: state.expenses.map(expense => expense.id === action.payload.expense.id ? action.payload.expense : expense),
                editingExpense: '',
                expenseModal: false,
            };
        case "filter_category":
            return {
                ...state,
                currentCategory: action.payload.id,
            }
        case 'edit_budget':
            return {
                ...state,
                editingBudget: true,
            };

        case 'update_budget':
            return {
                ...state,
                budget: action.payload.budget,
                editingBudget: false,
            };
        case 'cancel_edit_budget':
            return {
                ...state,
                editingBudget: false,
            };
        case 'reset_app':
            return {
                ...state,
                budget: 0,
                expenses: [],
            }
        default:
            return state;
    }
}