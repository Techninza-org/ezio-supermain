import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import {
  cilLockLocked,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import { useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  useEffect(() => {
    let loggedIn = false;
    if (localStorage.getItem('user')) {
      loggedIn = true;
    }
    if (!loggedIn) {
      navigate('/login')
    }
  }, [])


  const navigate = useNavigate();
  function handleLogout() {
    localStorage.clear();
    navigate('/login')
  }
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar color="primary" textColor="white">Hi</CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem onClick={handleLogout} style={{'cursor': "pointer"}}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
