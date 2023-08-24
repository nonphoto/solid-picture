import {
  createToken,
  createTokenizer,
  isToken,
  TokenElement,
} from '@solid-primitives/jsx-tokenizer'
import { Size } from '@solid-primitives/utils'
import { splitProps } from 'solid-js'
import { VideoMode } from './types'

export type SourceProps = {
  srcset?: string
  media?: string
  placeholderSrc?: string
  videoSrc?: string
  videoMode?: VideoMode
  naturalSize?: Size
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
  const [, elementProps] = splitProps(props, ['videoSrc', 'placeholderSrc', 'naturalSize'])
  return <source {...elementProps} />
}

export const Source = createToken(
  sourceTokenizer,
  (props: SourceProps) => {
    return { props }
  },
  SourceElement,
)
