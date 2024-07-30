# Generare Ofertă pentru Aplicație

Aceasta este o aplicație React care permite generarea automată a ofertelor pe baza cerințelor introduse de utilizator. Aplicația comunică cu un server backend pentru a genera oferta.

## Cuprins

- [Prezentare Generală](#prezentare-generală)
- [Funcționalități](#funcționalități)
- [Tehnologii Utilizate](#tehnologii-utilizate)
- [Utilizare](#utilizare)
- [Structura Proiectului](#structura-proiectului)

## Prezentare Generală

Aplicația permite utilizatorilor să introducă cerințele unui client într-un textarea și să primească o ofertă generată automat prin apăsarea unui buton. Rezultatul este afișat pe ecran, iar orice eroare apărută în procesul de generare a ofertei este de asemenea afișată.

## Funcționalități

- Introducerea cerințelor clientului într-un textarea.
- Trimiterea cerințelor la un server backend pentru procesare.
- Afișarea ofertei generate sau a unui mesaj de eroare.

## Tehnologii Utilizate

- React
- Axios pentru cererile HTTP
- CSS pentru stilizarea componentelor
- Java Script


## Utilizare

1. Deschideți serverul folosind comanda 'node server.js' apoi deschide aplicația în browser la folosind comanda 'npm run dev' într-un terminal.
2. Introduceți cerințele clientului în textarea.
3. Apăsați butonul "Generați Oferta".
4. Așteptați ca oferta generată să fie afișată sau un mesaj de eroare să apară în caz de eșec.

## Structura Proiectului

- `src/App.jsx`: Componenta principală React.
- `src/App.css`: Stilurile CSS pentru aplicație.
- `package.json`: Fișierul de configurare pentru npm și dependențe.
- Folderul cu teste in care sunt introduse folderele cu teste in format Docx , Json și CSV.
- Convert , folderul care contine codul de Java Script cu ajutorul caruia au fost converite testele

