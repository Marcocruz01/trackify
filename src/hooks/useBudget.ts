import { useContext } from "react";
import { BudgetContext } from "../context/BudgetContext";

// Definimos el hook useBudget
export const useBudget = () => {

    // Accedemos al valor del presupuesto desde el contexto
    const context = useContext(BudgetContext);
    
    // Verificamos que el contexto exista 
    if(!context) {
        throw new Error("useBudget must be used within a BudgetProvider");
    }

    // Retornamos el contexto
    return context;
}