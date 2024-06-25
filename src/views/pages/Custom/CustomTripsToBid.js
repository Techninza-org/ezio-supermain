import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { Link } from 'react-router-dom';
import { cilDescription, cilPencil, cilTransfer } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export default function CustomTripsToBid() {
    const [trips, setTrips] = useState([]);
    useEffect(() => {
        async function getTrips() {
            const token = localStorage.getItem('token')
            const res = await axios.get(`http://103.189.172.172:3000/custom/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const trips = res.data.custom_trips;
            console.log(res.data);
            setTrips(trips);
        }
        getTrips();
    }, [])

    const columns = useMemo(
        () => [
            {
                header: 'Details',
                accessorFn: (dataRow) => <Link to={`/bidding/details/${dataRow.id}`}><CIcon icon={cilDescription} /></Link>,
                size: 50,
            },
            {
                header: 'People',
                accessorKey: 'number_of_people',
                size: 50,
            },
            {
                header: 'Start Date',
                accessorKey: 'start_date',
                size: 100,
            },
            {
                header: 'End Date',
                accessorKey: 'end_date',
                size: 100,
            },
        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: trips,
        enableRowSelection: false,
        enableColumnOrdering: false,
        enableGlobalFilter: true,
    });
    return (
        <div className='mt-3 mx-5'>
            <h1 className='text-center mb-4'>All Trips For Bidding</h1>
            <MantineReactTable table={table} />
        </div>
    )
}