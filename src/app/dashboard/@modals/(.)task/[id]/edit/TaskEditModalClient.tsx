'use client'

import { TaskDateField } from './TaskDateField'
import { TaskIconChooseField } from './TaskIconChooseField'
import { useModalClose } from './useModalClose'
import { useTaskQueries } from './useTaskQueries'
import { TaskSchema } from '@/zod-schemes/task.zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import type z from 'zod'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

interface Props {
	id: string
}

export const TaskEditModalClient = ({ id }: Props) => {
	const { closeModal } = useModalClose()

	const form = useForm<z.infer<typeof TaskSchema>>({
		resolver: zodResolver(TaskSchema),
		defaultValues: {
			title: '',
			due_date: undefined,
			icon: undefined
		}
	})

	const { isPending, mutate } = useTaskQueries({
		id,
		reset: form.reset,
		closeModal
	})

	const onSubmit: SubmitHandler<z.infer<typeof TaskSchema>> = data => {
		mutate({
			title: data.title,
			due_date: data.due_date.toISOString(),
			icon: data.icon
		})
	}

	return (
		<div
			className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
			onClick={closeModal}
		>
			<div
				className='mx-4 max-h-[90vh] w-full max-w-sm overflow-y-auto rounded-lg bg-white p-6 dark:bg-neutral-800'
				onClick={e => e.stopPropagation()}
			>
				<div>
					<h2 className='mb-4 text-xl font-bold'>Edit Task {id}</h2>

					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className='space-y-8'
						>
							<FormField
								control={form.control}
								name='title'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Title</FormLabel>
										<FormControl>
											<Input
												placeholder='Enter title: '
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<TaskDateField control={form.control} />

							<TaskIconChooseField control={form.control} />

							<Button
								type='submit'
								disabled={isPending}
							>
								{isPending ? 'Updating...' : 'Save'}
							</Button>
						</form>
					</Form>
				</div>
			</div>
		</div>
	)
}
