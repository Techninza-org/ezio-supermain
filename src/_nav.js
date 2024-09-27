import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilDrop,
  cilList,
  cilPencil,
  cilSpeedometer,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    
  },
  {
    component: CNavTitle,
    name: 'Users',
  },
  {
    component: CNavItem,
    name: 'All Users',
    to: '/users',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Vendors',
  },
  {
    component: CNavItem,
    name: 'All Vendors',
    to: '/vendors',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Create Vendor',
    to: '/vendor/create',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'KYC',
    to: '/kyc/all',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Destination',
  },
  {
    component: CNavItem,
    name: 'Add Destination',
    to: '/destination/add',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Destinations',
    to: '/destination/all',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Service Options',
    to: '/service-options',
    icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Blog',
  },
  {
    component: CNavItem,
    name: 'Create Blog',
    to: '/blog',
    icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'All Blogs',
    to: '/blogs',
    icon: <CIcon icon={cilList} customClassName="nav-icon" />,
  },
]

export default _nav
