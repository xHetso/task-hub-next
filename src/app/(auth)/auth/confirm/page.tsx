import { ConfirmPage } from './ConfirmPage'
import { Suspense } from 'react'

export default async function Page() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ConfirmPage />
		</Suspense>
	)
}
