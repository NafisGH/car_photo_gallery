import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 
const NotificationProvider = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
}
 
export default NotificationProvider;