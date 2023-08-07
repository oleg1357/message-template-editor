import { FC, useEffect, useState } from 'react'

import s from './styles.module.scss'

type ToastProps = {
  text: string
}
export const Toast: FC<ToastProps> = ({ text }) => {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
    }, 3000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return visible ? <div className={s.message}>{text}</div> : null
}
