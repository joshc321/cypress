import './App.css'

import Login from './modules/routes/login'
import Forgot from './modules/routes/forgot';
import Reset from './modules/routes/reset';
import AddUser from './modules/routes/addUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './modules/routes/account';
import Home from './modules/routes/home';
import withRoot from './modules/withRoot';
import EditAccount from './modules/routes/editAccount';
import ServiceRecord from './modules/routes/serviceRecord';
import Customer from './modules/routes/customer';
import EditCustomer from './modules/routes/editCustomer';
import CreateCustomer from './modules/routes/createCustomer';
import NewService from './modules/routes/newService';
import Scan from './modules/routes/scan';
import NotFound from './modules/routes/notFound'
import Calendar from './modules/routes/calendar';
import ScheduleService from './modules/routes/scheduleService';
import SelectCustomer from './modules/routes/selectCustomer';
import ViewScheduledService from './modules/routes/viewScheduledService';
import Stragglers from './modules/routes/stragglers';
import NeededServices from './modules/routes/neededServices';
import Users from './modules/routes/users';
import User from './modules/routes/user';
import EditScheduled from './modules/routes/editScheduled';
import Logout from './modules/routes/logout';
import Dashboard from './modules/routes/dashboard';
import CreateCompany from './modules/routes/dashboard/creatCompany';
import NotFoundDashboard from './modules/routes/dashboard/notFoundDashboard';
import Process from './modules/routes/dashboard/process';

import Test from './modules/routes/test';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/reset/:slug" element={<Reset />} />
        <Route path="/adduser" element={<AddUser />} />
        <Route path="/account" element={<Account />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/logs/:slug" element={<ServiceRecord />} />
        <Route path="/customer/:slug" element={<Customer />} />
        <Route path="/edit-customer/:slug" element={<EditCustomer />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/new-service/:slug" element={<NewService />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/scheduleservice" element={<ScheduleService />} />
        <Route path="/edit-scheduled/:slug" element={<EditScheduled />} />
        <Route path="/selectcustomer" element={<SelectCustomer />} />
        <Route path="/viewscheduledservice/:slug" element={<ViewScheduledService />} />
        <Route path="/stragglers" element={<Stragglers />} />
        <Route path="/upcoming" element={<NeededServices />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/:slug" element={<User />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<CreateCompany />}/>
          <Route path="process" element={<Process />}/>
          <Route path="*" element={<NotFoundDashboard />} />
        </Route>
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withRoot(App);
