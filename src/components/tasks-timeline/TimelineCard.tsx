import { Task } from '../ui/task/Task'
import { getTaskCardPercent } from './task-card-percent'
import { memo, useMemo } from 'react'

import type { TTask } from '@/types/task.types'

interface Props {
	task: TTask
}

function TimelineCard({ task }: Props) {
	const percent = useMemo(() => getTaskCardPercent(task), [task])

	return (
		<div
			className='border-primary absolute top-8'
			style={{
				left: `${percent?.startPercent}%`,
				width: `${percent?.widthPercent}%`
			}}
		>
			<Task
				task={task}
				isColor
				isMinimal
			/>
		</div>
	)
}

export default memo(TimelineCard)
