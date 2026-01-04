import { useState, useEffect, useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import MainContainer from '@/Components/DivContainer/MainContainer';
import TableContainer from '@/Components/DivContainer/TableContainer';
import Table from '@/Components/Table/Table';
import TableHeader from '@/Components/Table/TableHeader';
import TableRow from '@/Components/Table/TableRow';
import TableData from '@/Components/Table/TableData';
import PrimaryInput from '@/Components/Form/PrimaryInput';
import SelectInput from '@/Components/Form/SelectInput';
import PrimaryButton from '@/Components/PrimaryButton';
import DivisionContainer from '@/Components/Misc/DivisionContainer';
import { SelectItem } from "@/components/ui/select";
import { Head, useForm, router } from '@inertiajs/react';
import { toast } from 'sonner';

export default function Division({ divisions = [] }) {
    const [editingId, setEditingId] = useState(null);

    // Sorting
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let sort = urlParams.get('sort') || 'asc';
    
    // Clean Sort Value
    if (sort !== 'asc' && sort !== 'desc') {
        sort = 'asc';
    }
    
    const [sortValue, setSortValue] = useState(sort);
    const isInitialMount = useRef(true);

    // Update URL when sort changes
    useEffect(() => {
        const currentUrlParams = new URLSearchParams(window.location.search);
        
        if (isInitialMount.current) {
            isInitialMount.current = false;
            // On initial mount, only update URL if sort parameter is missing
            if (!currentUrlParams.has('sort')) {
                const currentParams = Object.fromEntries(currentUrlParams);
                const searchUrl = {
                    ...currentParams,
                    sort: sortValue,
                };
                router.get(route('division.index'), searchUrl, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true
                });
            }
            return;
        }

        // On subsequent changes, update URL
        const currentParams = Object.fromEntries(currentUrlParams);
        const searchUrl = {
            ...currentParams,
            sort: sortValue,
        };

        router.get(route('division.index'), searchUrl, {
            preserveState: true,
            preserveScroll: true,
            replace: true
        });
    }, [sortValue]);

    // Add/Edit Form
    const {
        data,
        setData,
        post,
        patch,
        processing,
        reset,
        errors,
        clearErrors
    } = useForm({
        division_name: '',
        division_color: '#FF6B6B',
    });

    const handleEdit = (division) => {
        setEditingId(division.id);
        setData({
            division_name: division.division_name,
            division_color: division.division_color,
        });
        clearErrors();
    };

    const handleCancel = () => {
        setEditingId(null);
        reset();
        clearErrors();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (editingId) {
            patch(route('division.update', editingId), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Division updated successfully!');
                    handleCancel();
                },
                onError: (errors) => {
                    const messages = Object.values(errors).flat().join(" ");
                    toast.error(messages || "Something went wrong.");
                },
            });
        } else {
            post(route('division.store'), {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success('Division added successfully!');
                    reset();
                },
                onError: (errors) => {
                    const messages = Object.values(errors).flat().join(" ");
                    toast.error(messages || "Something went wrong.");
                },
            });
        }
    };

    const handleDelete = (divisionId) => {
        if (!confirm("Are you sure you want to delete this division?")) return;

        toast.loading("Deleting division...");

        router.delete(route("division.destroy", divisionId), {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                toast.dismiss();
                toast.success("Division deleted!");
            },
            onError: (errors) => {
                const messages = Object.values(errors).flat().join(" ");
                toast.dismiss();
                toast.error(messages || "Something went wrong.");
            },
        });
    };

    return (
        <AuthenticatedLayout
            header="Division List"
        >
            <Head title="Division" />
            
            <MainContainer>
                <div className="space-y-8">
                    {/* Add/Edit Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                            {editingId ? 'Edit Division' : 'Add Division'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <PrimaryInput
                                    type="text"
                                    label="Division Name"
                                    placeholder="Enter division name"
                                    value={data.division_name}
                                    onChange={(e) => setData('division_name', e.target.value)}
                                    error={errors.division_name}
                                />
                                <div className="space-y-2">
                                    <label className="text-black dark:text-white">
                                        Division Color
                                    </label>
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="color"
                                            value={data.division_color}
                                            onChange={(e) => setData('division_color', e.target.value)}
                                            className="h-10 w-20 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                                        />
                                        <input
                                            type="text"
                                            value={data.division_color}
                                            onChange={(e) => setData('division_color', e.target.value)}
                                            placeholder="#FF6B6B"
                                            className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                        />
                                    </div>
                                    <p className="text-red-600 dark:text-red-500">{errors.division_color}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : (editingId ? 'Update' : 'Add')}
                                </PrimaryButton>
                                {editingId && (
                                    <PrimaryButton
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={processing}
                                        className="bg-gray-500 hover:bg-gray-600"
                                    >
                                        Cancel
                                    </PrimaryButton>
                                )}
                            </div>
                        </form>
                    </div>

                    {/* Division List */}
                    <TableContainer
                        tableIcon="🏢"
                        tableTitle="Divisions"
                        borderColor="border-purple-500"
                        headerContent={
                            <div className="mb-4">
                                <SelectInput
                                    placeholder="Sort Order"
                                    value={sortValue}
                                    onChange={(value) => setSortValue(value)}
                                >
                                    <SelectItem value="asc">Ascending</SelectItem>
                                    <SelectItem value="desc">Descending</SelectItem>
                                </SelectInput>
                            </div>
                        }
                    >
                        <Table
                            thead={
                                <tr>
                                    <TableHeader>Division Name</TableHeader>
                                    <TableHeader>Color</TableHeader>
                                    <TableHeader>Preview</TableHeader>
                                    <TableHeader>Actions</TableHeader>
                                </tr>
                            }
                            tbody={
                                <>
                                    {divisions.length > 0 ? (
                                        divisions.map((division) => (
                                            <TableRow key={division.id}>
                                                <TableData className="text-center">
                                                    {division.division_name}
                                                </TableData>
                                                <TableData className="text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <div
                                                            className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600"
                                                            style={{ backgroundColor: division.division_color }}
                                                        />
                                                        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                                                            {division.division_color}
                                                        </span>
                                                    </div>
                                                </TableData>
                                                <TableData className="text-center">
                                                    <DivisionContainer bgcolor={division.division_color}>
                                                        {division.division_name}
                                                    </DivisionContainer>
                                                </TableData>
                                                <TableData className="text-center">
                                                    <div className="flex justify-center gap-2">
                                                        <button
                                                            onClick={() => handleEdit(division)}
                                                            className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"
                                                            title="Edit"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                                            </svg>
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(division.id)}
                                                            className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                                                            title="Delete"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </TableData>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow colspan={4}>
                                            No divisions found. Add your first division above.
                                        </TableRow>
                                    )}
                                </>
                            }
                        />
                    </TableContainer>
                </div>
            </MainContainer>
        </AuthenticatedLayout>
    )
}
