import { Dashboard } from './Dashboard'
import { getServerProfile } from '@/services/profile/profile-server.service'
import { getServerProjectChartData } from '@/services/statistics/chart/project-chart-server.service'
import { getServerProjectStats } from '@/services/statistics/project-stat-server.service'
import {
	getServerTasks,
	getServerTodayTasks
} from '@/services/tasks/task-server.service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Dashboard'
}

export default async function Page() {
	const [tasks, todayTasks, projectStats, projectChartData] = await Promise.all(
		[
			getServerTasks(),
			getServerTodayTasks(),
			getServerProjectStats(),
			getServerProjectChartData('yearly')
		]
	)

	const data = await getServerProfile()

	return (
		<Dashboard
			tasks={tasks.data || []}
			todayTasks={todayTasks.data || []}
			userId={data.id}
			projectStats={projectStats.data || []}
			projectChartData={projectChartData.data || []}
		/>
	)
}
