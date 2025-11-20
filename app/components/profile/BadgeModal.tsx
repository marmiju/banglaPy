'use client'

import badge_bg from '@/public/badge_bg.png'
import { Badge } from '@/utils/types/types'
import Modal from '../modal/Modal'

export default function BadgeModal({
  open,
  onClose,
  badges
}: {
  
  open: boolean
  onClose: () => void
  badges: Badge[]
}) {
  return (
    <Modal open={open} onClose={onClose}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[70vh] overflow-y-auto p-4">
        {badges.map(badge => (
          <div
            key={badge.id}
            style={{ backgroundImage: `url(${badge_bg.src})` }}
            className="border-2 border-y-sky-700 border-x-purple-600 rounded-2xl"
          >
            <div className="grid text-center backdrop-blur-[1px] pt-10 pb-10 text-white p-2 rounded-[20px]">
              <h3 className="text-xl text-yellow-400 font-bold truncate">{badge.name}</h3>
              <p>{badge.description}</p>
              <p className="text-gray-400">লেভেলঃ {badge.level}</p>
              <p className="text-gray-400">{badge.category}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
