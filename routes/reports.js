var express = require('express');
var router = express.Router();

/* GET reports. */
router.get('/kmom01', function(req, res, next) {
    const questions = [
        {
            question: "Berätta utförligt om din syn på nodejs backend ramverk och berätta vilket ramverk du valde och varför.",
            answer: "När jag läste igenom listan över backend ramverk på http://nodeframework.com/ hittade jag dels ingen jag kände igen eller uppfattade som populärare än Express. Jag är väldigt van med Express då jag har använt det tidigare i tre kurser. Plus att jag inte har stött på några problem eller brister med ramverket ännu. En stund funderade jag över ifall jag borde testa ett jag inte använt tidigare men jag satsar på att lära mig nya front-end ramverk istället."
        },
        {
            question: "Berätta om din katalogstruktur och hur du organiserade din kod, hur tänkte du?",
            answer: "Jag följde exemplet i guiden https://dbwebb.se/kunskap/nodejs-api-med-express. Då delade jag upp mina routes i egna filer som ligger i en katalog som heter 'routes'. Varje route-fil exporterar en router som används i min app.js. Jag tänkte att jag skulle ha så lite överflödig kod som möjligt, försöka ha det så enkelt som möjligt. Eftersom att det endast var två routes som skulle implementeras i appen."
        },
        {
            question: "Använde du någon form av scaffolding som ditt valda ramverk erbjuder?",
            answer: "Jag skapade endast de filer som skapades i guiden och sedan redigerade jag dem för att de skulle passa uppgiftens krav. Att använda en scaffolding-generator som 'express-generator' kändes överflödigt då min applikation är enkel och stabil, gör det den ska och behöver för tillfället inte mer funktionalitet. I ett tillfälle längre fram kan jag komma att behöva göra om den men inte i detta läge."
        },
        {
            question: "Vad är din TIL för detta kmom?",
            answer: "Ett enkelt sätt för att få en ny domän, webbserver och JSON-api up-and-running. Har man inte gjort sådant tidigare känns det väldigt enkelt något som borde vara komplicerat och dyrt att få hålla på med. Också att drifta en webbserver på en debianmaskin var nyttig lärdom."
        },
        {
            question: "Svårigheter i kursmomentet",
            answer: "Något jag hade problem med var att följa guiden. Det var vissa ställen i guiden som jag inte upplevde att jag hade samma information framför mig som beskrevs i guiden. Detta gjorde att jag antingen fick lov att gissa mig till vad nästa steg skulle vara eller att fråga i gitter-chatten. Jag gjorde det senare ett par gånger eftersom att jag var rädd att göra fel. Mest för att vi jobbade med programvara och tjänster som annars är betaltjänster men som vi har fått tillgång till genom Universitetet. Skulle jag göra något dumt misstag så att jag måste betala eller kontakta support vore dumt och skulle jag inte ha tid med. Annars gick det bra att sätta upp webbservern och arbeta sig igenom uppgiften. Det mesta gick att gissa sig fram till ändå då jag ofta hade rätt i mina aningar. Jag behövde nog bara få mina tankar bekräftade så jag inte tänkte helt fel."
        },

    ];

    res.json({ data: questions });
});

module.exports = router;
