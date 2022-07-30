
import Login from './modules/routes/login'
import Forgot from './modules/routes/forgot';
import Reset from './modules/routes/reset';
import AddUser from './modules/routes/addUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Account from './modules/routes/account';
import Home from './modules/routes/home';
import withRoot from './modules/withRoot';
import EditAccount from './modules/routes/editAccount';
import Logs from './modules/routes/logs';
import UserCustomers from './modules/routes/userCustomers';
import ServiceRecord from './modules/routes/serviceRecord';
import Customer from './modules/routes/customer';
import EditCustomer from './modules/routes/editCustomer';
import CreateCustomer from './modules/routes/createCustomer';
import NewService from './modules/routes/newService';
import Scan from './modules/routes/scan';
import NotFound from './modules/routes/notFound'
import Calendar from './modules/routes/calendar';
import ScheduleService from './modules/routes/scheduleService';

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
        <Route path="/logs" element={<Logs />} />
        <Route path="/logs/:slug" element={<ServiceRecord />} />
        <Route path="/user-customers" element={<UserCustomers />} />
        <Route path="/customer/:slug" element={<Customer />} />
        <Route path="/edit-customer/:slug" element={<EditCustomer />} />
        <Route path="/create-customer" element={<CreateCustomer />} />
        <Route path="/new-service/:slug" element={<NewService />} />
        <Route path="/scan" element={<Scan />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/scheduleservice" element={<ScheduleService />} />
        <Route path="/test" element={<Test />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default withRoot(App);
