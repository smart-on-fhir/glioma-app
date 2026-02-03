import BoxPlot from "./components/BoxPlot";

const base = String(import.meta.env.VITE_BASE_URL || '/').replace(/\/+$/, '');

export const patients: Patient[] = [
    {
        // Patient metadata
        // ---------------------------------------------------------------------
        name: "Teresa Anderson",
        gender: "Female",
        dob: "2020-03-15",
        mrn: "12345678",
        description: `This patient is a White, non-Hispanic male born in 2012,
        enrolled in CBTN in 2014, and diagnosed with a low-grade glioma at
        approximately 18 months of age. Pathology was consistent with pilomyxoid
        astrocytoma/low-grade glioma, harboring a KIAA1549-BRAF fusion. The tumor
        involved the suprasellar/hypothalamic–pituitary region with ventricular
        extension and no evidence of metastatic disease. The clinical course
        included three documented progressions. Surgical management consisted of
        one partial resection followed by a later gross total resection. Systemic
        therapy began with carboplatin/vincristine and later included vinblastine
        and trametinib, including enrollment on a clinical trial. Comprehensive
        tumor and germline molecular profiling was performed.`,

        // Medications table and chart screenshot
        // ---------------------------------------------------------------------
        population: {
            screenshot: (
                <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/94">
                    <img className="chart-screenshot" src={`${base}/uc_survival_per_drug_class.png`} />
                </a>
            ),
            tableRows: [
                { drugClass: "CV chemotherapy"              , patients: 202, boxplot: [0.18, 1.31, 2.91, 5.18, 9.61 ] },
                { drugClass: "MEK inhibitors"               , patients: 54 , boxplot: [0.06, 0.62, 1.34, 1.99, 5.11 ] },
                { drugClass: "BRAF inhibitors"              , patients: 49 , boxplot: [0.35, 0.9 , 1.47, 3.11, 7.24 ] },
                { drugClass: "Platinum therapies"      , patients: 287, boxplot: [0.14, 1.03, 2.25, 4.46, 8.47 ] },
                { drugClass: "Alkylating agents"    , patients: 320, boxplot: [0.11, 1.18, 2.93, 5.63, 11.11] },
                { drugClass: "Antimetabolites"      , patients: 226, boxplot: [0.23, 1.46, 3.16, 6.1 , 9.83 ] }
            ]
        },

        // Main table
        // ---------------------------------------------------------------------
        value: 4.33, // The patient age in years we render over the boxplot charts
        populationData: [
            {
                label       : <>Behavior (<b className="text-success">Histology + Grade</b>)</>,
                responder   : '26%',
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/70">74%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/84">41%</a>
            },
            {
                label       : <>Tumor Location (<b className="text-success">Tumor</b>)</>,
                responder   : "28%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/63">72%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/90">56%</a>
            },
            {
                label       : 'Severity',
                responder   : "21%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/42">79%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/91">69%</a>
            },
            {
                label       : 'Age at Dx',
                responder   : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/93" className="text-decoration-none"><BoxPlot data={[1, 3, 8 , 11, 16]} marker={4.33}/></a>,
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/93" className="text-decoration-none"><BoxPlot data={[1, 5, 12, 26, 34]} marker={4.33}/></a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/112" className="text-decoration-none"><BoxPlot data={[1, 4, 17, 32, 40]} marker={4.33}/></a>,
            },
            {
                label       : <b>Female</b>,
                responder   : "24%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/78">76%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/87">39%</a>
            },
            {
                label       : <b>White</b>,
                responder   : "21%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/79">79%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/88">42%</a>
            },
            {
                label       : <>Genetic effect</>,
                responder   : "29%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/58">71%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/89">7%</a>
            }
        ]
    },
    {
        // Patient metadata
        // ---------------------------------------------------------------------
        name: "Malik Johnson",
        gender: "Male",
        dob: "2022-01-05",
        mrn: "23456789",
        description: `
        This patient is a Hispanic or Latino, Black or African American female
        born in 2012, enrolled in CBTN in 2014, and diagnosed with a low-grade
        glioma (pilocytic astrocytoma) at approximately 2.2 years of age. The
        tumor arose in the suprasellar/hypothalamic–pituitary region with
        leptomeningeal and CSF dissemination. She has experienced eight
        documented progressions without histologic transformation. Management
        has included two partial resections and multiple lines of systemic
        therapy, beginning with carboplatin/vincristine and followed by several
        chemotherapy and targeted regimens, including bevacizumab, trametinib,
        temozolomide, and combination therapies. Extensive tumor and germline
        molecular profiling has been performed.`,
        
        // Medications table and chart screenshot
        // ---------------------------------------------------------------------
        population: {
            screenshot: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/95">
                    <img className="chart-screenshot" src={`${base}/cd_survival_per_drug_class.png`} />
            </a>,
            tableRows: [
                { drugClass: "CV chemotherapy" , patients: 114, boxplot: [ 0.35, 1.75, 3.21, 5.43,  9.61 ] },
                { drugClass: "MEK inhibitors"   , patients: 26 , boxplot: [ 0.41, 0.71, 1.34, 1.85,  5.51 ] },
                { drugClass: "BRAF inhibitors", patients: 41 , boxplot: [ 0.35, 1.09, 1.47, 3   ,  7.24 ] },
                { drugClass: "Platinum therapies"        , patients: 212, boxplot: [ 0.16, 1.25, 2.73, 4.76,  8.71 ] },
                { drugClass: "Alkylating agents"  , patients: 219, boxplot: [ 0.18, 1.41, 3.11, 6.07, 10.48 ] },
                { drugClass: "Antimetabolites" , patients: 164, boxplot: [ 0.33, 1.66, 3.44, 6.36,  9.61 ] },
            ]
        },

        // Main table
        // ---------------------------------------------------------------------
        value: 1, // The patient age in years we render over the boxplot charts
        populationData: [
            {
                label       : <>Behavior (<b className="text-success">Histology + Grade</b>)</>,
                responder   : '22%',
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/70">78%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/84">35%</a>
            },
            {
                label       : <>Tumor Location (<b className="text-success">Tumor</b>)</>,
                responder   : "16%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/62">84%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/85">37%</a>
            },
            {
                label       : 'Severity',
                responder   : "21%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/74">79%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/86">58%</a>
            },
            {
                label       : "Age at Dx",
                responder   : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/93" className="text-decoration-none"><BoxPlot data={[1, 3, 8   , 11, 16]} marker={1} /></a>,
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/93" className="text-decoration-none"><BoxPlot data={[1, 5, 12  , 26, 34]} marker={1} /></a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/92" className="text-decoration-none"><BoxPlot data={[1, 2, 10.5, 20, 32]} marker={1} /></a>
            },
            {
                label       : <b>Male</b>,
                responder   : "24%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/75">76%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/87">41%</a>,
            },
            {
                label       : <b>Black or African American</b>,
                responder   : "14%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/77">86%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/88">30%</a>,
            },
            {
                label       : <>Genetic effect</>,
                responder   : "25%",
                nonResponder: <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/58">75%</a>,
                surgery     : <a href="https://smart-cumulus-fabric-2bea3378447d.herokuapp.com/views/89">47%</a>,
            }
        ]
    }
];
    