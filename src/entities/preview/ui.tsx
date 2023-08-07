import { FC } from 'react'

import s from './styles.module.scss'

type PreviewProps = {
  text: string
}
export const Preview: FC<PreviewProps> = ({ text }) => {
  return <div className={s.container}>{text}</div>
}
