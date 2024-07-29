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
            Detalii: sections.slice(1, 8).join(' '),  
        },
        Oferta: {
            ScopulDocumentului: {
                Descriere: sections[9],
                Etape: sections.slice(10, 13).join(' '),  
                Preturi: sections.slice(13, 15).join(' ')
            },
            PropunereStructura: {
                DezvoltareCRM: sections.slice(16, 23).join(' '),  
                DezvoltareERP: sections.slice(24, 31).join(' '),  
                SistemAdaugarePacienti: sections.slice(32, 34).join(' ')  
            },
            SugestiiSuplimentare: sections.slice(35, 43).join(' '),
            PretSiTimpDeImplementare: {
                TimpEstimativDeLivrare: sections[44],
                Preturi: sections.slice(45, 47).join(' ')
            }
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-6');
