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
            "3": sections[3],
            "4": sections[4],
            "5": sections[5],

        },
        Oferta: {
            ScopulDocumentului: {
                Descriere: sections[6],
                Etape: sections.slice(7, 10).join(' '),
                Detalii: sections.slice(10, 16).join(' '),
                Definitii: sections.slice(17, 19).join(' ')
            },
            PropunereStructura: {
            SectiuneDeComenziSiStocuri: sections.slice(21,25),
            SecțiuneDeLivrareSiGestiune: sections.slice(26,29),
            AutomatizareaDocumentelor: sections.slice(30,32),
            GestionareaCashFlow: sections.slice(33,36),
            IntegrareaCuWinMentor: sections.slice(37,39)
            },
            SugestiiSuplimentare: {
                Descriere: sections.slice(40,42)
            },
            PretSiTimpDeImplementare: {
                TimpEstimatDeLivrare: sections.slice(43, 46).join(' '),
                Suplimentar: sections.slice(46, 49).join(' ')
            }
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fișierul a fost convertit și salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-2');
