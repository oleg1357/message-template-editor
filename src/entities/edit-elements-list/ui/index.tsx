import { Dispatch, FC, SetStateAction } from 'react'

import { EditElementsListType, EditElementType } from '../model'

import { EditElement } from './edit-element'
import s from './styles.module.scss'

type EditElementsListPropsType = {
  blocks: EditElementsListType
  setBlocks: (newBlocks: EditElementsListType) => void
  handleVariable: Dispatch<SetStateAction<(val: string) => void>>
  handleIfThenElse: Dispatch<SetStateAction<() => void>>
}
export const EditElementsList: FC<EditElementsListPropsType> = ({
  blocks,
  setBlocks,
  handleVariable,
  handleIfThenElse,
}) => {
  const handleUpdateBlock = (index: number, newBlock: EditElementType) => {
    const newBlocks: EditElementsListType = [...blocks]

    newBlocks[index] = newBlock

    setBlocks(newBlocks)
  }
  const handleSeparateBlocks = (
    index: number,
    updatedBlock: EditElementType,
    addedBlock: EditElementType
  ) => {
    const newBlocks: EditElementsListType = [...blocks]

    newBlocks.splice(
      index,
      1,
      updatedBlock,
      {
        type: 'if-then-else',
        ifBranch: [{ type: 'text', value: '', focus: true }], // устанавливаем фокус внутрь блока if
        thenBranch: [{ type: 'text', value: '' }],
        elseBranch: [{ type: 'text', value: '' }],
      },
      addedBlock
    )

    setBlocks(newBlocks)
  }

  const handleDeleteBlock = (index: number) => {
    const newBlocks: EditElementsListType = [...blocks]

    const blockBeforeIdx = newBlocks[index - 1]
    const blockAfterIdx = newBlocks[index + 1]

    let textValue = ''

    if (blockBeforeIdx.type !== 'if-then-else' && blockAfterIdx.type !== 'if-then-else') {
      textValue = blockBeforeIdx.value + blockAfterIdx.value
    }

    newBlocks.splice(index - 1, 3, { type: 'text', value: textValue, focus: true })
    setBlocks(newBlocks)
  }

  return (
    <div className={s.container}>
      {blocks.map((block, index) => (
        <EditElement
          key={index + `${blocks.length}`}
          handleDeleteBlock={() => handleDeleteBlock(index)}
          block={block}
          handleVariable={handleVariable}
          handleIfThenElse={handleIfThenElse}
          onUpdateBlock={newBlock => handleUpdateBlock(index, newBlock)}
          onSeparateBlocks={(updatedBlock, addedBlock) =>
            handleSeparateBlocks(index, updatedBlock, addedBlock)
          }
        />
      ))}
    </div>
  )
}
