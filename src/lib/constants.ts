import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

import { join } from 'path'

export const rootDir = join(__dirname, '..', '..')
export const srcDir = join(rootDir, 'src')
