import { USERS } from '../users.data'
import ChatInput from './ChatInput'
import ChatMessage from './ChatMessage'
import { useChat } from './useChat'
import Image from 'next/image'
import { useMemo } from 'react'

export function Chat({ userId }: { userId: string }) {
	const { messages, sendMessage } = useChat({ userId })

	const renderedMessages = useMemo(() => {
		return messages.map(msg => (
			<ChatMessage
				key={msg.id}
				message={msg}
				userId={userId}
			/>
		))
	}, [messages, userId])

	return (
		<div className='flex h-screen flex-col'>
			<Image
				alt='Chat'
				src='/images/chat-image.png'
				width={354}
				height={531}
				className='chat-header-image flex-shrink-0'
			/>

			<div className='flex min-h-0 flex-1 flex-col'>
				<div className='flex items-center gap-2 bg-[#453C9C] px-3.5 py-3'>
					<Image
						alt='chatOwner'
						src={USERS[7].avatarPath || ''}
						width={40}
						height={40}
						className='rounded-full'
					/>
					<div className='leading-snug text-white'>
						<div className='font-medium'>{USERS[6].name}</div>
						<div className='text-xs font-medium opacity-70'>
							Project Manager
						</div>
					</div>
				</div>
				{/* Messages */}
				<div className='flex-1 overflow-y-auto bg-[#3C3495] px-3.5 py-3'>
					<div className='flex flex-col gap-4.5'>{renderedMessages}</div>
				</div>

				<ChatInput sendMessage={sendMessage} />
			</div>
		</div>
	)
}
