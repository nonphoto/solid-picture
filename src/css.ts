import { NullableSize } from '@solid-primitives/resize-observer'
import { Position } from './types'

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

export function styleAspectRatio({ width, height }: NullableSize) {
  return width && height ? `${width} / ${height}` : 'auto'
}

export function stylePosition({ x, y }: Position) {
  return `${x * 100}% ${y * 100}%`
}
