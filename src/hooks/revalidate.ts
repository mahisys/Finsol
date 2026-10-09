import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidatePath } from 'next/cache'

const revalidateAll = () => {
  try {
    revalidatePath('/', 'layout')
  } catch {
    // Not running inside Next.js (e.g. seed script) – nothing to revalidate
  }
}

/** Website content changed → refresh cached public pages */
export const revalidateSite: CollectionAfterChangeHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateAll()
  return doc
}
export const revalidateSiteDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateAll()
  return doc
}
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  if (!req.context?.disableRevalidate) revalidateAll()
  return doc
}
