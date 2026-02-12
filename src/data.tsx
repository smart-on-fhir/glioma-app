export const patients: Patient[] = [
    {
        // Patient metadata
        // ---------------------------------------------------------------------
        name: "Teresa Anderson",
        firstName: "Teresa",
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
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Grade and behavior',
                value: 'Grade II benign',
                progressionEvidence: {
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Age at diagnosis',
                value: '2 years',
                progressionEvidence: {
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Tumor location',
                value: 'Hypothalamic, diencephalic',
                progressionEvidence: {
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Tumor mass effect',
                value: 'Hydrocephalus',
                progressionEvidence: {
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Tumor surgery extent',
                value: 'Gross total resection',
                progressionEvidence: {
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Molecular driver',
                value: '7q34-KIAA1549-BRAF Fusion',
                progressionEvidence: {
                    progression    : { link: "", value: <span className="opacity-25">-</span> },
                    symptomsPresent: { link: "", value: <span className="opacity-25">-</span> },
                    visionDecline  : { link: "", value: <span className="opacity-25">-</span> },
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            }
        ]
    },
    {
        // Patient metadata
        // ---------------------------------------------------------------------
        name: "Nadine Esperanza",
        firstName: "Nadine",
        gender: "Female",
        dob: "2012-01-05",
        mrn: "C136530",
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
                value: 'Pilocytic astrocytoma',
                link: 'https://www.smartcumulus.org/pcx/views/6',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/24", value: "69%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/26", value: "93%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/25", value: "43%" },

                    // radiographic: (
                    //     <>
                    //         67%<small className="opacity-50 ms-1">(71/106)</small>
                    //     </>
                    // ),
                    // functional: (
                    //     <>
                    //         46%<small className="opacity-50 ms-1">(49/106)</small>
                    //     </>
                    // ),
                    // suspected: (
                    //     <>
                    //         27%<small className="opacity-50 ms-1">(29/106)</small>
                    //     </>
                    // ),
                    // none: (
                    //     <>
                    //         29%<small className="opacity-50 ms-1">(31/106)</small>
                    //     </>
                    // )
                }
            },
            {
                label: 'Glioma Grade',
                value: 'Grade I benign',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/21", value: "68%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/47", value: "89%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/48", value: "40%" },

                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Age at Diagnosis',
                value: '2 years',
                link: 'https://www.smartcumulus.org/pcx/views/8',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/30", value: "62%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/28", value: "84%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/29", value: "49%" },

                    // radiographic: (
                    //     <>
                    //         61%<small className="opacity-50 ms-1">(42/69)&nbsp;</small>
                    //     </>
                    // ),
                    // functional: (
                    //     <>
                    //         42%<small className="opacity-50 ms-1">(29/69)&nbsp;</small>
                    //     </>
                    // ),
                    // suspected: (
                    //     <>
                    //         35%<small className="opacity-50 ms-1">(24/69)&nbsp;</small>
                    //     </>
                    // ),
                    // none: (
                    //     <>
                    //         36%<small className="opacity-50 ms-1">(25/69)&nbsp;</small>
                    //     </>
                    // )
                }
            },
            {
                label: 'Tumor Location',
                value: 'Hypothalamic, diencephalic',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/31", value: "75%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/33", value: "89%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/32", value: "69%" },

                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Tumor Mass Effect',
                value: 'Hydrocephalus',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/34", value: "68%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/36", value: "90%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/35", value: "45%" },
                    
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Tumor Surgery Extent',
                value: 'Partial resection',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/37", value: "77%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/46", value: "77%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/38", value: "50%" },
                    
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            },
            {
                label: 'Molecular Driver',
                value: 'BRAF-KIAA1549 fusion',
                progressionEvidence: {
                    progression    : { link: "https://www.smartcumulus.org/pcx/views/43", value: "73%" },
                    symptomsPresent: { link: "https://www.smartcumulus.org/pcx/views/45", value: "81%" },
                    visionDecline  : { link: "https://www.smartcumulus.org/pcx/views/44", value: "31%" },
                    
                    // radiographic: null,
                    // functional: null,
                    // suspected: null,
                    // none: null
                }
            }
        ]
    }
];

interface ColumnDescriptor {
    /**
     * The display label for the column, used in the UI (dropdowns, headers...)
     */
    label: string;

    /**
     * A brief description of the column, used for tooltips or additional
     * context in the UI.
     */
    description: string;
    
    /**
     * If set to false, this column will be hidden from the column selection
     * dropdowns and won't be available for visualization. This is useful for
     * columns that are needed for internal logic or filtering but shouldn't be
     * directly visualized by users.
     */
    enabled?: boolean;

    /**
     * An optional number that indicates the display order of columns in the UI.
     * Columns with lower order values will be displayed after those with higher
     * values. If not specified, the order value defaults to 0, so use positive
     * numbers to move up and negative numbers to move down.
     */
    order?: number;
}

export const columns: Record<string, ColumnDescriptor> = {
    cnt: {
        label: "Patient Count",
        description: "Number of unique patients"
    },
    progression: {
        label: "Treatment Response (evidence)",
        description: "Glioma disease progression status at least 30 days post-treatment."
    },
    progression_bin: {
        label: "Treatment Response",
        description: "Glioma disease progression or stable after 30 days post-treatment.",
        order: -1
    },
    regrowth_pattern: {
        label: "Tumor Regrowth Pattern",
        description: "Glioma tumor regrowth observed"
    },
    symptom_burden: {
        label: "Glioma Symptom Burden",
        description: "Glioma symptom burden."
    },
    symptom_burden_bin: {
        label: "Glioma Symptom Burden",
        description: "Glioma symptom burden."
    },
    tx_class: {
        label: "Treatment Class",
        description: "Class of treatment (e.g. gross total resection, chemotherapy, BRAF, MEK, etc.)"
    },
    tx_modality: {
        label: "Treatment Modality",
        description: "Treatment modality (e.g. surgery, chemotherapy, etc)"
    },
    visual_status: {
        label: "Visual Acuity Progression",
        description: "Visual acuity (e.g. improving, declining, stable, etc)"
    },
    visual_status_bin: {
        label: "Visual Acuity Progression",
        description: "Visual acuity (e.g. improving, declining, stable, etc)"
    },
    tx_specific: {
        label: "Specific Treatment",
        description: "The name of the specific treatment."
    },
    site: {
        label: "Healthcare Site",
        description: "Healthcare Site Name",
        enabled: false
    },
};
