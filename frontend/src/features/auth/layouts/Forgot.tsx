'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '../components/Layout'
import { ForgotForm } from '../components/ForgotForm'

export const ForgotLayout = () => {
    const router = useRouter();

    return (
        <Layout formLabel='Forgot Password'>
            <ForgotForm onSuccess={() => router.push('/reset')} />
        </Layout>
    );
}