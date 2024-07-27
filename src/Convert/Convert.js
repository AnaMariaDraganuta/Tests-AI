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
            "1": sections[1],
            "2": sections[2],
            "3": sections[3]
        },
        Oferta: {
            ScopulDocumentului: {
                Descriere: sections[4],
                Etape: sections.slice(5, 8).join(' '),
                Detalii: sections.slice(8, 13).join(' '),
                Definitii: sections.slice(13, 26).join(' ')
            },
            PropunereStructura: {
                Structuri: sections.slice(27, 53).join(' ')
            },
            SugestiiSuplimentare: {
                Descriere: sections[54]
            },
            PretSiTimpDeImplementare: {
                FaraSugestii: sections.slice(56, 58).join(' '),
                TimpEstimatDeLivrare: sections.slice(59, 61).join(' '),
                Suplimentar: sections.slice(61, 63).join(' ')
            },
            TermeniDeAchizitie: sections.slice(64).join(' ')
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-1');
