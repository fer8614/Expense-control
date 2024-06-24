import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"
export default function ExpenseList() {

    const { state } = useBudget()

    const isEmpty = useMemo(() => state.expenses.length === 0 , [state.expenses]) 
  return (
    <div className="mt-10"> 
        { isEmpty ? <p className="text-2xl text-gray-600 font-bold">No expenses yet</p> : (
            <>
                <p className="text-2xl text-gray-600 font-bold my-5">List of expenses</p>
                { state.expenses.map(expense => (
                    <ExpenseDetail 
                        key={expense.id} 
                        expense={expense} />
                )) }
            </>
        ) }
    </div>
  )
}
