import { FC } from 'react'

import { Button } from 'shared/ui/button'

type ToggleShowEditorProps = {
  showEditor: boolean
  setShowEditor: (showEditor: boolean) => void
}
export const ToggleShowEditor: FC<ToggleShowEditorProps> = ({ showEditor, setShowEditor }) => {
  const toggleShowEditor = () => {
    setShowEditor(!showEditor)
    localStorage.setItem('showEditor', JSON.stringify(!showEditor))
    //синхронизируем состояние с localstorage, чтобы при перезагрузке страницы не переходить на стартовый экран
  }

  const children = showEditor ? '❌ Close' : 'Message Editor'

  return <Button onClick={toggleShowEditor}>{children}</Button>
}
