import AmountDisplay from "./AmountDisplay";

export default function BudgetTracker() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex justify-center">
            <img src="/grafico.jpg" alt="Budget graph" />
        </div>

        <div className="flex flex-col justify-center items-center gap-8">
            <button type="button" className="bg-pink-600 hover:bg-pink-700 text-white font-bold p-2 rounded-lg">
                Reset App
            </button>

            <AmountDisplay 
                label="Budget: "
                amount={1000}
            />
            <AmountDisplay 
                label="Available: "
                amount={500}
            />

            <AmountDisplay 
                label="Spent: "
                amount={300}
            />
        </div>
    </div>
  )
}
