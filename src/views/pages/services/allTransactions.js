import axios from 'axios';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AppHeader, AppSidebar } from '../../../components';

export default function AllTransactions() {
    const [transacs, setTransacs] = useState([]);

    async function getTransacs() {
        const token = localStorage.getItem('token')
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/transactions/all`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        const tr = res.data.transactions;
        setTransacs(tr);
    }

    useEffect(() => {
        getTransacs()
    }, [])

    const columns = useMemo(
        () => [
            {
                header: 'Order Id',
                accessorKey: 'ezi_order_id',
                size: 50,
            },
            {
                header: 'Amount',
                accessorKey: 'amount',
                size: 50,
            },
            {
                header: 'Type',
                accessorKey: 'type',
                size: 100,
            },
            {
                header: 'Status',
                accessorKey: 'status',
                size: 100,
            },
            {
                header: 'Date',
                accessorFn: (dataRow) => new Date(dataRow.created_at).toLocaleString(),
                size: 100,
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: transacs,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
        enableFullScreenToggle: false
    });

    return (
        <>
            <AppSidebar />
            <div className="wrapper d-flex flex-column min-vh-100">
                <AppHeader />
                <div className="body flex-grow-1">
                    <div className='mx-5 mb-5'>
                        <h1 className='text-center mb-4'>All Transactions</h1>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    )
}
