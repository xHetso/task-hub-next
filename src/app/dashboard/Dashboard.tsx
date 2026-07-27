'use client'

import { Chat } from './chat/Chat'
import { LastTasks } from './last-tasks/LastTasks'
import { ProjectStatisticsChart } from './project-chart/ProjectStatisticsChart'
import { ProjectStats } from './project-stats/ProjectStats'
import { cn } from '@/utils'

import { TasksTimeline } from '@/components/tasks-timeline/TasksTimeline'
import { Heading } from '@/components/ui/Heading'
import { SearchField } from '@/components/ui/search-field/SearchField'

import type {
	TGetProjectChartDataResponse,
	TGetProjectStatsResponse
} from '@/types/statistics.types'
import type {
	TGetTasksResponse,
	TGetTodayTasksResponse
} from '@/types/task.types'

interface Props {
	tasks: TGetTasksResponse
	todayTasks: TGetTodayTasksResponse
	userId: string
	projectStats: TGetProjectStatsResponse
	projectChartData: TGetProjectChartDataResponse
}

export function Dashboard({
	tasks,
	todayTasks,
	userId,
	projectChartData,
	projectStats
}: Props) {
	return (
		<div className='grid h-screen grid-cols-[3.5fr_1fr]'>
			<div className='overflow-y-auto p-5'>
				<div className='mb-6 flex items-center justify-between'>
					<Heading>Dashboard</Heading>
					<SearchField
						// TODO: Implement search functionality
						value=''
						onChange={() => {}}
					/>
				</div>

				<div
					className={cn(
						'mb-7 grid gap-6',
						projectChartData.length && !projectStats.length
							? 'grid-cols-[100%]'
							: 'grid-cols-[27%_73%]'
					)}
				>
					<ProjectStats projectStats={projectStats} />
					<ProjectStatisticsChart projectChartData={projectChartData} />
				</div>

				<LastTasks tasks={tasks} />

				<TasksTimeline tasks={todayTasks} />
			</div>

			<Chat userId={userId} />
		</div>
	)
}
