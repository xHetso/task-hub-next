import type { IMenuItem } from '../menu/menu.types'
import { CalendarDays, ChartNoAxesColumn, NotebookText } from 'lucide-react'

import { LayoutDashboard } from '@/components/animate-ui/icons/layout-dashboard'
import { MessageCircleMore } from '@/components/animate-ui/icons/message-circle-more'
import { Settings } from '@/components/animate-ui/icons/settings'
import { UsersRound } from '@/components/animate-ui/icons/users-round'

import { DashboardPages } from '@/config/dashboard-pages'

export const MAIN_MENU: IMenuItem[] = [
	{
		icon: LayoutDashboard,
		label: 'Dashboard',
		href: DashboardPages.DASHBOARD
	},
	{
		icon: MessageCircleMore,
		label: 'Messages',
		href: DashboardPages.MESSAGES
	},
	{
		icon: ChartNoAxesColumn,
		label: 'Insight',
		href: DashboardPages.INSIGHT
	},
	{
		icon: UsersRound,
		label: 'Team',
		href: DashboardPages.TEAM
	},
	{
		icon: CalendarDays,
		label: 'Schedule',
		href: DashboardPages.SCHEDULE
	},
	{
		icon: NotebookText,
		label: 'Report',
		href: DashboardPages.REPORT
	},
	{
		icon: Settings,
		label: 'Settings',
		href: DashboardPages.SETTINGS
	}
]
