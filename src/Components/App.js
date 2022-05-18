import { BrowserRouter, Routes, Route} from 'react-router-dom';

import Navbar from './Navbar';
import SelectMovie from './SelectMovie';
import SelectSession from './SelectSession';
import SelectSpot from './SelectSpot';
import Success from './Success';


export default function App () {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<SelectMovie />}/>
                <Route path="/sessoes/:movieId" element={<SelectSession />} />
                <Route path="/assentos/:idSessao" element={<SelectSpot />} />
                <Route path="/sucesso" element={<Success />} />
            </Routes>
        </BrowserRouter>
    )
}