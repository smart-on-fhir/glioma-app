
import { Link, useParams } from 'react-router-dom';
import { patients }        from '../data'
import PatientListItem     from "./PatientListItem";
import SankeyChart         from './SankeyChart';


export default function PatientView() {
    const { id } = useParams();
    const patient = patients.find(p => p.mrn === id) as Patient | undefined;
    
    if (!patient) {
        return <div>Patient not found</div>;
    }

    return (
        <div>
            <Link to="../"><i className="bi bi-arrow-left-circle me-2"></i>Back to list</Link>
            <PatientListItem patient={patient} />
            <h2 className='text-center'>Real World Evidence for Children like {patient.name}</h2>
            <SankeyChart patient={patient} />
            <div className="table-responsive mt-5">
                <table className="table table-hover w-100 mb-0">
                    <thead>
                        <tr>
                            <td colSpan={2} rowSpan={2} className=''>
                                <h5 className='text-success'>{patient.name} Characteristics</h5>
                            </td>
                            <td colSpan={5} className=''>
                                <h5 className='text-success'>Disease progression evidence.</h5>
                                <small className="text-muted">
                                Probability of progression given patient
                                characteristic.<br />Equation: <code>P(progression | characteristic)</code>. 
                                </small>
                            </td>
                        </tr>
                        <tr>
                            {/* <td className='fw-bold text-success border-start' colSpan={2}>Patient Characteristic</td> */}
                            <td className='fw-bold text-muted bg-light border-start'>Radiographic</td>
                            <td className='fw-bold text-muted bg-light'>Functional</td>
                            <td className='fw-bold text-muted bg-light'>Suspected</td>
                            <td className='fw-bold text-muted bg-light border-end'>Stable</td>
                            <td className='bg-light border-end'></td>
                        </tr>
                    </thead>
                    <tbody>
                        { patient.characteristics.map((c, i) => (
                            <tr key={i}>
                                <td className='text-start fw-semibold border-start' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(1)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(1)').forEach(el => el.classList.remove('col-highlight')) }}>{c.label}</td>
                                <td className='text-start' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(2)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(2)').forEach(el => el.classList.remove('col-highlight')) }}>{c.value}</td>
                                <td className='border-start font-monospace whitespace-pre' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(3)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(3)').forEach(el => el.classList.remove('col-highlight')) }}>{c.progressionEvidence.radiographic}</td>
                                <td className='font-monospace whitespace-pre' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(4)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(4)').forEach(el => el.classList.remove('col-highlight')) }}>{c.progressionEvidence.functional}</td>
                                <td className='font-monospace whitespace-pre' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(5)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(5)').forEach(el => el.classList.remove('col-highlight')) }}>{c.progressionEvidence.suspected}</td>
                                <td className='border-end font-monospace whitespace-pre' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(6)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(6)').forEach(el => el.classList.remove('col-highlight')) }}>{c.progressionEvidence.none}</td>
                                <td className='border-end small'>
                                    { c.link ? <a href={c.link} target="_blank" rel="noopener noreferrer">
                                        <i className="bi bi-bar-chart-fill" />
                                    </a> : null }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
