import { FC } from 'react'

import s from './styles.module.scss'
import { VariableButton } from './variable-button'

type VariablesProps = {
  arrVarNames: string[]
  clickVariable: (val: string) => void
}
export const Variables: FC<VariablesProps> = ({ arrVarNames, clickVariable }) => {
  return (
    <div className={s.container}>
      {arrVarNames.map((varName, i) => (
        <VariableButton key={i} onClick={() => clickVariable(`{${varName}}`)} name={varName} />
      ))}
    </div>
  )
}
