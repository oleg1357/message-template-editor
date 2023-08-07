import { generateMessage } from './index'

import { EditElementsListType } from 'entities/edit-elements-list'

describe('generateMessage', () => {
  it('should return an empty string when given an empty template and values', () => {
    expect(generateMessage([], {})).toEqual('')
  })

  it('should return a string that contains all text blocks when given a template with only text blocks and values', () => {
    const template: EditElementsListType = [
      { type: 'text', value: 'Hello, ' },
      { type: 'text', value: 'world!' },
    ]
    const values = {}

    expect(generateMessage(template, values)).toEqual('Hello, world!')
  })

  it('should return an empty string when given a template with only add-if-then-else blocks and values', () => {
    const template: EditElementsListType = [
      {
        type: 'if-then-else',
        ifBranch: [{ type: 'text', value: 'Hello, world!' }],
        thenBranch: [],
        elseBranch: [],
      },
    ]
    const values = {}

    expect(generateMessage(template, values)).toEqual('')
  })

  it('should replace variables in text blocks when given a template with text blocks and values containing variables', () => {
    const template: EditElementsListType = [{ type: 'text', value: 'Hello, {name}!' }]
    const values = { name: 'John' }

    expect(generateMessage(template, values)).toEqual('Hello, John!')
  })

  it('should correctly evaluate nested add-if-then-else blocks when given a template with nested add-if-then-else blocks and values containing variables', () => {
    const template: EditElementsListType = [
      {
        type: 'text',
        value: 'Hello, {firstname}! ',
      },
      {
        type: 'if-then-else',
        ifBranch: [
          {
            type: 'text',
            value: '{company}',
            focus: true,
          },
        ],
        thenBranch: [
          {
            type: 'text',
            value: 'I know you work at {company}',
          },
          {
            type: 'if-then-else',
            ifBranch: [
              {
                type: 'text',
                value: '{position}',
              },
            ],
            thenBranch: [
              {
                type: 'text',
                value: ' as {position}',
              },
            ],
            elseBranch: [
              {
                type: 'text',
                value: ' , but what is your role? ',
              },
            ],
          },
          {
            type: 'text',
            value: ':)',
          },
        ],
        elseBranch: [
          {
            type: 'text',
            value: 'Where do you work at the moment?',
          },
        ],
      },
      {
        type: 'text',
        value: '',
      },
    ]
    const values = { firstname: 'John', company: 'Inno Menu', position: 'frontend developer' }

    expect(generateMessage(template, values)).toEqual(
      'Hello, John! I know you work at Inno Menu as frontend developer:)'
    )

    const values2 = { firstname: 'Jane', company: '' }

    expect(generateMessage(template, values2)).toEqual(
      'Hello, Jane! Where do you work at the moment?'
    )

    const values3 = { firstname: 'Jane', company: 'Inno Menu', position: '' }

    expect(generateMessage(template, values3)).toEqual(
      'Hello, Jane! I know you work at Inno Menu , but what is your role? :)'
    )

    const values4 = { name: 'John', firstname: 'Jane', company: 'Inno Menu', position: '' }

    expect(generateMessage(template, values4)).toEqual(
      'Hello, Jane! I know you work at Inno Menu , but what is your role? :)'
    )
  })
})

it('should correctly replace values in text if entered values are the same as variable names', () => {
  const template: EditElementsListType = [
    {
      type: 'text',
      value: 'Hello, {firstname}! ',
    },
    {
      type: 'if-then-else',
      ifBranch: [
        {
          type: 'text',
          value: '{company}',
          focus: true,
        },
      ],
      thenBranch: [
        {
          type: 'text',
          value: 'I know you work at {company}',
        },
        {
          type: 'if-then-else',
          ifBranch: [
            {
              type: 'text',
              value: '{position}',
            },
          ],
          thenBranch: [
            {
              type: 'text',
              value: ' as {position}',
            },
          ],
          elseBranch: [
            {
              type: 'text',
              value: ' , but what is your role? ',
            },
          ],
        },
        {
          type: 'text',
          value: ':)',
        },
      ],
      elseBranch: [
        {
          type: 'text',
          value: 'Where do you work at the moment?',
        },
      ],
    },
    {
      type: 'text',
      value: '',
    },
  ]
  const values = { firstname: 'John', company: 'Inno Menu', position: '{firstname}' }

  expect(generateMessage(template, values)).toEqual(
    'Hello, John! I know you work at Inno Menu as {firstname}:)'
  )

  const values2 = { firstname: '{lastname}', company: '' }

  expect(generateMessage(template, values2)).toEqual(
    'Hello, {lastname}! Where do you work at the moment?'
  )

  const values3 = { firstname: '{lastname}', company: '{firstname}', position: '' }

  expect(generateMessage(template, values3)).toEqual(
    'Hello, {lastname}! I know you work at {firstname} , but what is your role? :)'
  )
})
