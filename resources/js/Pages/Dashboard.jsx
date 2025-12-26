import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainContainer from '@/Components/DivContainer/MainContainer';
import PrimaryCard from '@/Components/DivContainer/PrimaryCard';
import TableContainer from '@/Components/DivContainer/TableContainer';
import Table from '@/Components/Table/Table';
import TableHeader from '@/Components/Table/TableHeader';
import TableRow from '@/Components/Table/TableRow';
import TableData from '@/Components/Table/TableData';
import DivisionContainer from '@/Components/Misc/DivisionContainer';
import { Head } from '@inertiajs/react';

export default function Dashboard({ task_counts = {}, recent_tasks = [], tasks_by_division = [] }) {

    const DivisionCard = ({ division }) => {
        return (
            <div className="mb-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-5">
                <div className="space-y-4">
                    <div>
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Division:</span>
                        <div className="mt-2">
                            <DivisionContainer bgcolor={division.division_color}>
                                {division.division_name}
                            </DivisionContainer>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Not Started:</span>
                            <p className="text-lg font-bold text-gray-600 dark:text-gray-400 mt-1">
                                {division.not_started || 0}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">In Progress:</span>
                            <p className="text-lg font-bold text-orange-600 dark:text-orange-400 mt-1">
                                {division.in_progress || 0}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Completed:</span>
                            <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                                {division.completed || 0}
                            </p>
                        </div>
                        <div>
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-400">Total:</span>
                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                                {division.total_tasks || 0}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <MainContainer>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <PrimaryCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Not Started</p>
                                <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                                    {task_counts.not_started || 0}
                                </p>
                            </div>
                            <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-gray-600 dark:text-gray-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">In Progress</p>
                                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400 mt-2">
                                    {task_counts.in_progress || 0}
                                </p>
                            </div>
                            <div className="p-4 bg-orange-100 dark:bg-orange-900/20 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-orange-600 dark:text-orange-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
                                <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
                                    {task_counts.completed || 0}
                                </p>
                            </div>
                            <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-green-600 dark:text-green-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                </svg>
                            </div>
                        </div>
                    </PrimaryCard>

                    <PrimaryCard>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Tasks</p>
                                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
                                    {task_counts.total || 0}
                                </p>
                            </div>
                            <div className="p-4 bg-blue-100 dark:bg-blue-900/20 rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-blue-600 dark:text-blue-400">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                                </svg>
                            </div>
                        </div>
                    </PrimaryCard>
                </div>

                <div>
                    <TableContainer
                        tableIcon="🚩"
                        tableTitle="Tasks by Division"
                        borderColor="border-purple-500"
                    >
                        {/* Desktop Table View */}
                        <div className="hidden md:block">
                            <Table
                                thead={
                                    <tr>
                                        <TableHeader>Division</TableHeader>
                                        <TableHeader>Not Started</TableHeader>
                                        <TableHeader>In Progress</TableHeader>
                                        <TableHeader>Completed</TableHeader>
                                        <TableHeader>Total</TableHeader>
                                    </tr>
                                }
                                tbody={
                                    <>
                                        {tasks_by_division.length > 0 ? (
                                            tasks_by_division.map(division => (
                                                <TableRow key={division.id}>
                                                    <TableData
                                                        className="text-center"
                                                    >
                                                        <DivisionContainer bgcolor={division.division_color}>
                                                            {division.division_name}
                                                        </DivisionContainer>
                                                    </TableData>
                                                    <TableData
                                                        className="text-center"
                                                    >
                                                        <span className="text-gray-600 dark:text-gray-400 font-semibold">
                                                            {division.not_started || 0}
                                                        </span>
                                                    </TableData>
                                                    <TableData
                                                        className="text-center"
                                                    >
                                                        <span className="text-orange-600 dark:text-orange-400 font-semibold">
                                                            {division.in_progress || 0}
                                                        </span>
                                                    </TableData>
                                                    <TableData
                                                        className="text-center"
                                                    >
                                                        <span className="text-green-600 dark:text-green-400 font-semibold">
                                                            {division.completed || 0}
                                                        </span>
                                                    </TableData>
                                                    <TableData
                                                        className="text-center"
                                                    >
                                                        <span className="text-blue-600 dark:text-blue-400 font-bold">
                                                            {division.total_tasks || 0}
                                                        </span>
                                                    </TableData>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow
                                                colspan={5}
                                            >
                                                No task by division
                                            </TableRow>
                                        )}
                                    </>
                                }
                            />
                        </div>

                        {/* Mobile Card View */}
                        <div className="block md:hidden">
                            {tasks_by_division.length > 0 ? (
                                tasks_by_division.map(division => (
                                    <DivisionCard key={division.id} division={division} />
                                ))
                            ) : (
                                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                    No task by division
                                </div>
                            )}
                        </div>
                    </TableContainer>
                </div>
            </MainContainer>
        </AuthenticatedLayout>
    );
}
