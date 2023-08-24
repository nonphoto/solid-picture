import {
  createToken,
  createTokenizer,
  isToken,
  TokenElement,
} from '@solid-primitives/jsx-tokenizer'
import { Size } from '@solid-primitives/utils'

export type SourceProps = {
  srcset?: string
  media?: string
  placeholderSrc?: string
  videoSrc?: string
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
  return <source {...props} />
}

export const Source = createToken(
  sourceTokenizer,
  (props: SourceProps) => {
    return { props }
  },
  SourceElement,
)
