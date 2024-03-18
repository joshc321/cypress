'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '../components/Layout'
import { LoginForm } from '../components/LoginForm'

export const LoginLayout = () => {
    const router = useRouter();

    return (
        <Layout formLabel='Login'>
            <LoginForm onSuccess={() => router.push('/')} />
        </Layout>
    );
}