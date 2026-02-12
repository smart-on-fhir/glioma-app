
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
            <div className="table-responsive mt-5">
                <table className="table table-hover w-100 mb-0">
                    <thead>
                        <tr>
                            <td colSpan={3} rowSpan={2} className='align-top'>
                                <h5 className='text-success'>Patients matching {patient.firstName}'s glioma characteristics</h5>
                            </td>
                            <td colSpan={3} className=''>
                                <h5 className='text-success mb-0'>Observed outcome rates for patients like {patient.firstName}</h5>
                                <small className="text-muted">
                                {/* Probability of outcome given patient
                                characteristic.<br /> */}
                                Equation: <code>P(outcome | characteristic)</code>
                                </small>
                            </td>
                        </tr>
                        <tr>
                            {/* <td className='fw-bold text-success border-start' colSpan={2}>Patient Characteristic</td> */}
                            <td className='fw-bold text-muted bg-light border-start'>Disease Progression</td>
                            <td className='fw-bold text-muted bg-light'>Symptoms Present</td>
                            <td className='fw-bold text-muted bg-light border-end'>Vision Decline</td>
                        </tr>
                    </thead>
                    <tbody>
                        { patient.characteristics.map((c, i) => (
                            <tr key={i}>
                                <td className='text-start border-start' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(1)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(1)').forEach(el => el.classList.remove('col-highlight')) }}>
                                    {c.label}
                                </td>
                                <td className='text-start' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(2)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(2)').forEach(el => el.classList.remove('col-highlight')) }}>
                                    {c.value}
                                </td>
                                <td className='text-end text-nowrap' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(3)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(3)').forEach(el => el.classList.remove('col-highlight')) }}>
                                    {c.link || null}
                                </td>
                                <td className='border-start font-monospace whitespace-pre' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(4)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(4)').forEach(el => el.classList.remove('col-highlight')) }}>
                                    {
                                        c.progressionEvidence.progression?.link ?
                                            <a href={c.progressionEvidence.progression.link} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>{c.progressionEvidence.progression.value}</a> :
                                            c.progressionEvidence.progression?.value
                                    }
                                </td>
                                <td className='font-monospace whitespace-pre' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(5)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(5)').forEach(el => el.classList.remove('col-highlight')) }}>
                                    {
                                        c.progressionEvidence.symptomsPresent?.link ?
                                            <a href={c.progressionEvidence.symptomsPresent.link} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>{c.progressionEvidence.symptomsPresent.value}</a> :
                                            c.progressionEvidence.symptomsPresent?.value
                                    }
                                </td>
                                <td className='font-monospace whitespace-pre border-end' onMouseEnter={() => { document.querySelectorAll('tr td:nth-child(6)').forEach(el => el.classList.add('col-highlight')) }} onMouseLeave={() => { document.querySelectorAll('tr td:nth-child(6)').forEach(el => el.classList.remove('col-highlight')) }}>
                                    {
                                        c.progressionEvidence.visionDecline?.link ?
                                            <a href={c.progressionEvidence.visionDecline.link} target="_blank" rel="noopener noreferrer" className='text-decoration-none'>{c.progressionEvidence.visionDecline.value}</a> :
                                            c.progressionEvidence.visionDecline?.value
                                    }
                                </td>
                            </tr>
                        )) }
                    </tbody>
                </table>
            </div>
            <br />
            <h2 className='text-center mt-5'>Real World Evidence from Children like {patient.firstName}</h2>
            <SankeyChart patient={patient} />
        </div>
    );
}
