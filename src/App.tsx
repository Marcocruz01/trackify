import { useEffect, useMemo } from "react";
import BudgetForm from "./components/BudgetForm"
import Navbar from "./components/Navbar"
import { useBudget } from "./hooks/useBudget";
import BudgetTracker from "./components/BudgetTracker";
import ExpenseModal from "./components/ExpenseModal";
import ExpenseList from "./components/ExpenseList";

function App() {

  // Accedemos al state del contexto de presupuesto
  const { state } = useBudget();

  // Verificamos si el presupuesto es válido
  const isValidBudget = useMemo(() => state.budget > 0 ,[state.budget]);
  
  // Clase condicional para el manejo del scroll
  const scrollClass = isValidBudget ? "overflow-y-auto" : "overflow-hidden";

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString());
    localStorage.setItem('expenses', JSON.stringify(state.expenses));
  }, [state]);

  return (
    // Contenedor principal para toda la aplicación (Navbar + Contenido)
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className={`flex-grow ${scrollClass} mt-16`}>
        {isValidBudget ? (
          <>
            {/* Si hay presupuesto, mostramos el Tracker con scroll */}
            <header className="max-w-7xl mx-auto px-4 lg:px-4 mt-5 md:mt-12 border-b border-gray-200 pb-5 dark:border-gray-900">
              <BudgetTracker/>
              <ExpenseModal/>
            </header>
            <main className="max-w-7xl mx-auto pb-5">
              <ExpenseList/>
            </main>
          </>
        ) : ( 
          // Si no hay presupuesto, centramos el Form sin scroll
          <div className="w-full flex justify-center items-center min-h-[calc(100vh-70px)] relative">
            <BudgetForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default App
