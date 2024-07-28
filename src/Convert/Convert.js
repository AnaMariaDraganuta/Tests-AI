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
           Introducere: sections[0],
           "1": sections[1],
           "2": sections[2],
           "3": sections[3],
           "4": sections[4]
        },
        Oferta: {
            ScopulDocumentului: {
                Descriere: sections[6],
                Etape: sections.slice(7, 10).join(' '),
                Detalii: sections.slice(10, 16).join(' '),
                Definitii: sections.slice(17, 19).join(' ')
            },
            PropunereStructura: {
                DezvoltareBaza: sections.slice(20, 30).join(' '),
                Optional: sections.slice(31, 35).join(' '),
                SugestiiSuplimentare: sections.slice(36, 40).join(' ')
            },
            PretSiTimpDeImplementare: {
                TimpEstimativDeLivrare: sections.slice(41, 45).join(' '),
                Costuri: sections[45]
            }
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-3');
