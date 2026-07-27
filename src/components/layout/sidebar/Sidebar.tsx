'use client'

import { SidebarHeading } from './SidebarHeading'
import { SidebarMenu } from './SidebarMenu'
import { SidebarProfile } from './SidebarProfile'
import { SidebarProjects } from './SidebarProjects'
import type { getServerProfile } from '@/services/profile/profile-server.service'
import { useRouter } from 'next/navigation'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { LogOut } from '@/components/animate-ui/icons/log-out'
import { Button } from '@/components/ui/button'

import { createClient } from '@/utils/supabase/client'

import { PublicPages } from '@/config/public-pages'

export const Sidebar = ({
	data
}: {
	data: Awaited<ReturnType<typeof getServerProfile>>
}) => {
	const router = useRouter()

	async function signOut() {
		const { error } = await createClient().auth.signOut()
		if (!error) {
			router.push(PublicPages.LOGIN)
		}
	}

	return (
		<aside className='bg-white p-4 dark:bg-neutral-800'>
			<div className='flex items-center justify-between'>
				<SidebarHeading title='Account' />
				<AnimateIcon animateOnHover>
					<Button
						variant='ghost'
						className='!p-0 opacity-30 transition-opacity hover:opacity-100'
						onClick={signOut}
						aria-label="Sign out"
					>
						<LogOut />
					</Button>
				</AnimateIcon>
			</div>

			<SidebarProfile data={data} />

			<SidebarHeading title='Main Menu' />

			<SidebarMenu />

			<SidebarHeading title='Projects' />

			<SidebarProjects />
		</aside>
	)
}
