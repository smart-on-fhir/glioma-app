
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PatientList                      from './PatientList';
import SiteHeader                       from './SiteHeader';
import PatientView                      from './PatientView';
import SiteFooter                       from './SiteFooter';
import SankeyChart                      from './SankeyChart';


export default function App() {
    return (
        <BrowserRouter basename={ import.meta.env.VITE_BASE_URL || '/' }>
            <div className='container'>
                <SiteHeader />
                <hr />
                <Routes>
                    <Route path="/"      element={<PatientList />} />
                    <Route path="/chart" element={<SankeyChart />} />
                    <Route path="/:id"   element={<PatientView />} />
                </Routes>
                <SiteFooter />
            </div>
        </BrowserRouter>
    )
}
