import { useMemo } from "react"
import {
    LeadingActions,
    SwipeableList,
    SwipeableListItem,
    SwipeAction,
    TrailingActions,
  } from "react-swipeable-list"
  import { formatDataEnglish } from "../helpers"
  import { Expense } from "../types"
  import AmountDisplay from "./AmountDisplay"
  import { categories } from "../data/categories"
  import { useBudget } from "../hooks/useBudget"
  import "react-swipeable-list/dist/styles.css"

type ExpenseDetailProps = {
    expense: Expense
}
export default function ExpenseDetail( { expense } : ExpenseDetailProps) {

    const { dispatch } = useBudget()

    const categoryInfo = useMemo(() => categories.filter(cat => cat.id === expense.category)[0], [expense])

    const leadingActions = () => (
        <LeadingActions>
          <SwipeAction onClick={() => console.info('swipe action triggered')}>
            Update
          </SwipeAction>
        </LeadingActions>
      );
      
      const trailingActions = () => (
        <TrailingActions>
          <SwipeAction
            destructive={true}
            onClick={() => dispatch({ type: "remove-expense", payload: { id: expense.id } })}
          >
            Delete
          </SwipeAction>
        </TrailingActions>
      );

  return (
    <SwipeableList>
        <SwipeableListItem
          maxSwipe={ 1 }
          leadingActions={leadingActions()}
          trailingActions={trailingActions()}
        >
   
            <div className="bg-white shadow-lg p-10 w-full border-b border-gray-200 flex gap-5 items-center">
                <div>
                    <img src={ `/icons_${categoryInfo.icon}.svg`}
                        alt="expense icon"
                        className="w-20"
                        />
                    
                </div>

                <div className="flex-1 space-y-2">
                    <p className="text-sm font-bold uppercase text-slate-500">{ categoryInfo.name }</p>
                    <p>{expense.expenseName}</p>
                    <p className="text-slate-600 text-sm">{ formatDataEnglish( expense.date!.toString() ) }</p>
                </div>

                <AmountDisplay 
                    amount={expense.amount}
                />
            </div>
        </SwipeableListItem>
    </SwipeableList>               
  )
}
