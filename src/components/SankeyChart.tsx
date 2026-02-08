import Highcharts             from 'highcharts';
import HighchartsReact        from 'highcharts-react-official';
import 'highcharts/modules/sankey';
import 'highcharts/modules/non-cartesian-zoom';
import 'highcharts/modules/mouse-wheel-zoom';
import 'highcharts/modules/exporting';
import 'highcharts/modules/export-data';
import 'highcharts/modules/accessibility';
import 'highcharts/themes/adaptive';
import csvText from './gliomacubepatientcasedeftxresponse30days.csv?raw';
import { parseCsvToObjects } from '../utils';

const parsed = parseCsvToObjects(csvText);

// console.log(parsed);

// function queryCube(where: Record<string, string | null>): Record<string, string|null>[] {
//     return parsed.filter((row) => {
//         for (const key in row) {

//             // Look for explicit matches for keys in `where`
//             if (key in where) {
//                 if (where[key] !== row[key]) return false;
//                 continue;
//             }

//             // Any keys not in `where` must be null in the row to match
//             if (row[key] !== null) {
//                 return false
//             }
//         }
//     });

// }

const patientTxClass = [
    'ALKYLATING',
    'BRAF',
    'CHEMOTHERAPY',
    'MEK',
    'MULTI_AGENT_CHEMOTHERAPY',
    'RESECTION',
    'TRAMETINIB',
    'VINCA_ALKALOID',
    'VINCRISTINE'
];


