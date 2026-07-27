import { AuthForm } from '../AuthForm'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { getServerAuth } from '@/utils/supabase/get-server-auth'

import { DashboardPages } from '@/config/dashboard-pages'

export const metadata: Metadata = {
	title: 'Login',
	...NO_INDEX_PAGE
}

export default async function Page() {
	const user = await getServerAuth()

	if (user) {
		redirect(DashboardPages.BASE)
	}

	return <AuthForm />
}
