'use client'

import { ProgressBar } from '../ProgressBar'
import { cn } from '@/utils'
import { format, isToday } from 'date-fns'
import {
	Image as LucideImage,
	Link as LucideLink,
	MessageSquareMore
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'

import { SubTaskCreateModal } from '@/app/dashboard/last-tasks/create-sub-task/SubTaskCreateModal'

import { Brush } from '@/components/animate-ui/icons/brush'
import { AnimateIcon } from '@/components/animate-ui/icons/icon'

import { ICON_MAP } from '@/utils/icon-map'
import { parseTime } from '@/utils/parse-time'

import type { TTask } from '@/types/task.types'

import { DashboardPages } from '@/config/dashboard-pages'

interface Props {
	task: TTask
	isColor?: boolean
	isMinimal?: boolean
}

export const Task = ({ task, isColor, isMinimal }: Props) => {
	const completedCount = task?.sub_task?.filter(t => t.is_completed).length || 0
	const totalCount = task?.sub_task?.length || 0
	const progress = Math.round((completedCount / totalCount) * 100)
	const Icon = ICON_MAP[task.icon as keyof typeof ICON_MAP]

	const correctDate = new Date(task.due_date)

	const dueDate = useMemo(
		() =>
			isToday(correctDate)
				? 'Today'
				: Math.ceil((+correctDate - Date.now()) / (1000 * 60 * 60 * 24)) +
					' days',
		[task.due_date]
	)

	return (
		<div
			className={cn(
				'bg-card rounded-xl p-3.5',
				isColor && task.color,
				isColor && 'text-foreground'
			)}
		>
			<div
				className={cn(
					'mb-3 flex items-start justify-between',
					isMinimal && 'mb-0 flex-col gap-3'
				)}
			>
				<div className='flex items-start gap-3'>
					<div
						className={cn(
							'bg-primary/10 text-primary flex items-center justify-center rounded-full p-1.5',
							isColor && 'text-primary bg-card'
						)}
					>
						<Icon />
					</div>
					<div className={cn(!isMinimal && 'w-32')}>
						<div className='leading-tight font-medium wrap-normal opacity-90'>
							{task.title}
						</div>
						<div>
							<span
								className={cn('text-sm opacity-50', isColor && 'opacity-75')}
							>
								{isMinimal && task.start_time && task.end_time ? (
									<>
										{format(parseTime(task.due_date, task.start_time), 'ha')} -{' '}
										{format(parseTime(task.due_date, task.end_time), 'ha')}
									</>
								) : (
									<>Due: {dueDate}</>
								)}
							</span>
						</div>
					</div>
				</div>
				<div className='flex items-center -space-x-3'>
					{task.task_participants
						.filter(u => Boolean(u.profile))
						.map(({ profile }) => (
							<div key={profile.id}>
								<Image
									src={profile?.avatar_path || ''}
									alt={`${profile?.name || 'Task participant'} avatar`}
									width={36}
									height={36}
									className='rounded-full border border-white dark:border-neutral-800'
								/>
							</div>
						))}
				</div>
			</div>

			{!isMinimal && (
				<div className='mb-4'>
					<ProgressBar progress={progress} />
				</div>
			)}

			{!isMinimal && (
				<div className='flex items-center justify-between'>
					<div className='flex items-center gap-4'>
						<span className='flex items-center gap-1 text-sm'>
							<MessageSquareMore
								className={isColor ? 'opacity-80' : 'opacity-40'}
								size={16}
							/>{' '}
							{/* {task.comments.length} */}3
						</span>
						<span className='flex items-center gap-1 text-sm'>
							<LucideImage
								className={isColor ? 'opacity-80' : 'opacity-40'}
								size={16}
							/>{' '}
							{/* {task.resources.length} */}6
						</span>
						<span className='flex items-center gap-1 text-sm'>
							<LucideLink
								className={isColor ? 'opacity-80' : 'opacity-40'}
								size={16}
							/>{' '}
							{/* {task.links.length} */}2
						</span>
					</div>

					<div className='flex items-center gap-2'>
						<SubTaskCreateModal taskId={task.id} />
						<AnimateIcon animateOnHover>
							<Link
								href={DashboardPages.TASK_EDIT(task.id)}
								className='border-primary text-primary hover:bg-primary/10 bg-card inline-flex items-center justify-center rounded-full border p-2 transition-colors'
								aria-label={`Edit task: ${task.title}`}
							>
								<Brush size={18} />
							</Link>
						</AnimateIcon>
					</div>
				</div>
			)}
		</div>
	)
}
