import React, { useEffect, useMemo, useState } from 'react'
import { AppHeader, AppSidebar } from '../../../components'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import axios from 'axios';
import CIcon from '@coreui/icons-react';
import { cilTrash } from '@coreui/icons';

const BlogsList = () => {
    const [blogs, setBlogs] = useState([]);
    const token = localStorage.getItem('token')
    async function getBlogs() {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}auth/blogs`)
        const k = res.data.blogs;
        setBlogs(k);
    }

    useEffect(() => {
        getBlogs();
    }, [])

    async function handleDelete(id) {
        const res = await axios.delete(`${import.meta.env.VITE_BASE_URL}superAdmin/blog/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        if(res.status === 200){
            getBlogs();
        }else{
            alert('Failed to delete blog');
        }
    }

    const columns = useMemo(
        () => [
            {
                header: 'Id',
                accessorKey: 'id',
                size: 50
            },
            {
                header: 'Title',
                accessorKey: 'title',
            },
            {
                header: 'Delete',
                accessorFn: (dataRow) => <button className='btn btn-danger' onClick={() => handleDelete(dataRow.id)}><CIcon icon={cilTrash} /></button>,
                size: 50
            }

        ],
        [],
    );

    const table = useMantineReactTable({
        columns,
        data: blogs,
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
                        <h1 className='text-center mb-4'>BLOGS</h1>
                        <MantineReactTable table={table} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogsList