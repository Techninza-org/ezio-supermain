import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';
import { AppSidebar, AppHeader } from '../../../components/index'

const HostServices = () => {
    const [services, setServices] = useState([]);
    const token = localStorage.getItem('token')
    const { id } = useParams()
    const host_id = id
    async function getServices() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/vendor-services/${host_id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const ser = res.data.services;
        setServices(ser);
    }

    const columns = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                // accessorFn: (dataRow) => <Link to={`/service/${dataRow.id}`} style={{ textDecoration: 'none' }}>{dataRow.name}</Link>,
            },
            {
                header: 'Destination',
                accessorKey: 'destination',
            },
            {
                header: 'Duration (days)',
                accessorKey: 'duration',
            },
            {
                header: 'Price / Night',
                accessorFn: (dataRow) => <span>&#8377;{dataRow.price}</span>,
            }
        ],
        [],
    );

    useEffect(() => {
        getServices();
    }, [])

    const table = useMantineReactTable({
        columns,
        data: services,
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
                        <h1 className='text-center mb-4'>Vendor Services</h1>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>

    )
}
export default HostServices
