import { seedAuthUsers } from '@/seeder-users'

import { Button } from '@/components/ui/button'

export function Seed() {
	return (
		<div className='p-10'>
			<Button onClick={seedAuthUsers}>Наполнить юзеров</Button>
		</div>
	)
}
