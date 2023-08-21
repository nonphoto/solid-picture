import { MaybeAccessor, access } from '@solid-primitives/utils'
import { NaturalSize } from './types'

export type MapMaybeAccessor<T> = T extends any[]
  ? {
      [K in keyof T]: MaybeAccessor<T[K] | undefined>
    }
  : never

export function maybe<F extends (...args: any[]) => any>(
  fn: F,
  ...args: MapMaybeAccessor<Parameters<F>>
): ReturnType<F> | undefined {
  const values = args.map(access)
  if (!values.some(value => value == null)) {
    return fn(...values)
  }
}

export function isVideoMediaType(type?: string) {
  return type ? /^video\/\w+$/.test(type) : false
}

export function cssMediaRule(media: string, rules: string) {
  return `@media ${media} { ${rules} }`
}

export function cssRule(selector: string, properties: [string, string | undefined][]) {
  const propertiesString = properties
    .filter(([, value]) => value != null)
    .map(([name, value]) => `${name}: ${value}`)
    .join('; ')
  return `${selector} { ${propertiesString} }`
}

export function stylePx<T extends { toString: () => string }>(value: T) {
  return value.toString() + 'px'
}

export function styleUrl<T extends { toString: () => string }>(value: T) {
  return `url(${value.toString()})`
}

export function styleAspectRatio({ naturalWidth, naturalHeight }: Partial<NaturalSize>) {
  return naturalWidth && naturalHeight ? `${naturalWidth} / ${naturalHeight}` : 'auto'
}

export function aspectRatio({ naturalWidth, naturalHeight }: Partial<NaturalSize>) {
  return naturalWidth && naturalHeight ? naturalHeight / naturalWidth : undefined
}

export function sizes(values: [number, string][]) {
  return values
    .sort(([a], [b]) => b - a)
    .map(([key, value]) => `(min-width: ${key}px) ${value}`)
    .concat(['100vw'])
    .join(', ')
}
