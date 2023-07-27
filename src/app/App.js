import { BrowserRouter } from "react-router-dom";
import AppRouter from "./providers/AppRouter";
import 'app/styles/index.scss';
// import Rating from "components/Rating/Rating";
// import Accordion from "components/Accordion/Accordion";


function App() {
  return (
    <BrowserRouter>
        <AppRouter/>
    </BrowserRouter>
    
  );
}

export default App;
