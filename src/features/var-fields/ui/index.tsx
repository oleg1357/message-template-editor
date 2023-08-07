import { Dispatch, FC, SetStateAction } from 'react'

import s from './styles.module.scss'
import { VarField } from './var-field'

type VarFieldsProps = {
  arrVarNames: string[]
  varObj: Record<string, string>
  setVarObj: Dispatch<SetStateAction<Record<string, string>>>
}
export const VarFields: FC<VarFieldsProps> = ({ arrVarNames, setVarObj, varObj }) => {
  return (
    <div className={s.container}>
      <p>Variables</p>
      <div className={s.fields}>
        {arrVarNames.map((varName, i) => (
          <VarField varName={varName} key={i} setVarObj={setVarObj} varObj={varObj} />
        ))}
      </div>
    </div>
  )
}
