import type { JSX } from 'solid-js'
import type { MaybeAccessor } from '@solid-primitives/utils'

export interface Size {
  width: number
  height: number
}

export interface Position {
  x: number
  y: number
}

export type MapMaybeAccessor<T> = T extends any[]
  ? {
      [K in keyof T]: MaybeAccessor<T[K] | undefined>
    }
  : never

export type VideoMode = 'default' | 'hls'

export type ImageLoading = 'eager' | 'lazy'

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
