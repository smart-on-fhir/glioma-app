
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

            <div className="table-responsive small">
                <table className="table table-bordered table-hover w-100 mb-0">
                    <thead>
                        <tr>
                            <td colSpan={2}></td>
                            <td colSpan={4}>
                                <h5 className='text-success'>Disease progression evidence.</h5>
                                <small className="text-muted">
                                Probability of progression given patient
                                characteristic.<br />Equation: <code>P(progression | characteristic)</code>. 
                                </small>
                            </td>
                        </tr>
                        <tr>
                            <td className='fw-bold text-success' colSpan={2}>Patient Characteristic</td>
                            <td className='fw-bold text-success'>Radiographic</td>
                            <td className='fw-bold text-success'>Functional</td>
                            <td className='fw-bold text-success'>Suspected</td>
                            <td className='fw-bold text-success'>None</td>
                        </tr>
                    </thead>
                    <tbody>
                        { patient.characteristics.map((c, i) => (
                            <tr key={i}>
                                <td className='text-start fw-semibold'>{c.label}</td>
                                <td className='text-start'>{c.value}</td>
                                <td>{c.progressionEvidence.radiographic}</td>
                                <td>{c.progressionEvidence.functional}</td>
                                <td>{c.progressionEvidence.suspected}</td>
                                <td>{c.progressionEvidence.none}</td>
                            </tr>
                        )) }
                    </tbody>
                </table>
                <SankeyChart patient={patient} />
            </div>
        </div>
    );
}
