// import BoxPlot from "./components/BoxPlot";

// const base = String(import.meta.env.VITE_BASE_URL || '/').replace(/\/+$/, '');

export const patients: Patient[] = [
    {
        // Patient metadata
        // ---------------------------------------------------------------------
        name: "Teresa Anderson",
        gender: "Female",
        dob: "2020-03-15",
        mrn: "C114759",
        description: `This patient is a White, non-Hispanic male born in 2012,
        enrolled in CBTN in 2014, and diagnosed with a low-grade glioma at
        approximately 18 months of age. Pathology was consistent with pilomyxoid
        astrocytoma/low-grade glioma, harboring a KIAA1549-BRAF fusion. The tumor
        involved the suprasellar/hypothalamic - pituitary region with ventricular
        extension and no evidence of metastatic disease. The clinical course
        included three documented progressions. Surgical management consisted of
        one partial resection followed by a later gross total resection. Systemic
        therapy began with carboplatin/vincristine and later included vinblastine
        and trametinib, including enrollment on a clinical trial. Comprehensive
        tumor and germline molecular profiling was performed.`,

        treatmentClass: [
            'ALKYLATING',
            'BRAF',
            'CHEMOTHERAPY',
            'MEK',
            'MULTI_AGENT_CHEMOTHERAPY',
            'RESECTION',
            'TRAMETINIB',
            'VINCA_ALKALOID',
            'VINCRISTINE'
        ],

        characteristics: [
            {
                label: 'Histology',
                value: 'Pilomyxoid astrocytoma',
                progressionEvidence: {
                    radiographic: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>,
                    functional: '%%',
                    suspected: '%%',
                    none: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>
                }
            },
            {
                label: 'Grade and behavior',
                value: 'Grade II benign',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Age at diagnosis',
                value: '2 years',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Tumor location',
                value: 'Hypothalamic, diencephalic',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Tumor mass effect',
                value: 'Hydrocephalus',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Tumor surgery extent',
                value: 'Gross total resection',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Molecular driver',
                value: '7q34-KIAA1549-BRAF Fusion',
                progressionEvidence: {
                    radiographic: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>,
                    functional: '%%',
                    suspected: '%%',
                    none: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>
                }
            }
        ]
    },
    {
        // Patient metadata
        // ---------------------------------------------------------------------
        name: "Malik Johnson",
        gender: "Male",
        dob: "2022-01-05",
        mrn: "C77613",
        description: `
        This patient is a Hispanic or Latino, Black or African American female
        born in 2012, enrolled in CBTN in 2014, and diagnosed with a low-grade
        glioma (pilocytic astrocytoma) at approximately 2.2 years of age. The
        tumor arose in the suprasellar/hypothalamic - pituitary region with
        leptomeningeal and CSF dissemination. She has experienced eight
        documented progressions without histologic transformation. Management
        has included two partial resections and multiple lines of systemic
        therapy, beginning with carboplatin/vincristine and followed by several
        chemotherapy and targeted regimens, including bevacizumab, trametinib,
        temozolomide, and combination therapies. Extensive tumor and germline
        molecular profiling has been performed.`,

        treatmentClass: [
            'ALKYLATING',
            'MEK',
            'MTOR',
            'CHEMOTHERAPY',
            'MULTI_AGENT_CHEMOTHERAPY',
            'RESECTION',
            'TRAMETINIB',
            'VINCA_ALKALOID',
            'VINCRISTINE'
        ],

        characteristics: [
            {
                label: 'Histology',
                value: 'Pilomyxoid astrocytoma',
                progressionEvidence: {
                    radiographic: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>,
                    functional: '%%',
                    suspected: '%%',
                    none: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>
                }
            },
            {
                label: 'Grade and behavior',
                value: 'Grade II benign',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Age at diagnosis',
                value: '2 years',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Tumor location',
                value: 'Hypothalamic, diencephalic',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Tumor mass effect',
                value: 'Hydrocephalus',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Tumor surgery extent',
                value: 'Partial resection',
                progressionEvidence: {
                    radiographic: '%%',
                    functional: '%%',
                    suspected: '%%',
                    none: '%%'
                }
            },
            {
                label: 'Molecular driver',
                value: 'None',
                progressionEvidence: {
                    radiographic: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>,
                    functional: '%%',
                    suspected: '%%',
                    none: <a href="https://www.smartcumulus.org/pcx/views/3" target="_blank" rel="noopener noreferrer">% - dashboard link</a>
                }
            }
        ]
    }
];
