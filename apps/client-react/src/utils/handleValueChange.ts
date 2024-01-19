const handleValueChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  setter: React.Dispatch<React.SetStateAction<any>>
) => {
  const input = event.target.value
  setter(input)
}

export default handleValueChange
