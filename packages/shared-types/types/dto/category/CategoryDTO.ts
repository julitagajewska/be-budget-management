type CategoryDTO = {
    id: string
    user: string
    categoryType: "ACCOUNT" | "TRANSACTION" | "GOAL"
    name: string
}

export default CategoryDTO