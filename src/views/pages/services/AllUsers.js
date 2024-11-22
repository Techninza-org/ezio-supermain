import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import CIcon from '@coreui/icons-react'
import { cilMoney, cilPaperPlane } from '@coreui/icons'
import { AppSidebar, AppHeader } from '../../../components/index'

const AllUsers = () => {
  const [services, setServices] = useState([])
  const user = JSON.parse(localStorage.getItem('user'))
  const token = localStorage.getItem('token')
  async function getUsers() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const ser = res.data.users
    setServices(ser)
  }

  const columns = useMemo(
    () => [
      {
        header: 'Id',
        accessorKey: 'id',
        size: 50,
        // accessorFn: (dataRow) => <Link to={`/user/${dataRow.id}`} style={{ textDecoration: 'none' }}>{dataRow.username}</Link>,
      },
      {
        header: 'Name',
        accessorKey: 'username',
        size: 150,
        // accessorFn: (dataRow) => <Link to={`/user/${dataRow.id}`} style={{ textDecoration: 'none' }}>{dataRow.username}</Link>,
      },
      {
        header: 'Email',
        accessorKey: 'email',
        size: 'sm',
      },
      {
        header: 'Phone',
        accessorKey: 'phone',
        size: 60,
      },
      {
        header: 'Trips',
        accessorFn: (dataRow) => (
          <Link to={`/user/trips/${dataRow.id}`} className="btn btn-primary">
            <CIcon icon={cilPaperPlane} />
          </Link>
        ),
        size: 50,
      },
      {
        header: 'KYC',
        accessorFn: (dataRow) => (
          <Link to={`/kyc/${dataRow.id}`} className="btn btn-primary">
            <CIcon icon={cilPaperPlane} />
          </Link>
        ),
        size: 50,
      },
      {
        header: 'Transactions',
        accessorFn: (dataRow) => (
          <Link to={`/transactions/${dataRow.id}`} className="btn btn-primary">
            <CIcon icon={cilMoney} />
          </Link>
        ),
        size: 50,
      },
    ],
    [],
  )

  useEffect(() => {
    getUsers()
  }, [])

  const table = useMantineReactTable({
    columns,
    data: services,
    enableRowSelection: false,
    enableColumnOrdering: false,
    enableGlobalFilter: true,
    enableFullScreenToggle: false,
  })

  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <div className="mx-5 mb-5">
            <h1 className="text-center mb-4">Users</h1>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default AllUsers
