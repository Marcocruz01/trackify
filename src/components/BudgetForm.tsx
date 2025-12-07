import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";

// Definimos el componente BudgetForm
export default function BudgetForm() {

    const [budget, setBudget] = useState(0);
    const { dispatch } = useBudget();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBudget(e.target.valueAsNumber);
    }

    const isValidBudget = useMemo(() => {
        return isNaN(budget) || budget <= 0;
    }, [budget]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch({ type: 'add_budget', payload: { budget } });
    }

    return (
        <>
            <div className="fixed inset-0 -z-20 overflow-visible pointer-events-none">
                {/* Blob 1 */}
                <div className="
                    absolute 
                    -top-32 -left-32 
                    w-64 h-64 
                    sm:w-80 sm:h-80 
                    bg-blue-600/40 rounded-full 
                    blur-[90px] sm:blur-[120px]
                "></div>

                {/* Blob 2 */}
                <div className="
                    absolute 
                    top-40 -right-28 
                    w-96 h-96 
                    sm:w-[28rem] sm:h-[28rem]
                    bg-blue-700/30 rounded-full 
                    blur-[100px] sm:blur-[140px]
                "></div>

                {/* Blob 3 */}
                <div className="
                    absolute 
                    bottom-0 left-1/4 
                    w-56 h-56
                    sm:w-[26rem] sm:h-[26rem]
                    bg-blue-500/30 rounded-full 
                    blur-[90px] sm:blur-[120px]
                "></div>
            </div>

            <div className="relative w-full md:max-w-md mx-2 p-6 bg-white rounded-xl shadow-lg border border-gray-200 dark:bg-gray-900 dark:border-gray-800">
                <div className="flex flex-col items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-16 text-green-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <h2 className="font-bold text-lg sm:text-xl dark:text-gray-50">No budget yet</h2>
                    <p className="text-gray-500 text-center text-sm sm:text-base max-w-xs sm:max-w-sm dark:text-gray-400">
                        Register your budget to start managing your expenses concisely and effectively
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="mt-5">
                    <div className="flex flex-col gap-1 mb-4">
                        <label htmlFor="budget-input" className="font-semibold dark:text-gray-50">Enter your budget</label>
                        <input
                            type="number"
                            id="budget-input"
                            className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50 text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
                            placeholder="Ej: $2700.00"
                            value={budget === 0 ? '' : budget}
                            onChange={handleChange}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center gap-3 justify-center bg-gray-950 text-white font-medium cursor-pointer py-2 px-4 rounded-xl hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:bg-gray-500 dark:bg-blue-600 dark:hover:bg-blue-500 dark:disabled:bg-blue-300"
                        disabled={isValidBudget}
                    >
                        Add Budget
                    </button>
                </form>
            </div>
        </>
    )
}
