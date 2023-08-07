import { FC, useEffect, useState } from 'react'

import s from './styles.module.scss'

import { EditElementType } from 'entities/edit-elements-list'
import { Preview } from 'entities/preview/ui'
import { generateMessage } from 'features/generate-message'
import { VarFields } from 'features/var-fields'

type MessagePreviewProps = {
  arrVarNames: string[]
  template: EditElementType[]
}

export const MessagePreview: FC<MessagePreviewProps> = ({ arrVarNames, template }) => {
  type ArrVarNamesType = typeof arrVarNames
  const initObj: Record<ArrVarNamesType[number], string> = arrVarNames.reduce(
    (acc: Record<ArrVarNamesType[number], string>, cur) => {
      acc[cur] = ''

      return acc
    },
    {}
  )

  const [text, setText] = useState('')
  const [varObj, setVarObj] = useState<Record<ArrVarNamesType[number], string>>(initObj)

  useEffect(() => {
    const text = generateMessage(template, varObj)

    setText(text)
  }, [varObj])

  return (
    <div className={s.container}>
      <h2>Message Preview</h2>
      <Preview text={text} />
      <VarFields arrVarNames={arrVarNames} varObj={varObj} setVarObj={setVarObj} />
    </div>
  )
}
