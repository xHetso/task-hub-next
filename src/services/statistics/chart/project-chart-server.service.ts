'use server'

import { createClientFromServer } from '@/utils/supabase/server'

export async function getServerProjectChartData(
	rangeType: 'yearly' | 'monthly'
) {
	const client = await createClientFromServer()
	return client
		.from('project_chart_point')
		.select('*')
		.eq('range_type', rangeType)
		.order('period', { ascending: true })
}
