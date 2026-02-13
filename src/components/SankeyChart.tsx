import { useState }          from 'react';
import Highcharts            from 'highcharts';
import HighchartsReact       from 'highcharts-react-official';
import { columns }           from '../data';
import { parseCsvToObjects } from '../utils';
import csvText               from './gliomacubepatientcasedeftxresponse30days.csv?raw';
import 'highcharts/modules/sankey';
import 'highcharts/modules/accessibility';

const parsed = parseCsvToObjects(csvText);


const CNT_COLUMN = 'cnt';
const SELECTION_COLOR = '#0d6efd'; // Bootstrap primary blue


// Look for combinations of a + b + cnt, with all other columns null
function isValidRow(row: Record<string, any>, a: string, b: string) {
    for (const col in row) {
        if (col === a && row[col] === null) {
            return false;
        }
        if (col === b && row[col] === null) {
            return false;
        }
        if (col === CNT_COLUMN && row[col] === null) {
            return false;
        }
        // Any row that has data on columns other than a, b, or cnt is invalid for our purposes
        if (col !== a && col !== b && col !== CNT_COLUMN && row[col] !== null) {
            return false;
        }
    }
    return true;
}

function isCountRow(row: Record<string, any>): { col: string, value: number } | null {
    
    const keys = Object.keys(row);

    if (keys.filter(k => row[k] !== null).length !== 2) {
        return null;
    }

    for (const col of keys) {
        const value = row[col];
        
        if (value !== null && col !== CNT_COLUMN) {
            // console.log(col, value, row[CNT_COLUMN])
            return { col: col + ":" + value, value: parseFloat(row[CNT_COLUMN]!) }
        }
    }

    return null;
}

function getColorForNode(column: string, value: string): string {
    const map = {
        "progression_bin:PROGRESSION"       : '#ff9999',
        "progression_bin:STABLE"            : '#99EE99',
        "symptom_burden_bin:SYMPTOM_PRESENT": '#ffcc99',
        "symptom_burden_bin:NOT_MENTIONED"  : '#DDDDDD',
        "visual_status_bin:IMPROVING"       : '#99EE99',
        "visual_status_bin:DECLINING"       : '#ff9999',
    };
    return map[String(column + ':' + value) as keyof typeof map] || '#DDDDDD';
}
// console.log(parsed)

