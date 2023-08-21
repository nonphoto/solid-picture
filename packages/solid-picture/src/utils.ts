import { access } from '@solid-primitives/utils'
import { createSignal, onMount } from 'solid-js'
import { MapMaybeAccessor } from './types'

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

export function createMounted() {
  const [mounted, setMounted] = createSignal(false)

  onMount(() => {
    setMounted(true)
  })

  return mounted
}
