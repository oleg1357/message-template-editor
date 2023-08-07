import { Button } from 'shared/ui/button/ui'

type VariableButtonProps = {
  name: string
  onClick: (variableName: string) => void
}

export const VariableButton = ({ name, onClick }: VariableButtonProps) => {
  const variableWithBraces = `{${name}}`

  const handleButtonClick = () => {
    onClick(variableWithBraces)
  }

  return <Button onClick={handleButtonClick}>{variableWithBraces}</Button>
}
