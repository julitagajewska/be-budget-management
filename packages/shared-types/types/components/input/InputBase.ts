type InputBase = {
    value: string | number | undefined
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default InputBase