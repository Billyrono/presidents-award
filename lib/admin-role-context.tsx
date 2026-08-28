'use client'

import { createContext, useContext } from 'react'

// 'admin' is a hidden developer/maintainer role — full access, not shown in club role dropdowns
export type AdminRole = 'chair' | 'vice_chair' | 'pr' | 'admin'

export const AdminRoleContext = createContext<AdminRole | null>(null)

export function useAdminRole() {
    return useContext(AdminRoleContext)
}
