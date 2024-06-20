import { PropsWithChildren } from "react"

export default function ErrorMessage( { children } : PropsWithChildren ) {
  return (
    <p className="bg-red-600 text-white text-center p-2 text-sm font-bold">
        { children }
    </p>
  )
}
