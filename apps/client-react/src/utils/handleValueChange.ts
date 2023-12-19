// const handleValueChange = (
//   setter: React.Dispatch<React.SetStateAction<any>>,
//   event?: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//   value?: any
// ) => {
//   let input = null
//   if (event) input = event.target.value

//   if (value) input = value

//   setter(input)
// }

// export default handleValueChange

const handleValueChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setter: React.Dispatch<React.SetStateAction<any>>
) => {
  const input = event.target.value
  setter(input)
}

export default handleValueChange
