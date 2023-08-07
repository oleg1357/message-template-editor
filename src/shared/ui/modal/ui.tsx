import { FC, ReactNode } from 'react'

import s from './styles.module.scss'

type ModalProps = {
  children: ReactNode
  onClose: () => void
  showModal: boolean
}

export const Modal: FC<ModalProps> = ({ children, onClose, showModal }) => {
  return (
    <div className={`${s.modal} ${s.active}`}>
      <div className={`${s.content} ${s.contentActive}`}>
        <button onClick={onClose} className={s.close}>
          ✖
        </button>
        {children}
      </div>
    </div>
  )
}