export default function SankeyChart() {

    // ['from', 'to', 'weight']
    const data: any[] = parsed.reduce((acc: any[], row) => {
        // cnt,progression,regrowth_pattern,symptom_burden,tx_class,tx_modality,tx_specific,visual_status

        // cnt: "18"
        // progression: "BOTH"
        // regrowth_pattern: "NOT_MENTIONED"
        // symptom_burden: "VISUAL_SYMPTOMS"
        // tx_class: null
        // tx_modality: null
        // tx_specific: "cumulus__none"
        // visual_status: null

        if (
            row.tx_modality &&
            row.tx_class &&
            row.cnt &&
            row.progression === null&&
            row.regrowth_pattern === null &&
            row.symptom_burden === null &&
            row.tx_specific === null &&
            row.visual_status === null
        ) {
            const selected = patientTxClass.includes(row.tx_class);
            acc.push({
                from: row.tx_modality,
                to: row.tx_class,
                weight: parseFloat(row.cnt),
                selected,
                opacity: selected ? 1 : 0.3,
            });
        }

        else if (
            row.progression &&
            row.tx_class &&
            row.cnt &&
            row.tx_modality === null&&
            row.regrowth_pattern === null &&
            row.symptom_burden === null &&
            row.tx_specific === null &&
            row.visual_status === null
        ) {
            const selected = patientTxClass.includes(row.tx_class);
            acc.push({
                from: row.tx_class,
                to: row.progression,
                weight: parseFloat(row.cnt),
                selected,
                opacity: selected ? 1 : 0.3,
            });
        }

        return acc;
    }, []);

    console.log(data);

    // cnt, progression, regrowth_pattern, symptom_burden, tx_class, tx_modality, tx_specific, visual_status
    // queryCube({
    //     tx_modality: 'CHEMOTHERAPY*',
    //     tx_class: 'CHEMOTHERAPY',
    //     // cnt,
    //     // progression,
    //     // regrowth_pattern,
    //     // symptom_burden,
    //     // tx_class,
    //     // tx_modality,
    //     // tx_specific,
    //     // visual_status
    // })

    const chartOptions = {
        chart: {
            zooming: {
                type: 'xy'
            },
            panning: {
                enabled: true,
                type: 'xy'
            },
            panKey: 'shift',
            height: 650,
        },
        exporting: {
            enabled: false
        },
        colors: [
            '#80e4d3',
            '#93ce87',
            '#eaa3b0',
            '#e1b5ea',
            '#eedb8e',
            '#78b778',
            '#78afe5',
            '#CCCCCC',
        ],
        title: {
            text: ''
        },
        subtitle: {
            text: ''
        },
        credits: {
            enabled: false
        },
        accessibility: {
            point: {
                valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight}.'
            }
        },
        tooltip: {
            headerFormat: null,
            pointFormat: '{point.fromNode.name} \u2192 {point.toNode.name}: {point.weight:.2f} quads',
            nodeFormat: '{point.name}: {point.sum:.2f} quads'
        },
        plotOptions: {
            sankey: {
                linkOpacity: 0.5,
                nodeWidth: 190,
                nodePadding: 8,
                curveFactor: 0.2,
                opacity: 1, 
                borderRadius: 0, 
                borderWidth: 1,
                borderColor: '#0001',
                colorByPoint: true,
                color: '#0363',
                showCheckbox: true,
                shadow: {
                    color: '#0002',
                },
                // allowPointSelect: true,
                clip: false,
                dataLabels: {
                    enabled: true,
                    color: '#000',
                    // format: '{point.name}',
                    // backgroundColor: '#FFFD',
                    // borderRadius: 3,
                    // padding: 1,
                    // inside: true,
                    align: 'center',
                    // width: 100,
                    overflow: 'allow',
                    verticalAlign: 'middle',

                    style: {
                        textOutline: '1px #FFFC',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'sans-serif',
                    }
                },
                states: {
                    // select: {
                    //     color: '#F608',
                    //     // borderColor: '#000',
                    //     // borderWidth: 2,
                    //     opacity: 1,
                    // },
                    hover: {
                        color: '#F60C',
                        // borderColor: '#000',
                        // borderWidth: 2,
                        // brightness: 0.1,
                    },
                    inactive: {
                        opacity: 0.3,
                        // borderWidth: 1,
                        // borderColor: '#000',
                        color: '#0003',

                    },
                    normal: {
                        opacity: 0.5,
                    }
                }
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],


            // nodes: [
            //     { id: 'Electricity & Heat', color: '#ffa500', offset: -110 },
            //     { id: 'Net Import'     , color: '#000000' },
            //     { id: 'Residential'    , color: '#74ffe7', column: 2, offset: 50 },
            //     { id: 'Commercial'     , color: '#8cff74', column: 2, offset: 50 },
            //     { id: 'Industrial'     , color: '#ff8da1', column: 2, offset: 50 },
            //     { id: 'Transportation' , color: '#f4c0ff', column: 2, offset: 50 },
            //     { id: 'Rejected Energy', color: '#e6e6e6', column: 3, offset: -30 },
            //     { id: 'Energy Services', color: '#F9E79F', column: 3 },
            //     { id: 'Net Import'     , color: '#000000' },
            //     { id: 'Solar'          , color: '#009c00' },
            //     { id: 'Nuclear'        , color: '#1a8dff' },
            //     { id: 'Hydro'          , color: '#009c00' },
            //     { id: 'Wind'           , color: '#009c00' },
            //     { id: 'Geothermal'     , color: '#009c00' },
            //     { id: 'Natural Gas'    , color: '#1a8dff' },
            //     { id: 'Biomass'        , color: '#009c00' },
            //     { id: 'Coal'           , color: '#989898' },
            //     { id: 'Petroleum'      , color: '#989898', offset: -1 }
            // ],

            data,
            type: 'sankey',
            name: 'Sankey demo series',
            // dataLabels: {
            //     style: {
            //         // color: 'var(--highcharts-neutral-color-100, #000)'
            //     }
            // }
        }]

    }

    return (
        <div>
            <div className='row'>
                <div className='col col-2 text-center'>
                    <h5 className='mb-0'>Modality</h5>
                </div>
                <div className='col text-center'>
                    <h5 className='mb-0'>Class</h5>
                </div>
                <div className='col col-2 text-center'>
                    <h5 className='mb-0'>Progression</h5>
                </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}