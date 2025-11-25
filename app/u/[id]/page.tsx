'use client'

import React, { Suspense, useState } from 'react'
import { useUserContext } from '@/app/components/hooks/provider/ContextApi'
import LoginUi from '@/app/components/authentication/LoginUi'

import ProfileSection from '../../components/profile/ProfileSection'
import BadgePreview from '../../components/profile/BadgePreview'
import BadgeModal from '../../components/profile/BadgeModal'

import ContributionGraph from '../../components/profile/ContributionGraph'
import Loading from '../../loading'
import { Badge } from '@/utils/types/types'
import ScoreSection from '@/app/components/profile/ScoreSection'
import SubmissionsSection from '@/app/components/profile/SubmissionsSection'
import LearnedSection from '@/app/components/profile/LearnedSection'

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

        <div className="col-span-3 md:col-span-9 space-y-2">
          <div className=' grid grid-cols-1 md:grid-cols-3 gap-2'>
            <div className=' col-span-1 rounded'>
              <ScoreSection userId={id} />
            </div>
            <div className='col-span-2'>
              <LearnedSection userId={id}/>
            </div>

          </div>
          <ContributionGraph userId={id} />
        </div>
        <div className='w-full col-span-3 md:col-span-12'>
          <SubmissionsSection userId={id} />
        </div>

        <BadgeModal open={open} onClose={() => setOpen(false)} badges={badge || []} />
      </div>
    </Suspense>

  )
}
