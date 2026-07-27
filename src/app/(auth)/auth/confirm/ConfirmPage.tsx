'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useRef } from 'react'

import { createClient } from '@/utils/supabase/client'

import { DashboardPages } from '@/config/dashboard-pages'
import { PublicPages } from '@/config/public-pages'

export function ConfirmPage() {
	const params = useSearchParams()
	const router = useRouter()
	const handled = useRef(false)

	useEffect(() => {
		if (handled.current) return
		handled.current = true

		const verifyToken = async () => {
			const errorDescription = params.get('error_description')

			if (errorDescription) {
				return router.replace(PublicPages.LOGIN)
			}

			const supabase = createClient()
			const code = params.get('code')

			if (code) {
				const { error } = await supabase.auth.exchangeCodeForSession(code)
				if (error) return router.replace(PublicPages.LOGIN)
				return router.replace(DashboardPages.BASE)
			}

			const token_hash = params.get('token_hash')
			const type = params.get('type') ?? 'email'

			if (token_hash) {
				const { error } = await supabase.auth.verifyOtp({
					type: type as 'email',
					token_hash
				})
				if (error) return router.replace(PublicPages.LOGIN)
				return router.replace(DashboardPages.BASE)
			}

			router.replace(PublicPages.LOGIN)
		}

		verifyToken()
	}, [params, router])

	return <p>Verifying your email... Please wait.</p>
}
