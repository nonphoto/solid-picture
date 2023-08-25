import type { JSX } from 'solid-js'
import type { MaybeAccessor } from '@solid-primitives/utils'

export type MapMaybeAccessor<T> = T extends any[]
  ? {
      [K in keyof T]: MaybeAccessor<T[K] | undefined>
    }
  : never

export type VideoMode = 'default' | 'hls'

export interface MediaElementProps {
  src?: string
  id?: string
  width?: string | number
  height?: string | number
  class?: string
  classList?: {
    [key: string]: boolean | undefined
  }
  style?: string | JSX.CSSProperties
}
