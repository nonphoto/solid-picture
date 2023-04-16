import { resolveTokens } from '@solid-primitives/jsx-tokenizer'
import { ComponentProps, createMemo, For, createContext, useContext, Accessor } from 'solid-js'
import { SourceProps, isSourceToken, sourceTokenizer } from './Source'

const PictureContext = createContext<{ sources: Accessor<SourceProps[]> }>({ sources: () => [] })

export function usePicture() {
  return useContext(PictureContext)
}

export function Picture(props: ComponentProps<'picture'>) {
  const tokens = resolveTokens(sourceTokenizer, () => props.children, {
    includeJSXElements: true,
  })

  const sources = createMemo(() =>
    tokens()
      .filter(isSourceToken)
      .map(token => token.data.props),
  )

  return (
    <picture {...props}>
      <PictureContext.Provider value={{ sources }}>
        <For each={tokens()}>{token => (isSourceToken(token) ? token() : token)}</For>
      </PictureContext.Provider>
    </picture>
  )
}