export default function SankeyChart({ patient }: { patient: Patient }) {

    const headers = Object.keys(parsed[0] || {});

    const column1 = 'tx_modality';
    const column2 = 'tx_class';
    const [column3, setColumn3] = useState<string>('progression_bin');

    const weights: Record<string, number> = {};

    // Columns:
    //   cnt, progression, regrowth_pattern, symptom_burden, tx_class,
    //   tx_modality, tx_specific, visual_status
    const data: any[] = parsed.reduce((acc: any[], row) => {

        const weight = isCountRow(row);
        if (weight) {
            weights[weight.col] = weight.value;
        }

        // tx_modality -> tx_class (count)
        if (isValidRow(row, column1, column2)) {
            const selected = patient.treatmentClass.includes(row[column2] as any);
            acc.push({
                from       : column1 + ':' + row[column1]!.replace('cumulus__none', 'NOT_MENTIONED'),
                to         : column2 + ':' + row[column2]!.replace('cumulus__none', 'NOT_MENTIONED'),
                weight     : parseFloat(row[CNT_COLUMN]!),
                linkOpacity: selected ? 1 : 0.3,
                custom     : { selected }
            });
        }

        // tx_class -> progression (count)
        if (isValidRow(row, column2, column3)) {
            const selected = patient.treatmentClass.includes(row[column2] as any);
            acc.push({
                from       : column2 + ':' + row[column2]!.replace('cumulus__none', 'NOT_MENTIONED'),
                to         : column3 + ':' + row[column3]!.replace('cumulus__none', 'NOT_MENTIONED'),
                weight     : parseFloat(row[CNT_COLUMN]!),
                linkOpacity: selected ? 1 : 0.3,
                custom     : { selected },
            });
        }

        return acc;
    }, []);

    // console.log("weights:",  weights);

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
            useHTML: true,
            outside: false,
            // pointFormat: '{point.fromNode.name} <b>\u2192</b> {point.toNode.name}: <b>{point.weight}</b> patients',
            // nodeFormat: '{point.name}: <b>{point.sum}</b> patients',
            formatter: function(this: any) {
                console.log(this)
                if (this.point.isNode) {
                    return `<b>${this.point.name}</b><br/>Total: <b>${this.point.custom.weight}</b> patients` +
                        (this.point.linksFrom.length > 0 ?
                            '<hr/><table><tbody>' +
                            this.point.linksFrom.map((link: any) => `<tr><td style="text-align:right"><b>${link.weight}</b> patients</td><td>\u2192</td><td style="text-align:left">${link.toNode.name}</td></tr>`).join('') +
                            '</tbody></table>'
                        : ''
                        // '<hr/><table><tbody>' +
                        //     this.point.linksTo.map((link: any) => `<tr><td style="text-align:right"><b>${link.weight}</b> patients</td><td> from </td><td style="text-align:left">${link.fromNode.name}</td></tr>`).join('') +
                        //   '</tbody></table>'
                        );
                } else {
                    return `<b>${this.point.fromNode.name} \u2192 ${this.point.toNode.name}</b><br/>${this.point.weight} patients`;
                }
            },
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
                nodeWidth  : '20%',
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
                const seen1 = new Set<string>();
                const seen2 = new Set<string>();
                const seen3 = new Set<string>();
                parsed.forEach((row) => {
                    if (row[column1]) {
                        const selected = row[column2] && patient.treatmentClass.includes(row[column2] as any);
                        if (!seen1.has(row[column1])) {
                            seen1.add(row[column1]);
                            acc.push({
                                id: column1 + ':' + row[column1]!.replace('cumulus__none', 'NOT_MENTIONED'),
                                color: '#eae4bf',
                                name: row[column1].replaceAll('_', ' '),
                                opacity: selected ? 1: 0.5,
                                labelRank: selected ? 2 : 0,
                                custom: {
                                    weight: weights[column1 + ':' + row[column1]!.replace('cumulus__none', 'NOT_MENTIONED')] || 0,
                                },
                                dataLabels: {
                                    // format: selected ? '{point.name} ▶︎' : '{point.name}',
                                    style: {
                                        color: selected ? '#000' : '#666666',
                                        textOutline: selected ? '1px #FFFC' : '1px #FFF6'
                                    }
                                }
                            });
                        } else {
                            if (selected) {
                                // Update existing node to selected state
                                const node = acc.find(n => n.id === column1 + ':' + row[column1]!.replace('cumulus__none', 'NOT_MENTIONED'));
                                if (node) {
                                    node.opacity = 1;
                                    node.labelRank = 2;
                                    node.custom = {
                                        weight: weights[column1 + ':' + row[column1]!.replace('cumulus__none', 'NOT_MENTIONED')] || 0,
                                    };
                                    node.dataLabels = {
                                        // format: '{point.name} ▶︎',
                                        style: {
                                            color: '#000',
                                            textOutline: '1px #FFFC'
                                        }
                                    };
                                }
                            }
                        }
                    }

                    if (row[column2] && !seen3.has(row[column2])) {
                        const selected = patient.treatmentClass.includes(row[column2]);
                        seen3.add(row[column2]);
                        acc.push({
                            id: column2 + ':' + row[column2]!.replace('cumulus__none', 'NOT_MENTIONED'),
                            color: selected ? '#8ac4ff' : '#d4e9ff',
                            name: row[column2].replaceAll('_', ' '),
                            custom: {
                                weight: weights[column2 + ':' + row[column2]!.replace('cumulus__none', 'NOT_MENTIONED')] || 0,
                            },
                            dataLabels: {
                                // format: '{point.name}',
                                labelRank: selected ? 2 : 0,
                                style: {
                                    color: selected ? '#000' : '#6382a1',
                                    textOutline: selected ? '1px #FFFC' : '1px #FFF6'
                                }
                            }
                        });
                    }

                    if (row[column3] && !seen2.has(row[column3])) {
                        seen2.add(row[column3]!.replace('cumulus__none', 'NOT_MENTIONED'));
                        acc.push({
                            id: column3 + ':' + row[column3]!.replace('cumulus__none', 'NOT_MENTIONED'),
                            color: getColorForNode(column3, row[column3]!.replace('cumulus__none', 'NOT_MENTIONED')), //'#bceab3',
                            name: row[column3]!.replaceAll('_', ' '),
                            custom: {
                                weight: weights[column3 + ':' + row[column3]!.replace('cumulus__none', 'NOT_MENTIONED')] || 0,
                            },
                            // dataLabels: {
                            //     format: '{point.name}',
                            //     labelRank: 1,
                            //     style: {
                            //         color: '#000',
                            //         textOutline: '1px #FFF8'
                            //     }
                            // }
                        });
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
                    <h5 className='text-success fw-semibold'>
                        { columns.tx_modality.label }
                    </h5>
                </div>
                <div className='col text-center border-bottom border-3'>
                    <h5 className='text-success fw-semibold'>
                        { columns.tx_class.label }
                    </h5>
                </div>
                <div className='col text-end border-bottom border-3'>
                    <h5 className='text-success fw-semibold'>
                        <select className='' onChange={(e) => {setColumn3(e.target.value) }} value={column3} style={{
                            width: '100%',
                            font: 'inherit',
                            color: 'inherit',
                            border: 'none',
                            background: 'transparent',
                            padding: '0 0.2em 0 0',
                            margin: 0,
                            cursor: 'pointer',
                            outline: 'none',
                            textAlign: 'inherit'
                        }}>
                            { headers
                            .filter(h => h !== column1 && h !== column2 && h !== CNT_COLUMN && columns[h as keyof typeof columns]?.enabled !== false)
                            .sort((a, b) => ((columns[b as keyof typeof columns]?.order ?? 0) - (columns[a as keyof typeof columns]?.order ?? 0)))
                            .map((col) => (
                                <option key={col} value={col} title={columns[col as keyof typeof columns]?.description || undefined}>{ columns[col as keyof typeof columns]?.label || col.replaceAll('_', ' ')}</option>
                            )) }
                        </select>
                    </h5>
                </div>
            </div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    );
}