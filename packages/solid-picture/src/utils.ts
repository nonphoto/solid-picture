import { access } from '@solid-primitives/utils'
import { createResource, createSignal, onMount } from 'solid-js'
import { MapMaybeAccessor } from './types'
import { createHydratableSingletonRoot } from '@solid-primitives/rootless'

export function maybe<F extends (...args: any[]) => any>(
  fn: F,
  ...args: MapMaybeAccessor<Parameters<F>>
): ReturnType<F> | undefined {
  const values = args.map(access)
  if (!values.some(value => value == null)) {
    return fn(...values)
  }
}

export function createMounted() {
  const [mounted, setMounted] = createSignal(false)

  onMount(() => {
    setMounted(true)
  })

  return mounted
}

export const useHlsResource = createHydratableSingletonRoot(() => {
  const mounted = createMounted()
  const [resource] = createResource(mounted, () => import('hls.js'))
  return resource
})
