'use client'

import { ProjectChart } from './ProjectChart'
import { ProjectChartHeader } from './ProjectChartHeader'
import { getClientProjectChartData } from '@/services/statistics/chart/project-chart-client.service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

import type { TClientProjectChartDataResponse } from '@/types/statistics.types'

interface Props {
	projectChartData: TClientProjectChartDataResponse
}

export function ProjectStatisticsChart({ projectChartData }: Props) {
	const [selectedRange, setSelectedRange] = useState<ITimeRange>({
		label: 'Yearly',
		value: 'yearly'
	})

	const { data } = useQuery({
		queryKey: ['project-statistics-chart-data', selectedRange.value],
		queryFn: () => getClientProjectChartData(selectedRange.value),
		initialData: projectChartData
	})

	return (
		<div className='bg-card h-full w-[97%] rounded-2xl p-5'>
			<ProjectChartHeader
				onRangeChange={setSelectedRange}
				selectedRange={selectedRange}
			/>
			<ProjectChart data={data || []} />
		</div>
	)
}
