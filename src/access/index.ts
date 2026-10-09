import type { Access, FieldAccess, PayloadRequest } from 'payload'

/**
 * Roles
 * - admin:   full access to everything (website, CRM, users, settings)
 * - editor:  manages website content only (pages, blog, loans, media, settings)
 * - manager: manages the whole CRM (all leads, activities, documents) + read website
 * - agent:   works only on the leads assigned to them
 */
export type Role = 'admin' | 'editor' | 'manager' | 'agent'

type MaybeUser = PayloadRequest['user']

export const hasRole = (user: MaybeUser, ...roles: Role[]): boolean => {
  if (!user || !('roles' in user) || !Array.isArray(user.roles)) return false
  return user.roles.some((r) => roles.includes(r as Role))
}

export const anyone: Access = () => true
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

export const isAdmin: Access = ({ req: { user } }) => hasRole(user, 'admin')
export const isAdminFieldLevel: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

/** Website content editors */
export const canEditContent: Access = ({ req: { user } }) => hasRole(user, 'admin', 'editor')

/** Published documents for the public, everything for content editors */
export const publishedOrEditor: Access = ({ req: { user } }) => {
  if (hasRole(user, 'admin', 'editor')) return true
  return { _status: { equals: 'published' } }
}

/** Any CRM staff member */
export const isCrmStaff = (user: MaybeUser) => hasRole(user, 'admin', 'manager', 'agent')
export const isCrmManager = (user: MaybeUser) => hasRole(user, 'admin', 'manager')

export const crmStaff: Access = ({ req: { user } }) => isCrmStaff(user)
export const crmManager: Access = ({ req: { user } }) => isCrmManager(user)
export const crmManagerFieldLevel: FieldAccess = ({ req: { user } }) => isCrmManager(user)

/** Managers see all leads; agents see only leads assigned to them */
export const leadAccess: Access = ({ req: { user } }) => {
  if (isCrmManager(user)) return true
  if (hasRole(user, 'agent') && user) return { assignedTo: { equals: user.id } }
  return false
}

/** For records attached to a lead (activities, documents) */
export const leadChildAccess: Access = ({ req: { user } }) => {
  if (isCrmManager(user)) return true
  if (hasRole(user, 'agent') && user) return { 'lead.assignedTo': { equals: user.id } }
  return false
}
