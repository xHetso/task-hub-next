import { cn } from '@/utils'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import type { TTaskStatus } from '@/types/task.types'

const statuses: Array<TTaskStatus | 'all'> = [
	'all',
	'not-started',
	'in-progress',
	'completed'
]

interface Props {
	status: TTaskStatus | undefined
	setStatus: (status: TTaskStatus | undefined) => void
}

export const LastTasksFilter = ({ setStatus, status }: Props) => {
	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant='outline'
						className='capitalize'
					>
						{status?.replace('-', ' ') || 'All'}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align='end'>
					{statuses.map(s => (
						<DropdownMenuItem
							key={s}
							onClick={() => setStatus(s === 'all' ? undefined : s)}
							className={cn(
								status === s ? 'font-bold' : '',
								'cursor-pointer capitalize'
							)}
						>
							{s.replace('-', ' ')}
						</DropdownMenuItem>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}
