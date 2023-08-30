import { defineConfig } from 'tsup'
import * as preset from 'tsup-preset-solid'

const presetOptions: preset.PresetOptions = {
  entries: { entry: './src/index.tsx' },
  drop_console: true,
  cjs: false,
}

export default defineConfig(config => {
  const watching = Boolean(config.watch)
  const parsedData = preset.parsePresetOptions(presetOptions, watching)

  if (!watching) {
    preset.writePackageJson(preset.generatePackageExports(parsedData))
  }

  return preset.generateTsupOptions(parsedData)
})
