import type { getClientProjectChartData } from '@/services/statistics/chart/project-chart-client.service'
import type { getServerProjectChartData } from '@/services/statistics/chart/project-chart-server.service'
import type { getServerProjectStats } from '@/services/statistics/project-stat-server.service'

export type TGetProjectStatsResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectStats>>['data']
>

export type TGetProjectChartDataResponse = NonNullable<
	Awaited<ReturnType<typeof getServerProjectChartData>>['data']
>

export type TClientProjectChartDataResponse = Awaited<
	ReturnType<typeof getClientProjectChartData>
>
