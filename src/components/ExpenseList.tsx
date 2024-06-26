import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"
export default function ExpenseList() {

    const { state } = useBudget()

    
    const filteredExpenses = state.currentCategory ? state.expenses.filter(expense => expense.category === state.currentCategory) 
    : state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0 , [ filteredExpenses]) 

  return (
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10"> 
        { isEmpty ? <p className="text-2xl text-gray-600 font-bold text-center uppercase">No expenses yet</p> : (
            <>
                <p className="text-2xl text-gray-600 font-bold my-5">List of expenses</p>
                { filteredExpenses.map(expense => (
                    <ExpenseDetail 
                        key={expense.id} 
                        expense={expense} />
                )) }
            </>
        ) }
    </div>
  )
}
