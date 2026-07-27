import type { TaskSchema } from '@/zod-schemes/task.zod'
import { type Control, Controller } from 'react-hook-form'
import type z from 'zod'

import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'

import { ICON_MAP, ICON_NAMES } from '@/utils/icon-map'

interface Props {
	control: Control<z.infer<typeof TaskSchema>>
}

export function TaskIconChooseField({ control }: Props) {
	return (
		<Controller
			control={control}
			name='icon'
			render={({ field: { onChange, value } }) => (
				<FormItem>
					<FormLabel>Icon</FormLabel>
					<FormControl>
						<div className='flex flex-wrap gap-2'>
							{ICON_NAMES.map(name => {
								const Icon = ICON_MAP[name]
								return (
									<Button
										type='button'
										key={name}
										variant={value === name ? 'default' : 'outline'}
										onClick={() => onChange(name)}
										className='h-10 w-10 p-0'
									>
										<Icon size={18} />
									</Button>
								)
							})}
						</div>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
