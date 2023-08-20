import { resolveTokens } from '@solid-primitives/jsx-tokenizer'
import {
  ComponentProps,
  createMemo,
  createContext,
  useContext,
  Accessor,
  createEffect,
  untrack,
  createSignal,
} from 'solid-js'
import { SourceProps, isSourceToken, sourceTokenizer } from './Source'
import { createMediaQuery } from '@solid-primitives/media'

const PictureContext = createContext<{
  sources: Accessor<SourceProps[]>
  currentSource: Accessor<SourceProps | undefined>
}>({
  sources: () => [],
  currentSource: () => undefined,
})

export function usePicture() {
  return useContext(PictureContext)
}

export function Picture(props: ComponentProps<'picture'>) {
  const [sources, setSources] = createSignal<SourceProps[]>([])
  const [currentSource, setCurrentSource] = createSignal<SourceProps | undefined>()

  return (
    <PictureContext.Provider value={{ sources, currentSource }}>
      {untrack(() => {
        const tokens = resolveTokens(sourceTokenizer, () => props.children, {
          includeJSXElements: true,
        })

        const sources = createMemo(() =>
          tokens()
            .filter(isSourceToken)
            .map(source => source.data.props),
        )

        const queries = createMemo(() =>
          sources().map<[SourceProps, Accessor<boolean>]>(props => [
            props,
            props.media ? createMediaQuery(props.media!) : () => true,
          ]),
        )

        // TODO: ensure chosen image is actually the one chosen automatically by the browser. These may be different depending on type and media props as well as source order

        // TODO: support loading and decoding props

        createEffect(() => {
          setSources(sources())
        })

        createEffect(() => {
          setCurrentSource(queries().find(([, match]) => match())?.[0])
        })

        return <picture {...props}>{tokens()}</picture>
      })}
    </PictureContext.Provider>
  )
}
