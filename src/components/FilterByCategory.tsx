import type { ChangeEvent } from "react";
import { categories } from "../db/categories";
import { useBudget } from "../hooks/useBudget";

// Definimos el componente FilterByCategory
export default function FilterByCategory() {

    // Accedemos al dispatch del reducer
    const { dispatch } = useBudget();

    // Funcion para filtrar mis gastos
    const handleChange = (e : ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        dispatch({ type: 'filter_category', payload: { id: e.target.value } });
    }

    return (
        <div className="w-full md:w-auto">
            <select
                id="category"
                defaultValue=""
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-base dark:bg-gray-800 dark:border-gray-700 dark:text-gray-50"
                name="category"
            >
                <option value="" disabled>Select an option</option>
                <option value="">All categories</option>
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

    )
}
