
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
                                <h5>Disease progression evidence.</h5>
                                <small className="text-muted">
                                Probability of progression given patient
                                characteristic.<br />Equation: <code>P(progression | characteristic)</code>. 
                                </small>
                            </td>
                        </tr>
                        <tr>
                            <td className='fw-bold' colSpan={2}>Patient Characteristic</td>
                            <td className='fw-bold'>Radiographic</td>
                            <td className='fw-bold'>Functional</td>
                            <td className='fw-bold'>Suspected</td>
                            <td className='fw-bold'>None</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='text-start'>Histology</td>
                            <td className='text-start'>Pilomyxoid astrocytoma</td>
                            <td>%% dashboard link</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%% dashboard link</td>
                        </tr>
                        <tr>
                            <td className='text-start'>Grade and behavior</td>
                            <td className='text-start'>Grade II benign</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                        </tr>
                        <tr>
                            <td className='text-start'>Age at diagnosis</td>
                            <td className='text-start'>2  years</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                        </tr>
                        <tr>
                            <td className='text-start'>Tumor location</td>
                            <td className='text-start'>Hypothalamic, diencephalic</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                        </tr>
                        <tr>
                            <td className='text-start'>Tumor mass effect</td>
                            <td className='text-start'>Hydrocephalus</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                        </tr>
                        <tr>
                            <td className='text-start'>Tumor surgery extent</td>
                            <td className='text-start'>Gross total resection</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%%</td>
                        </tr>
                        <tr>
                            <td className='text-start'>Molecular driver</td>
                            <td className='text-start'>7q34-KIAA1549-BRAF Fusion</td>
                            <td>%% dashboard link</td>
                            <td>%%</td>
                            <td>%%</td>
                            <td>%% dashboard link</td>
                        </tr>
                    </tbody>
                </table>
                <SankeyChart />
                {/* <table className="table table-hover w-100 mb-0">
                    <thead>
                        <tr>
                            <td className="text-start text-success" style={{width: "auto"}}><b>{patient.name} Features</b></td>
                            <td style={{width: "20px"}} className="no-hover"></td>
                            <td style={{width: "250px"}}>
                                <span className="text-success">Glioma Surgery<br/><b>required</b></span><br/>
                                <small className="text-muted">(Bowel Resection)</small>
                            </td>
                            <td style={{width: "20px"}} className="no-hover"></td>
                            <td style={{width: "250px"}}>
                                <span className="text-success">Chance of treatment<br/><b>response</b></span><br/>
                                <small className="text-muted">(Never Failed)</small>
                            </td>
                            <td style={{width: "250px"}}>
                                <span className="text-success">Chance of treatment<br/><b>non-response</b></span><br/>
                                <small className="text-muted">(Ever Failed)</small>
                            </td>
                        </tr>
                    </thead>
                    <tbody id="data-table-body">
                        { patient.populationData.map((dataRow, index) => {
                            const { label, surgery, responder, nonResponder } = dataRow;
                            return (
                                <tr key={index}>
                                    <td className="text-start ps-0"><i className="bi bi-caret-right-fill text-success me-1" />{label}</td>
                                    <td className="no-hover" />
                                    <td className="bg-pale-primary">{ surgery }</td>
                                    <td className="no-hover"></td>
                                    <td className="bg-pale-success">{ responder }</td>
                                    <td className="bg-pale-success">{ nonResponder }</td>
                                </tr>
                            );
                        }) }
                    </tbody>
                </table> */}
            </div>
        </div>
    );
}
