import { ChangeEvent, useEffect, useState } from "react";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker';
import "react-calendar/dist/Calendar.css";
import "react-date-picker/dist/DatePicker.css";
import type { DraftExpense, Value } from "../types";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {

    const [ expense, setExpense ] = useState<DraftExpense>({
        amount: 0,
        expenseName: '',
        category: '',
        date: new Date()
    })

    const [ error, setError ] = useState('')
    const { dispatch, state } = useBudget()

    useEffect(() => {
        if ( state.editingId ) {
            const editingExpense = state.expenses.filter( currentExpense => currentExpense.id === state.editingId )[0]
            setExpense(editingExpense)
        }
    }, [ state.editingId, state.expenses ])

    const handleChange = ( e : ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> ) => {
        const { name, value } = e.target
        const isAmountField = [ 'amount' ].includes(name)
        setExpense({
            ...expense,
            [name]: isAmountField ? +value : value
        })
    }

    const handleChangeDate = ( value: Value ) => {
        setExpense({ 
            ...expense, 
            date: value 
        })
    }

    const handleSubmit = ( e: ChangeEvent<HTMLFormElement> ) => {
        e.preventDefault()
        //Validation
        if ( Object.values( expense ).includes('') ) {
            setError('All fields are required')
            return
        } 
        //Add or update the expense
        if ( state.editingId ) {
            dispatch({ type: "update-expense", payload: { expense: { id: state.editingId, ...expense } } })
        } else {
            dispatch({ type: "add-expense", payload: { expense } })
        }

        //Reset form
        setExpense({
            amount: 0,
            expenseName: '',
            category: '',
            date: new Date()
        })
    }

  return (
    <form className="space-y-5" onSubmit={ handleSubmit }>
        <legend className="uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            { state.editingId ? 'Update expense' : 'New expense' }
        </legend>

        { error && <ErrorMessage>{ error }</ErrorMessage> }
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="expenseName"
                className="text-xl"
            >
                Expense name:
            </label>
            <input 
                type="text" 
                id="expenseName" 
                placeholder="Add the expense name" 
                className="bg-slate-100 p-2" 
                name="expenseName" 
                onChange={ handleChange }
                value={ expense.expenseName }
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
            >
                Quantity:
            </label>
            <input 
                type="number" 
                id="amount" 
                placeholder="Add the quantity of the expense" 
                className="bg-slate-100 p-2" 
                name="amount" 
                onChange={ handleChange }
                value={ expense.amount === 0 ? '' : expense.amount }
            />
        </div>

        <div className="flex flex-col gap-2">
            <label 
                htmlFor="category"
                className="text-xl"
            >
                Category:
            </label>
            <select 
                id="category" 
                className="bg-slate-100 p-2" 
                name="category" 
                onChange={ handleChange }
                value={ expense.category }
            >
                <option value="">-- Select --</option>
                { categories.map( category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>
        </div>
        
        <div className="flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className="text-xl"
                
            >
                Expenditure date:
            </label>
            <DatePicker 
                className="bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={ handleChangeDate }
            />
        </div>

            <input 
                type="submit" 
                value={ state.editingId ? "Save Changes" : "Record expense"}
                className="bg-blue-600 text-white p-2 rounded-lg cursor-pointer w-full hover:bg-blue-800 uppercase font-bold" 
            />

        
    </form>
  )
}
