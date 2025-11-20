'use client'

import { useState } from 'react'
import { useUserContext } from '@/app/components/hooks/provider/ContextApi'
import LoginUi from '@/app/components/authentication/LoginUi'

import ProfileSection from '../components/profile/ProfileSection'
import BadgePreview from '../components/profile/BadgePreview'
import BadgeModal from '../components/profile/BadgeModal'

import ContributionGraph from '../components/profile/ContributionGraph'

export default function ProfilePage() {
  const { user } = useUserContext()
  const [open, setOpen] = useState(false)
  console.log("profile user", user)

  if (!user) return <LoginUi />

  return (
    <div className="max-w-[1280px] grid grid-cols-3 md:grid-cols-12 gap-4 mx-auto p-4 text-white">
      <div className="col-span-3  space-y-6  flex flex-col p-4 rounded-xl bg-slate-900  justify-center md:justify-center items-center">
        {/* Profile Left Side */}
        <ProfileSection user={user} />
        {/* Badge Section */}
        <BadgePreview user={user} openModal={() => setOpen(true)} />
      </div>

      {/* Other Sections */}
      <div className="col-span-3 md:col-span-9">
        <ContributionGraph data={user.activities} />


      </div>

      {/* Badge Modal */}
      <BadgeModal open={open} onClose={() => setOpen(false)} badges={user.badge || []} />
    </div>
  )
}
