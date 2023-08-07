import { ChangeEvent, FC } from 'react'

import { Input } from 'shared/ui/input'

type VarFieldProps = {
  varName: string
  setVarObj: (varObj: Record<string, string>) => void
  varObj: Record<string, string>
}
export const VarField: FC<VarFieldProps> = ({ varName, setVarObj, varObj }) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVarObj({ ...varObj, [varName]: event.target.value })
  }

  return <Input label={varName} value={varObj[varName]} onChange={handleChange} />
}
