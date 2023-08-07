import { FC, useState } from 'react'

import { createPortal } from 'react-dom'

import { EditElementType } from 'entities/edit-elements-list'
import { Button } from 'shared/ui/button'
import { Toast } from 'shared/ui/toast'

type SaveTemplateProps = {
  template: EditElementType[]
  callbackSave: (template: EditElementType[]) => void
}
export const SaveTemplate: FC<SaveTemplateProps> = ({ template, callbackSave }) => {
  const onSave = () => {
    try {
      callbackSave(template)
      if (timeoutId) clearTimeout(timeoutId) // очищаем таймаут
      setMessage('Template successfully saved')
    } catch {
      setMessage('Something went wrong')
    } finally {
      setTimeoutId(
        setTimeout(() => {
          setMessage('')
        }, 3000)
      )
    }
  }
  const [message, setMessage] = useState('')
  const [timeoutId, setTimeoutId] = useState<ReturnType<typeof setTimeout> | null>(null)

  return (
    <>
      <Button onClick={onSave} disabled={!!message}>
        &#128190; Save
      </Button>
      {!!message && createPortal(<Toast text={message} />, document.body)}
    </>
  )
}
