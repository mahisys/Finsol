import config from '@payload-config'
import { getPayload } from 'payload'
import { seed } from './index'

const payload = await getPayload({ config })
await seed(payload, { force: process.argv.includes('--force') })
process.exit(0)
