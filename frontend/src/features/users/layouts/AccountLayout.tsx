'use client';

import { TopBar, DisplayButtonLink, DisplayButton, Divider } from '@/components/Elements';
import { useUser, useLogout } from '@/lib/auth'

export const AccountLayout = () => {
    const user = useUser();
    const logout = useLogout();

    return (
        <div>
            <TopBar 
                primaryText='Cypress'
                variant='secondary'
                secondaryText={user.data ? user.data?.first + ' ' + user.data?.last : undefined}
            />
            <div className='pt-56'>
                <ul className='pt-1'>
                    <DisplayButtonLink primary='Stragglers' variant='secondary' to='/customer/stragglers' />
                    <Divider size='sm' />
                    <DisplayButtonLink primary='New User' variant='secondary' to='/account/create' />
                    <Divider size='sm' />
                    <DisplayButtonLink primary='Users' variant='secondary' to='/users' />
                    <Divider size='xl' />
                    <DisplayButtonLink primary='Profile' variant='secondary' to='/account/profile' />
                    <Divider size='sm' />
                    <DisplayButtonLink primary='Edit Account' variant='secondary' to='/account/edit' />
                    <Divider size='sm' />
                    <DisplayButton textColor='text-error' primary='Logout' variant='secondary' onClick={() => logout.mutate({})} />
                    <Divider size='sm' />
                </ul>
            </div>
        </div>
    )
}