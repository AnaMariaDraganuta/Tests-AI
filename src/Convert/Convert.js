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
        SolicitareaClientului: sections[0],
        Oferta: {
            ScopulDocumentului: sections.slice(1, 4).join(' '),  
            CăutareSiSincronizare: sections.slice(6, 8).join(' '),
            IntegrareCalendar: sections[9]
        },
        ScopulDocumentului: {
            Introducere:  sections[11],
            Etape: sections.slice(12, 15).join(' '),  
            Suplimentar :sections.slice(15, 20).join(' '),
            Definitii:{
                React: sections[22],
                Ionic: sections[24],
                NestJS: sections[26],
                Firebase: sections[28],
                MongoDB: sections[30],
                API: sections[32]
            }

        },
        DezvoltareDeBaza: {
           Nota: sections[34],
            Functionalitati: sections.slice(35, 71)  
        },
        SugestiiSuplimentare: {
            Nota: sections[72],
            Functionalitati: sections.slice(73, 79) 
        },
        PretSiTimpDeImplementare: {
            Descriere :sections.slice(80, 82),
            TimpEstimatDeLivrare: sections.slice(83, 85),  
            Suplimentar: sections.slice(85, 87),
        },
        Echipa: sections.slice(89, 91),
     
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);

    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-16');
