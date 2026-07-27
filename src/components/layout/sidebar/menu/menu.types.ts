import type { LucideIcon } from 'lucide-react'
import type { FC } from 'react'

import type { IconProps } from '@/components/animate-ui/icons/icon'

export interface IMenuItem {
	icon: FC<IconProps<'default'>> | LucideIcon
	label: string
	href: string
}
