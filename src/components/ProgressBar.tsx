import { buildStyles, CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { useBudget } from '../hooks/useBudget';
import { formatCurrency } from '../helpers';

// Definimos el componente ProgressBar
export default function ProgressBar() {

    // Accedemos al state del contexto de presupuesto
    const { state, totalExpenses, reminingBudget } = useBudget();

    // Funcion para calcular el porcentaje del presupuesto gastado
    const percentajeSpent = +((totalExpenses / state.budget) * 100).toFixed(2);
    return (
        <>
            {/* Contenedor con scroll horizontal en mobile */}
            <div className="max-w-4xl mx-auto overflow-x-auto md:overflow-visible pb-3">
                {/* Contenedor interno (horizontal en mobile, row normal en md) */}
                <div className="flex md:flex-row flex-nowrap items-end gap-4 md:gap-4 px-2 md:px-0">
                    {/* Tarjeta: Available budget */}
                    <div className='w-full md:max-w-none h-min flex flex-col gap-4 rounded-lg shadow-sm p-4 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800'>
                        <p className='text-center md:text-start text-lg text-gray-400 dark:text-gray-300 font-semibold'>Available budget</p>
                        <span className='text-center md:text-start text-5xl font-semibold text-blue-600'>
                            {formatCurrency(reminingBudget)}
                        </span>
                    </div>

                    {/* Tarjeta: Circular Progress */}
                    <div className='w-full md:max-w-none h-auto flex flex-col items-center justify-center rounded-lg shadow-sm p-4 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800'>
                        <div className='w-40 flex flex-col gap-2 items-center justify-center'>
                            <CircularProgressbar
                                value={percentajeSpent}
                                text={`${percentajeSpent}%`}
                                styles={buildStyles({
                                    textColor: '#1E40AF',
                                    textSize: 22,
                                    pathColor: '#1E40AF',
                                    trailColor: '#D1D5DB',
                                })}
                            />
                        </div>
                    </div>

                    {/* Tarjeta: Budget spent */}
                    <div className='w-full md:max-w-none h-auto flex flex-col gap-4 rounded-lg shadow-sm p-4 bg-white border border-gray-200 dark:bg-gray-900 dark:border-gray-800'>
                        <p className='text-center md:text-start text-lg text-gray-400 dark:text-gray-300 font-semibold'>Budget spent</p>
                        <span className='text-center md:text-start text-5xl font-semibold text-red-500'>
                            {formatCurrency(totalExpenses)}
                        </span>
                    </div>

                </div>
            </div>
        </>
    )
}
