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

const SELECTION_COLOR = '#0d6efd'; // Bootstrap primary blue


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
                from  : row.tx_modality,
                to    : row.tx_class,
                weight: parseFloat(row.cnt),
                // selected,
                // opacity: selected ? 1 : 0.5,
                linkOpacity: selected ? 1 : 0.3,
                // color: selected ? SELECTION_COLOR + 'CC' : undefined,
                // linkColorMode: selected ? 'gradient' : 'from',
                // linkColor: selected ? SELECTION_COLOR : undefined,
                custom: {
                    selected
                },
                // dataLabels: {
                //     borderWidth: selected ? 1 : 0,
                //     borderColor: selected ? SELECTION_COLOR : '#0000',
                //     backgroundColor: selected ? SELECTION_COLOR : '#0000',
                // }
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
                // selected,
                // opacity: selected ? 1 : 0.3,
                linkOpacity: selected ? 1 : 0.3,
                // color: selected ? SELECTION_COLOR + 'CC' : undefined,
                // linkColorMode: selected ? 'gradient' : 'from',
                // linkColor: selected ? SELECTION_COLOR : undefined,
                // dataLabels: {
                //     backgroundColor: selected ? SELECTION_COLOR : '#0000',
                //     borderColor: selected ? SELECTION_COLOR : '#0000',
                //     borderWidth: selected ? 1 : 0,
                // }
                custom: {
                    selected
                },
            });
        }

        return acc;
    }, []);

    // console.log(data);

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
            // zooming: {
            //     type: 'xy'
            // },
            // panning: {
            //     enabled: true,
            //     type: 'xy'
            // },
            // panKey: 'shift',
            height: 650,
        },
        exporting: {
            enabled: false
        },
        colors: [
            '#80e4d3',
            '#bce7b3',
            '#eec0c9',
            '#e1b5ea',
            '#f1e4af',
            '#acdfac',
            '#aed0f3',
            '#dedede',
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
            borderColor: SELECTION_COLOR,
            borderWidth: 1,
            headerFormat: null,
            pointFormat: '{point.fromNode.name} <b>\u2192</b> {point.toNode.name}: <b>{point.weight}</b>',
            nodeFormat: '{point.name}: <b>{point.sum}</b>',
            shadow: {
                color: '#0006',
                size: 8
            }
        },
        plotOptions: {
            sankey: {
                // linkOpacity: 1,
                minLinkWidth: 3,
                linkColorMode: 'gradient',
                linkColor: '#CCCCCC',

                nodeWidth  : 220,
                nodeAlignment: 'top',
                nodeDistance: '100%',
                nodePadding: 6,
                // curveFactor: 0.2,
                // opacity: 1, 
                borderRadius: 0, 
                // borderWidth: 1,
                borderColor: '#0003',
                colorByPoint: true,
                color: SELECTION_COLOR + '60', // default color with transparency
                // showCheckbox: true,
                // // shadow: {
                // //     color: '#000',
                // // },
                // // allowPointSelect: true,
                // clip: false,
                dataLabels: {
                    enabled: true,
                    // color: '#000',
                //     // format: '{point.name}',
                    // backgroundColor: '#FFFD',
                    // borderRadius: 6,
                    // padding: 5,
                    // inside: true,
                    // align: 'center',
                    // // width: 100,
                    // overflow: 'allow',
                    // verticalAlign: 'middle',
                    overlap: true,

                    style: {
                        textOutline: 'none',//'1px #FFFC',
                        fontWeight: 'bold',
                        fontSize: '12px',
                        fontFamily: 'sans-serif',
                    }
                },
                // states: {
                    // select: {
                    //     color: '#F608',
                    //     // borderColor: '#000',
                    //     // borderWidth: 2,
                    //     opacity: 1,
                    // },
                    // hover: {
                    //     // color: SELECTION_COLOR + 'CC',
                    //     // borderColor: '#0008',
                    //     // borderWidth: 1,
                    //     // brightness: 0.1,
                    //     // color: '#FFF'
                    //     // filter: 'drop-shadow(0 0 1px #000)'
                    // },
                    // inactive: {
                    //     // opacity: 0.3,
                    //     // borderWidth: 1,
                    //     // borderColor: '#000',
                    //     color: 'rgba(128, 128, 128, 0.3)',

                    // },
                    // normal: {
                    //     opacity: 0.5,
                    //     color: 'rgba(128, 128, 128, 0.3)',
                    // }
                // }
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            // dataSorting: {
            //     enabled: true,
            //     sortKey: 'to',
            // },


            nodes: (() => {
                const acc: any[] = [];
                const seenModality = new Set<string>();
                const seenProgression = new Set<string>();
                const seenClass = new Set<string>();
                parsed.forEach((row) => {
                    if (row.tx_modality && !seenModality.has(row.tx_modality)) {
                        seenModality.add(row.tx_modality);
                        acc.push({ id: row.tx_modality, color: '#fed6ab', offset: 60 });
                    }
                    if (row.tx_class && !seenClass.has(row.tx_class)) {
                        seenClass.add(row.tx_class);
                        acc.push({ id: row.tx_class, color: '#a7d3ff' });
                    }

                    if (row.progression && !seenProgression.has(row.progression)) {
                        seenProgression.add(row.progression);
                        acc.push({ id: row.progression, color: '#bceab3', offset: 40 });
                    }

                    // if (!seen.has(link.from)) {
                    //     nodes.push({ id: link.from });
                    //     seen.add(link.from);
                    // }
                    // if (!seen.has(link.to)) {
                    //     nodes.push({ id: link.to });
                    //     seen.add(link.to);
                    // }
                });
                return acc;
            })(),
                // { id: 'SURGERY', color: '#ffa500' },
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
        <div className='mt-3'>
            <div className='row mb-2'>
                <div className='col text-start'>
                    <h5 className='mb-0 badge bg-success rounded-pill ms-3'>Treatment Modality</h5>
                </div>
                <div className='col text-center'>
                    <h5 className='mb-0 badge bg-success rounded-pill'>Treatment Class</h5>
                </div>
                <div className='col text-end'>
                    <h5 className='mb-0 badge bg-success rounded-pill me-3'>Treatment Progression</h5>
                </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}