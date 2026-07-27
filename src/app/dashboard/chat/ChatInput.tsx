import { Paperclip } from 'lucide-react'
import { memo, useState } from 'react'

import { AnimateIcon } from '@/components/animate-ui/icons/icon'
import { Send } from '@/components/animate-ui/icons/send'

interface Props {
	sendMessage: (text: string) => Promise<void>
}

function ChatInput({ sendMessage }: Props) {
	const [text, setText] = useState('')

	return (
		<div className='flex items-center gap-2 bg-[#5B51B1] px-3.5 py-3'>
			<button className='shrink-0 text-white' aria-label='Attach file'>
				<Paperclip />
			</button>
			<input
				type='text'
				value={text}
				onChange={e => setText(e.target.value)}
				placeholder='Type here...'
				aria-label='Type your message'
				className='w-full bg-transparent p-2 text-white placeholder:text-[#B2AEDF] focus:outline-none'
			/>
			<AnimateIcon animateOnHover>
				<button
					className='flex size-9 shrink-0 items-center justify-center rounded-full bg-[#9383d8] text-white opacity-90 transition-colors hover:opacity-100'
					onClick={() => sendMessage(text).then(() => setText(''))}
					aria-label='Send message'
				>
					<Send size={18} />
				</button>
			</AnimateIcon>
		</div>
	)
}

export default memo(ChatInput)
