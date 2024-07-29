import fs from 'fs';
import mammoth from 'mammoth';
import Papa from 'papaparse';

const flattenObject = (obj, parent = '', res = {}) => {
    for (let key in obj) {
        let propName = parent ? `${parent}-${key}` : key;
        if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
            flattenObject(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
};

const convertDocxToJSONAndCSV = async (test) => {
    const docxFilePath = `C:/Users/antoh/Desktop/Veziv/Tests-AI/src/Teste/Docx/${test}.docx`;
    const jsonFilePath = `C:/Users/antoh/Desktop/Veziv/Tests-AI/src/Teste/Json/${test}.json`;
    const csvFilePath = `C:/Users/antoh/Desktop/Veziv/Tests-AI/src/Teste/CSV/${test}.csv`;

    const result = await mammoth.extractRawText({ path: docxFilePath });
    const text = result.value;

    const sections = text.split('\n').filter(line => line.trim() !== '');

    const offer = {
        SolicitareaClientului: {
            AplicatieClienti: sections.slice(0, 11).join(' '),
            AplicatieAngajati: sections.slice(12, 15).join(' '),
            AplicatieAdmin: sections.slice(16, 21).join(' '),
            Logistica: sections[22],
            Website: sections[23],
            Cashflow: sections[24]
        },
        Oferta: {
            ScopulDocumentului: sections.slice(26, 34).join(' '),
            PropunereStructura: {
                AplicatieClient: sections.slice(36, 53).join(' '),
                AplicatieAngajat: sections.slice(54, 61).join(' '),
                AplicatieAdmin: sections.slice(62, 77).join(' '),
                ModificariWebsite: sections.slice(78, 81).join(' ')
            },
            SugestiiSuplimentare: sections[83],
            PretSiTimpDeImplementare: sections.slice(84, 87).join(' ')
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-7');
