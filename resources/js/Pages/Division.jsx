import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainContainer from '@/Components/DivContainer/MainContainer';
import { Head } from '@inertiajs/react';

export default function Division() {
    return (
        <AuthenticatedLayout
            header="Division List"
        >
            <Head title="Division" />
            
            <MainContainer>

            </MainContainer>
        </AuthenticatedLayout>
    )
}