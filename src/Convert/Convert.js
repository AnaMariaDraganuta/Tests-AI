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
            ScopulDocumentului: sections.slice(1, 6).join(' '), 
            Definitii: {
                React: sections[7], 
                NestJS: sections[8], 
                Firebase: sections[9], 
                API: sections[10] 
            },
            PropunereStructura: {
                AutentificareGestionareConturi: sections.slice(11, 19).join(' '), 
                GenerareDocumente: sections.slice(20, 27).join(' '), 
                GestionareDocumente: sections.slice(28, 32).join(' '), 
                ExpediereSemnareDigitale: sections.slice(33, 41).join(' ') 
            },
            SugestiiSuplimentare: sections.slice(42, 44).join(' '), 
            PretSiTimpDeImplementare: sections.slice(45, 49).join(' ') 
        },
        TermeniDeAchizitie: {
            Confidentialitate: sections[50], 
            PreturiFaraTVA: sections[51] 
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fisierul a fost convertit si salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-9');
