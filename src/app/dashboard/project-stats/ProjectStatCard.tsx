import cn from 'clsx'
import Image from 'next/image'

import { formatMinutes } from '@/utils/format-minutes'

import type { TGetProjectStatsResponse } from '@/types/statistics.types'

interface Props {
	projectStat: TGetProjectStatsResponse[0]
	isLast: boolean
}

export function ProjectStatCard({ projectStat, isLast }: Props) {
	return (
		<div
			className={cn(
				projectStat.bg_color,
				'relative overflow-hidden rounded-2xl p-5'
			)}
		>
			<div className='relative z-10 flex items-center justify-between'>
				<div className='flex flex-col'>
					<span className='mb-1 text-4xl font-semibold'>
						{isLast ? formatMinutes(projectStat.number) : projectStat.number}
					</span>
					<span className='text-sm'>{projectStat.label}</span>
				</div>

				<div className='ml-4 flex-shrink-0'>
					<Image
						src={projectStat.icon || ''}
						alt={projectStat.label}
						width={80}
						height={80}
					/>
				</div>
			</div>
		</div>
	)
}
