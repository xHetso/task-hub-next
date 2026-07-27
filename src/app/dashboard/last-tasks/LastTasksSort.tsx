import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'

import type { TTaskSortBy } from '@/types/task.types'

const sortTypes: Array<TTaskSortBy> = ['asc', 'desc']

interface Props {
	sort: TTaskSortBy
	setSort: (sort: TTaskSortBy) => void
}

export const LastTasksSort = ({ setSort, sort }: Props) => {
	return (
		<div>
			<Select
				defaultValue={sort}
				onValueChange={(value: TTaskSortBy) => setSort(value)}
			>
				<SelectTrigger className='w-[180px]'>
					<SelectValue placeholder='Sort by due date' />
				</SelectTrigger>
				<SelectContent>
					{sortTypes.map(type => (
						<SelectItem
							key={type}
							value={type}
						>
							{type === 'asc' ? 'Ascending' : 'Descending'}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	)
}
