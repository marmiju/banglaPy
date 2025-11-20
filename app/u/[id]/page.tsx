'use client'

import { Suspense, useState } from 'react'
import { useUserContext } from '@/app/components/hooks/provider/ContextApi'
import LoginUi from '@/app/components/authentication/LoginUi'

import ProfileSection from '../../components/profile/ProfileSection'
import BadgePreview from '../../components/profile/BadgePreview'
import BadgeModal from '../../components/profile/BadgeModal'

import ContributionGraph from '../../components/profile/ContributionGraph'
import Loading from '../../loading'
import { Badge } from '@/utils/types/types'

export default function ProfilePage({ params }: { params: { id: string } }) {

  const { user, loading } = useUserContext()

  const { id } = params
  const isOwner = user?.id === id


  const [open, setOpen] = useState(false)
  const [badge, setBadge] = useState<Badge[] | null>(null)


  if (loading) return <Loading />
  if (!user) return <LoginUi />

  return (
    <Suspense fallback={<Loading />}>
      <div className="max-w-[1280px] grid grid-cols-3 md:grid-cols-12 gap-4 mx-auto p-4 text-white">

        <div className="col-span-3 space-y-6 flex flex-col p-4 rounded-xl bg-slate-900 items-center">
          <ProfileSection id={id} isOwner={isOwner} />
          <BadgePreview userId={id} openModal={() => setOpen(true)} badge={badge || []} setBadge={setBadge}
          />
        </div>

        <div className="col-span-3 md:col-span-9">
          <div className="col-span-3 md:col-span-9">
            <ContributionGraph userId={id} />
          </div>

        </div>

        <BadgeModal open={open} onClose={() => setOpen(false)} badges={badge || []} />
      </div>
    </Suspense>

  )
}
