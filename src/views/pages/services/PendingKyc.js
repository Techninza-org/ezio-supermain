import axios from 'axios'
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table'
import CIcon from '@coreui/icons-react'
import { cilPaperPlane, cilTrash } from '@coreui/icons'
import { AppSidebar, AppHeader } from '../../../components/index'

const PendingKyc = () => {
  const [kycs, setKycs] = useState([])
  const token = localStorage.getItem('token')
  async function getKycs() {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}superAdmin/kyc/all`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const k = res.data.kycList
    const unverified = k.filter((item) => item.host.verified === false)
    console.log(res.data, 'data')
    console.log(k, 'k')
    setKycs(unverified)
  }

  useEffect(() => {
    getKycs()
  }, [])

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'host.username',
        size: 150,
      },
      {
        header: 'Submitted At',
        // accessorKey: 'created_at',
        accessorFn: (dataRow) => new Date(dataRow.created_at).toLocaleString(),
        size: 60,
      },
      {
        header: 'Details',
        accessorFn: (dataRow) => (
          <Link to={`/kyc/vendor/${dataRow.host_id}`}>
            <CIcon icon={cilPaperPlane} />
          </Link>
        ),
      },
    ],
    [],
  )

  const table = useMantineReactTable({
    columns,
    data: kycs,
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
            <h1 className="text-center mb-4">KYCs</h1>
            <MantineReactTable table={table} />
          </div>
        </div>
      </div>
    </>
  )
}
export default PendingKyc
