import Highcharts            from 'highcharts';
import HighchartsReact       from 'highcharts-react-official';
import { parseCsvToObjects } from '../utils';
import csvText               from './gliomacubepatientcasedeftxresponse30days.csv?raw';
import 'highcharts/modules/sankey';
import 'highcharts/modules/accessibility';

const parsed = parseCsvToObjects(csvText);



const SELECTION_COLOR = '#0d6efd'; // Bootstrap primary blue


export default function SankeyChart({ patient }: { patient: Patient }) {

    // Columns:
    //   cnt, progression, regrowth_pattern, symptom_burden, tx_class,
    //   tx_modality, tx_specific, visual_status
    const data: any[] = parsed.reduce((acc: any[], row) => {

        // tx_modality -> tx_class (count)
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
            const selected = patient.treatmentClass.includes(row.tx_class);
            acc.push({
                from       : 'modality:' + row.tx_modality,
                to         : 'class:' + row.tx_class,
                weight     : parseFloat(row.cnt),
                linkOpacity: selected ? 1 : 0.3,
                custom     : { selected }
            });
        }

        // tx_class -> progression (count)
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
            const selected = patient.treatmentClass.includes(row.tx_class);
            acc.push({
                from       : 'class:' + row.tx_class,
                to         : 'progression:' + row.progression,
                id         : row.tx_class + '_to_' + row.progression,
                weight     : parseFloat(row.cnt),
                linkOpacity: selected ? 1 : 0.3,
                custom     : { selected },
            });
        }

        return acc;
    }, []);

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
            margin: [10, 0, 10, 0],
        },
        exporting: {
            enabled: false
        },
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
                valueDescriptionFormat: '{index}. {point.from} to {point.to}, {point.weight} patients.'
            }
        },
        tooltip: {
            borderColor: SELECTION_COLOR,
            borderWidth: 1,
            headerFormat: null,
            pointFormat: '{point.fromNode.name} <b>\u2192</b> {point.toNode.name}: <b>{point.weight}</b> patients',
            nodeFormat: '{point.name}: <b>{point.sum}</b> patients',
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
                borderRadius: 0, 
                // colorByPoint: true,
                color: SELECTION_COLOR + '60', // default color with transparency
                dataLabels: {
                    enabled: true,
                    overlap: true,
                    style: {
                        textOutline: '1px #FFF8',
                        fontWeight : 'bold',
                        fontSize   : '14px',
                        fontFamily : 'sans-serif',
                    }
                }
            }
        },
        series: [{
            keys: ['from', 'to', 'weight'],
            nodes: (() => {
                const acc: any[] = [];
                const seenModality = new Set<string>();
                const seenProgression = new Set<string>();
                const seenClass = new Set<string>();
                parsed.forEach((row) => {
                    if (row.tx_modality) {
                        const selected = row.tx_class && patient.treatmentClass.includes(row.tx_class);
                        if (!seenModality.has(row.tx_modality)) {
                            seenModality.add(row.tx_modality);
                            acc.push({
                                id: 'modality:' + row.tx_modality,
                                color: '#fed6ab',
                                name: row.tx_modality.replaceAll('_', ' '),
                                opacity: selected ? 1: 0.5,
                                dataLabels: {
                                    format: selected ? '{point.name} ▶︎' : '{point.name}',
                                    style: {
                                        color: selected ? '#000' : '#666666',
                                        textOutline: selected ? '1px #FFFC' : '1px #FFF6'
                                    }
                                }
                            });
                        } else {
                            if (selected) {
                                // Update existing node to selected state
                                const node = acc.find(n => n.id === 'modality:' + row.tx_modality);
                                if (node) {
                                    node.opacity = 1;
                                    node.dataLabels = {
                                        format: '{point.name} ▶︎',
                                        style: {
                                            color: '#000',
                                            textOutline: '1px #FFFC'
                                        }
                                    };
                                }
                            }
                        }
                    }
                    if (row.tx_class && !seenClass.has(row.tx_class)) {
                        const selected = patient.treatmentClass.includes(row.tx_class);
                        seenClass.add(row.tx_class);
                        acc.push({
                            id: 'class:' + row.tx_class,
                            color: selected ? '#8ac4ff' : '#d4e9ff',
                            name: row.tx_class.replaceAll('_', ' '),
                            dataLabels: {
                                format: selected ? '{point.name} ▶︎' : '{point.name}',
                                style: {
                                    color: selected ? '#000' : '#6382a1',
                                    textOutline: selected ? '1px #FFFC' : '1px #FFF6'
                                }
                            }
                        });
                    }

                    if (row.progression && !seenProgression.has(row.progression)) {
                        seenProgression.add(row.progression);
                        acc.push({ id: 'progression:' + row.progression, color: '#bceab3', name: row.progression.replaceAll('_', ' ') });
                    }
                });
                return acc;
            })(),

            data,
            type: 'sankey',
        }]

    }

    return (
        <div className='mt-5'>
            <div className='d-flex mb-2 gap-5'>
                <div className='col text-start border-bottom border-3'>
                    <h5 className='text-success fw-semibold'>Treatment Modality</h5>
                </div>
                <div className='col text-center border-bottom border-3'>
                    <h5 className='text-success fw-semibold'>Treatment Class</h5>
                </div>
                <div className='col text-end border-bottom border-3'>
                    <h5 className='text-success fw-semibold'>Treatment Progression</h5>
                </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}