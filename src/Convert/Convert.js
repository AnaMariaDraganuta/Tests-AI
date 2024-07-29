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
            ScopulDocumentului: sections.slice(2, 10).join(' '),
            Definitii: {
                API: sections.slice(12, 13).join(' '),
                WordPress: sections.slice(14, 15).join(' '),
                Plugin: sections.slice(16, 17).join(' '),
                WooCommerce: sections.slice(18, 19).join(' '),
                Widget: sections.slice(20, 21).join(' '),
                Figma: sections.slice(22, 23).join(' ')
            },
            PropunereStructura: {
                GraficaPersonalizata: sections.slice(26, 31).join(' '),
                ConfigurareLoterie: sections.slice(33, 41).join(' '),
                FlexibilitateControl: sections.slice(43, 48).join(' '),
                NotificariEmail: sections[50],
                WidgeturiLoterii: sections.slice(52, 54).join(' '),
                IntrebariRaspunsuri: sections.slice(56, 58).join(' '),
                InformatiiParticipanti: sections.slice(60, 63).join(' '),
                LegareProcesatorPlati: sections.slice(65, 66).join(' ')
            },
            SugestiiSuplimentare: sections[68],
            PretSiTimpDeImplementare: sections.slice(70, 77).join(' ')
        },
        TermeniDeAchizitie: {
            Confidentialitate: sections[79],
            PreturiFaraTVA: sections[80]
        }
    };

    fs.writeFileSync(jsonFilePath, JSON.stringify(offer, null, 2));

    const flattenedOffer = flattenObject(offer);
    const csv = Papa.unparse([flattenedOffer]);
    fs.writeFileSync(csvFilePath, csv);

    console.log('Fisierul a fost convertit si salvat cu succes!');
};

convertDocxToJSONAndCSV('Test-8');

