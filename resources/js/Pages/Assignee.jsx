import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainContainer from '@/Components/DivContainer/MainContainer';
import { Head } from '@inertiajs/react';

export default function Assignee() {
    return (
        <AuthenticatedLayout
            header="Assignee List"
        >
            <Head title="Assignee" />
            
            <MainContainer>

            </MainContainer>
        </AuthenticatedLayout>
    )
}