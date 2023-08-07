import { FC } from 'react'

import { Button } from 'shared/ui/button/ui'

type OpenPreviewProps = {
  setShowModal: (showModal: boolean) => void
}

export const OpenPreview: FC<OpenPreviewProps> = ({ setShowModal }) => {
  return (
    <>
      <Button onClick={() => setShowModal(true)}>&#128187; Preview</Button>
    </>
  )
}
