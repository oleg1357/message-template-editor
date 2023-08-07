import { Dispatch, FC, SetStateAction } from 'react'

import { EditElementsListType } from '../../model'
import { EditElementsList } from '../index'

import s from './styles.module.scss'

export type IfThenElseBlockType = {
  type: 'if-then-else'
  ifBranch: EditElementsListType
  thenBranch: EditElementsListType
  elseBranch: EditElementsListType
}

type IfThenElseBlockPropsType = {
  ifBranch: EditElementsListType
  thenBranch: EditElementsListType
  elseBranch: EditElementsListType
  onUpdateBlock: (newBlock: IfThenElseBlockType) => void
  handleVariable: Dispatch<SetStateAction<(val: string) => void>>
  handleIfThenElse: Dispatch<SetStateAction<() => void>>
  handleDeleteBlock: () => void
}
export const IfThenElseBlock: FC<IfThenElseBlockPropsType> = ({
  ifBranch,
  thenBranch,
  elseBranch,
  onUpdateBlock,
  handleVariable,
  handleIfThenElse,
  handleDeleteBlock,
}) => {
  const handleIfBranchUpdate = (newBlocks: EditElementsListType) => {
    onUpdateBlock({
      type: 'if-then-else',
      ifBranch: newBlocks,
      thenBranch,
      elseBranch,
    })
  }

  const handleThenBranchUpdate = (newBlocks: EditElementsListType) => {
    onUpdateBlock({
      type: 'if-then-else',
      ifBranch,
      thenBranch: newBlocks,
      elseBranch,
    })
  }

  const handleElseBranchUpdate = (newBlocks: EditElementsListType) => {
    onUpdateBlock({
      type: 'if-then-else',
      ifBranch,
      thenBranch,
      elseBranch: newBlocks,
    })
  }

  return (
    <div className={s.wrapper}>
      <div>
        <button onClick={handleDeleteBlock} className={s.delete}>
          &#215;
        </button>
      </div>
      <div className={s.container}>
        <div className={s.condition}>
          <span className={s.if}>If</span>
          <EditElementsList
            blocks={ifBranch}
            setBlocks={handleIfBranchUpdate}
            handleVariable={handleVariable}
            handleIfThenElse={handleIfThenElse}
          />
        </div>
        <div className={s.condition}>
          <span className={s.then}>Then</span>
          <EditElementsList
            blocks={thenBranch}
            setBlocks={handleThenBranchUpdate}
            handleVariable={handleVariable}
            handleIfThenElse={handleIfThenElse}
          />
        </div>
        <div className={s.condition}>
          <span className={s.else}>Else</span>
          <EditElementsList
            blocks={elseBranch}
            setBlocks={handleElseBranchUpdate}
            handleVariable={handleVariable}
            handleIfThenElse={handleIfThenElse}
          />
        </div>
      </div>
    </div>
  )
}
