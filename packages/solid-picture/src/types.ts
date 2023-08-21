import { MaybeAccessor } from '@solid-primitives/utils'

export interface NaturalSize {
  naturalWidth: number
  naturalHeight: number
}

export type MapMaybeAccessor<T> = T extends any[]
  ? {
      [K in keyof T]: MaybeAccessor<T[K] | undefined>
    }
  : never
