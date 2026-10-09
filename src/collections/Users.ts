import { APIError, type CollectionConfig } from 'payload'
import { hasRole, isAdmin, isAdminFieldLevel } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Team member', plural: 'Team members' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'roles', 'phone', 'active'],
    group: 'Settings',
    description:
      'People who can log in to the admin panel. Roles decide what each person can see and edit.',
  },
  auth: {
    tokenExpiration: 60 * 60 * 12,
    maxLoginAttempts: 8,
    lockTime: 15 * 60 * 1000,
  },
  access: {
    // Everyone logged in can see the team list (needed to assign leads)
    read: ({ req: { user } }) => Boolean(user),
    create: isAdmin,
    update: ({ req: { user } }) => {
      if (hasRole(user, 'admin')) return true
      return user ? { id: { equals: user.id } } : false
    },
    delete: isAdmin,
    admin: ({ req: { user } }) => Boolean(user && user.active !== false),
  },
  hooks: {
    beforeLogin: [
      ({ user }) => {
        if (user?.active === false)
          throw new APIError('This account has been deactivated.', 403, null, true)
        return user
      },
    ],
    afterRead: [
      // Login sessions are only visible to the account owner and admins
      ({ doc, req: { user } }) => {
        if (doc && user && user.id !== doc.id && !hasRole(user, 'admin')) delete doc.sessions
        return doc
      },
    ],
    beforeChange: [
      // The very first account created on a fresh install is always an admin
      async ({ req, operation, data }) => {
        if (operation === 'create') {
          const { totalDocs } = await req.payload.count({
            collection: 'users',
            overrideAccess: true,
            req,
          })
          if (totalDocs === 0) data.roles = ['admin']
        }
        return data
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['agent'],
      saveToJWT: true,
      access: { create: isAdminFieldLevel, update: isAdminFieldLevel },
      options: [
        { label: 'Admin (everything)', value: 'admin' },
        { label: 'Website editor', value: 'editor' },
        { label: 'Sales manager (all leads)', value: 'manager' },
        { label: 'Sales agent (own leads)', value: 'agent' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
      saveToJWT: true,
      access: { update: isAdminFieldLevel },
      admin: { position: 'sidebar', description: 'Untick to block this person from logging in.' },
    },
  ],
}
