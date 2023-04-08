import {
  createToken,
  createTokenizer,
  isToken,
  TokenElement,
} from '@solid-primitives/jsx-tokenizer'
import { ComponentProps } from 'solid-js'
import { Sizeable } from './types'

export type SourceProps = ComponentProps<'source'> &
  Partial<Sizeable> & {
    placeholderSrc?: string
  }

export interface SourceToken {
  props: SourceProps
}

export const sourceTokenizer = createTokenizer<SourceToken>({
  name: 'Source Tokenizer',
})

export function isSourceToken(value: any): value is TokenElement<SourceToken> {
  return isToken(sourceTokenizer, value)
}

export function SourceElement(props: SourceProps) {
  return <source {...props} />
}

export const Source = createToken(
  sourceTokenizer,
  props => {
    return { props }
  },
  SourceElement,
)
