type TransactionDTO = {
    _id: string
    user: string
    accountId: string
    categoryId: string
    status: "PENDING" | "FINISHED",
    recipient: string,
    title: string,
    value: number,
    isExpense: boolean
    isRecurring: boolean
    date: string,
    description: string
}

export default TransactionDTO