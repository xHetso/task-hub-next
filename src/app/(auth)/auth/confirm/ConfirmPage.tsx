'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { createClient } from '@/utils/supabase/client'

import { DashboardPages } from '@/config/dashboard-pages'
import { PublicPages } from '@/config/public-pages'

export function ConfirmPage() {
	const params = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		const verifyToken = async () => {
			const token_hash = params.get('token_hash')
			if (!token_hash) {
				return router.replace(PublicPages.LOGIN)
			}

			const { error } = await createClient().auth.verifyOtp({
				type: 'email',
				token_hash
			})

			// TODO: Also create a profile for the user

			if (error) return router.replace(PublicPages.LOGIN)

			router.replace(DashboardPages.BASE)
		}

		verifyToken()
	}, [])

	return <p>Verifying your email... Please wait.</p>
}
