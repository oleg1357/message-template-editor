import { ChangeEvent, FC } from 'react'

import s from './styles.module.scss'

type InputProps = {
  label: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}
export const Input: FC<InputProps> = ({ value, onChange, label }) => {
  return (
    <label className={s.label}>
      {label}
      <input type="text" value={value} onChange={onChange} className={s.input} />
    </label>
  )
}
