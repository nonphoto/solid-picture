import { MaybeAccessor } from '@solid-primitives/utils'

export type MapMaybeAccessor<T> = T extends any[]
  ? {
      [K in keyof T]: MaybeAccessor<T[K] | undefined>
    }
  : never

export type VideoMode = 'default' | 'hls'
