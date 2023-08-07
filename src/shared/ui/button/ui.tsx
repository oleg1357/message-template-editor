import { ButtonHTMLAttributes, DetailedHTMLProps, FC, ReactNode } from 'react'

import s from './styles.module.scss'

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
export const Button: FC<ButtonProps> = ({ ...restProps }) => {
  return <button className={s.button} {...restProps} />
}
