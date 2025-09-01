
import './App.css';
import {Route, Routes} from 'react-router-dom';
import FolderComponent from './Components/FolderComponent.jsx';



export default function App() {


    return(
    <>
        <Routes>
            <Route path = '/*' element = {<FolderComponent/>}/>
        </Routes>
    </>
    );
}
