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

        },
        Oferta: {
            ScopulDocumentului: {
                Descriere: sections[4],
                Etape: sections.slice(5, 8).join(' '),
                Detalii: sections.slice(8, 14).join(' '),
                Definitii: sections.slice(14, 17).join(' ')
            },
            PropunereStructura: {
                DezvoltareCRMDeBaza: sections.slice(19, 29).join(' '),
                LegaturaSite: sections.slice(29, 37).join(' '),
            },
            SugestiiSuplimentare: sections.slice(38, 42).join(' '),

            PretSiTimpDeImplementare: {
                TimpEstimativDeLivrare: sections.slice(43, 45).join(' '),
                Suplimentar: sections[46]
            }
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-4');
