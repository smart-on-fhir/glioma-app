
/**
 * Converts a date string into a more readable format.
 * @param dateStr - Any valid date string that can be parsed by the Date constructor.
 * @returns A locally formatted date string
 */
export function formatDate(
    dateStr: string,
    options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, { year: options.year, month: options.month, day: options.day });
}

/**
 * Parse CSV text into an array of rows, each row is an array of strings or null for empty cells.
 * - Handles quoted fields including escaped double-quotes ("") and newlines inside quotes.
 * - Trims unquoted fields.
 * - Converts empty cells (or cells that are only whitespace) to `null`.
 *
 * @param text - CSV file content as text
 * @param delimiter - Field delimiter (default: comma)
 * @returns Array of rows (array of fields). Empty cells are `null`.
 */
export function parseCsvToArrays(text: string, delimiter = ','): (string | null)[][] {
    const rows: (string | null)[][] = [];
    let i = 0;
    const len = text.length;

    let row: (string | null)[] = [];
    let field = '';
    let inQuotes = false;
    let fieldQuoted = false;

    const pushField = () => {
        let val = fieldQuoted ? field : field.trim();
        if (val === '') {
            row.push(null);
        } else {
            row.push(val);
        }
        // reset for next field
        field = '';
        fieldQuoted = false;
    };

    while (i < len) {
        const char = text[i];

        if (inQuotes) {
            if (char === '"') {
                if (i + 1 < len && text[i + 1] === '"') {
                    field += '"';
                    i += 1; // skip escaped quote
                } else {
                    inQuotes = false; // closing quote
                }
            } else {
                field += char;
            }
        } else {
            if (char === '"') {
                // start quoted field (only if at field start)
                if (field === '') {
                    inQuotes = true;
                    fieldQuoted = true;
                } else {
                    // stray quote in unquoted field; treat as literal
                    field += char;
                }
            } else if (char === delimiter) {
                pushField();
            } else if (char === '\r') {
                // handle CR or CRLF
                if (i + 1 < len && text[i + 1] === '\n') i += 1;
                pushField();
                rows.push(row);
                row = [];
            } else if (char === '\n') {
                pushField();
                rows.push(row);
                row = [];
            } else {
                field += char;
            }
        }

        i += 1;
    }

    // push last field/row (if any input present)
    // If the file ends with a delimiter, that implies a trailing empty field which should become null.
    if (inQuotes) {
        // Unterminated quote: treat remaining text as field content
        // (we already accumulated it into `field`), so close it.
        inQuotes = false;
    }

    // If there was any data or an unfinished row, push remaining field and row
    if (field !== '' || fieldQuoted || row.length > 0 || text.endsWith(delimiter)) {
        pushField();
        rows.push(row);
    }

    return rows;
}

/**
 * Convert CSV text to an array of objects using the first row as headers.
 * Empty cells become `null`. If a header cell is empty, a fallback key `columnN` is used.
 *
 * @param text - CSV file content as text
 * @param delimiter - Field delimiter (default: comma)
 * @returns Array of objects where keys are header names and values are strings or null
 */
export function parseCsvToObjects(text: string, delimiter = ','): Record<string, string | null>[] {
    const rows = parseCsvToArrays(text, delimiter);
    if (rows.length === 0) return [];

    const rawHeaders = rows[0];
    const headers = rawHeaders.map((h, idx) => {
        if (h === null) return `column${idx + 1}`;
        const trimmed = String(h).trim();
        return trimmed === '' ? `column${idx + 1}` : trimmed;
    });

    const objs: Record<string, string | null>[] = [];
    for (let r = 1; r < rows.length; r++) {
        const row = rows[r];
        const obj: Record<string, string | null> = {};
        for (let c = 0; c < headers.length; c++) {
            const key = headers[c];
            const val = c < row.length ? row[c] : null;
            obj[key] = val;
        }
        objs.push(obj);
    }

    return objs;
}

/* Example usage:
import csvText from './components/gliomacubepatientcasedeftxresponse30days.csv?raw';
const parsedObjects = parseCsvToObjects(csvText);
*/
