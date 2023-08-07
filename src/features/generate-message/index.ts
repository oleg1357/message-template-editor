import { EditElementsListType } from 'entities/edit-elements-list'

type ValuesType = Record<string, string>

export const generateMessage = (template: EditElementsListType, values: ValuesType): string => {
  const message = getMessage(template, values)

  return replaceValues(message, values)
}
export function getMessage(template: EditElementsListType, values: ValuesType): string {
  let message = ''

  for (const block of template) {
    if (block.type === 'text') {
      message += block.value
    } else if (block.type === 'if-then-else') {
      const ifValue = getBlockValue(block.ifBranch, values) //проверяем, исполняется ли блок if
      const branch = ifValue ? block.thenBranch : block.elseBranch

      if (branch) {
        message += getMessage(branch, values)
      }
    }
  }

  return message
}

function getBlockValue(blocks: EditElementsListType | undefined, values: ValuesType): string {
  if (!blocks) {
    return ''
  }

  let value = ''

  for (const block of blocks) {
    if (block.type === 'text') {
      value += block.value
    } else if (block.type === 'if-then-else') {
      const ifValue = getBlockValue(block.ifBranch, values)
      const branch = ifValue ? block.thenBranch : block.elseBranch

      if (branch) {
        value += getMessage(branch, values)
      }
    }
  }

  return getResultIfValue(value, values)
}

function getResultIfValue(value: string, values: ValuesType): string {
  let result = value

  for (const [name, val] of Object.entries(values)) {
    const pattern = new RegExp(`{${name}}`, 'g')

    if (val === '') {
      result = result.replace(pattern, '')
    }
  }

  return result
}

function replaceValues(value: string, values: ValuesType): string {
  return value.replace(/{([^{}]+)}/g, (match, name) => {
    return values[name] === undefined ? match : values[name]
  })
}
