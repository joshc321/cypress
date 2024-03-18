'use client';

import { useRouter } from 'next/navigation';
import { Layout } from '../components/Layout'
import { ResetForm } from '../components/ResetForm'

export const ResetLayout = () => {
    const router = useRouter();

    return (
        <Layout formLabel='Reset Password'>
            <ResetForm onSuccess={() => router.push('/login')} />
        </Layout>
    );
}