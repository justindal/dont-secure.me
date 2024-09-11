'use client'

import React, { createContext, useState, useContext } from 'react'

const FollowContext = createContext<{
  followStatus: Record<string, boolean>
  setFollowStatus: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}>({
  followStatus: {},
  setFollowStatus: () => {},
})

export const FollowProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [followStatus, setFollowStatus] = useState<Record<string, boolean>>({})

  return (
    <FollowContext.Provider value={{ followStatus, setFollowStatus }}>
      {children}
    </FollowContext.Provider>
  )
}

export const useFollowStatus = () => useContext(FollowContext)
