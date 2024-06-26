import React, { Suspense, useEffect } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import CreateVendor from './views/pages/services/CreateVendor'
import UserTrips from './views/pages/Trips/UserTrips'
import AddDestination from './views/pages/destination/AddDestination'
import AllDestinations from './views/pages/destination/AllDestinations'
import KycDetails from './views/pages/kyc/kycDetails'
import ServiceOption from './views/pages/destination/ServiceOption'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
// const Register = React.lazy(() => import('./views/pages/register/Register'))
// const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
// const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AllUsers = React.lazy(() => import('./views/pages/services/AllUsers'))
const AllVendors = React.lazy(() => import('./views/pages/services/AllVendors'))
const HostServices = React.lazy(() => import('./views/pages/services/HostServices'))
const Trips = React.lazy(() => import('./views/pages/Trips/Trips'))
const TripDetails = React.lazy(() => import('./views/pages/Trips/TripDetails'))

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }
    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          {/* <Route exact path="/register" name="Register Page" element={<Register />} /> */}
          {/* <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} /> */}
          <Route exact path="/users" name="users" element={<AllUsers />} />
          <Route exact path="/vendors" name="vendors" element={<AllVendors />} />
          <Route exact path="/vendor/create" name="vendors" element={<CreateVendor />} />
          <Route exact path="/vendor/services/:id" name="services" element={<HostServices />} />
          <Route exact path="/vendor/trips/:id" name="trips" element={<Trips />} />
          <Route exact path="/user/trips/:id" name="trips" element={<UserTrips />} />
          <Route exact path="/trip/:id" name="trips" element={<TripDetails />} />
          <Route exact path="/destination/add" name="destination" element={<AddDestination />} />
          <Route exact path="/destination/all" name="destination" element={<AllDestinations />} />
          <Route exact path="/kyc/:id" name="kyc" element={<KycDetails />} />
          <Route exact path="/service-options" name="service-options" element={<ServiceOption />} />

          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </HashRouter>
  )
}

export default App
