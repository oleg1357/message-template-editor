import { Dispatch, FC, SetStateAction } from 'react'

import { EditElementType, IfThenElseBlockType, TextBlockType } from '../../model'
import { IfThenElseBlock } from '../if-then-else-block'
import { TextBlock } from '../text-block'

type EditElementPropsType = {
  block: EditElementType
  onUpdateBlock: (newBlock: EditElementType) => void
  handleVariable: Dispatch<SetStateAction<(val: string) => void>>
  handleIfThenElse: Dispatch<SetStateAction<() => void>>
  onSeparateBlocks: (updatedBlock: EditElementType, addedBlock: EditElementType) => void
  handleDeleteBlock: () => void
}
export const EditElement: FC<EditElementPropsType> = ({
  block,
  onUpdateBlock,
  handleVariable,
  handleIfThenElse,
  onSeparateBlocks,
  handleDeleteBlock,
}) => {
  switch (block.type) {
    case 'text':
      return (
        <TextBlock
          handleIfThenElse={handleIfThenElse}
          handleVariable={handleVariable}
          value={block.value}
          onUpdateBlock={onUpdateBlock as (newBlock: TextBlockType) => void}
          onSeparateBlocks={onSeparateBlocks}
          focus={block.focus}
        />
      )
    case 'if-then-else':
      return (
        <IfThenElseBlock
          ifBranch={block.ifBranch}
          thenBranch={block.thenBranch}
          elseBranch={block.elseBranch}
          onUpdateBlock={onUpdateBlock as (newBlock: IfThenElseBlockType) => void}
          handleVariable={handleVariable}
          handleIfThenElse={handleIfThenElse}
          handleDeleteBlock={handleDeleteBlock}
        />
      )
    default:
      return null
  }
}
