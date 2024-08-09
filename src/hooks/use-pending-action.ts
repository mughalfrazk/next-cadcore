import { useTransition } from "react"

export function usePendingAction<Type extends Function>(action: Type) {
  const [isPending, startTransition] = useTransition()

  const handleAction = (args: any): Type => {
    startTransition(async () => {
      await action(args)
    })
  }

  return { isPending, handleAction }
}