const express = require('express');
const reports = require('../models/reports');
const router = express.Router();
const jwt = require('jsonwebtoken');

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
        if (err) {
            return res.status(500).json({
                errors: {
                    status: 500,
                    source: "/reports",
                    title: "Database error",
                    detail: err.message
                }
            });
        }

        // Valid token send on the request
        next();
    });
}

router.post("/",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => reports.addReport(res, req.body));



router.get('/:report', (req, res) => reports.getReport(res, req.params.report));
/* GET reports. */
// router.get('/:report', function(req, res, next) {

//     const report = reports.getReport(res, req.params.report);

//     res.json({ data: report });
// });

/* GET reports. */
/*router.get('/kmom01', function(req, res, next) {
    const questions = [
    {
        question: "Vilket JavaScript-ramverk valde du och varför?",
        answer: "Jag valde att använda mig av Vue.js som ramverk. Jag har testat den förut och när vi gick igenom alla ravmerk i uppgiften https://dbwebb.se/kunskap/frontend-ramverk var den ingen annan som verkade lika lockande som Vue. När jag har kollat igenom JavaScript-ramverk vid tidigare tillfällen kändes React och Angular av någon anledning inte lockande och Vue kändes bättre på grund av tydlig dokumentation och att det verkade lätt att börja arbeta med det."
    },
    {
        question: "Hur gick det att sedan implementera din me-sida i ramverket?",
        answer: "Det gick väldigt enkelt. Jag utgick från scaffoldingen jag fick via cli-vue kommandot: vue create och anpassade det till uppgiften. Applikationen var också väldigt enkel så det var inte mycket som behövde anpassas. Routern behövde jag knappt ändra på men komponenterna för me-sidan och redovisningstexterna hade jag ingen aning om hur jag skulle anpassa till uppgiften. Jag kollade på koden för me-sidan med vue: https://github.com/emilfolino/me-vue/ och granskade upplägget som används där. Min katalogstruktur som scaffoldades fram ser lite annorlunda ut än repot men att implementera koden från repots komponenter gick smärtfritt och jag behövde bara ändra adressen för fetch:en för att det skulle fungera för mig och jag såg ingen anledning till att ändra för mycket i den koden."
    },
    {
        question: "Vilka fördelar ser du med ett JavaScript ramverk jämfört med vanilla JavaScript?",
        answer: "Alla färdiga moduler och bibliotek som kommer med ramverken samt det smidiga sättet att sätta upp en fungerande sida på några sekunder är några fördelar jag kommer på direkt. Sedan finns det många funktioner i just Vue.js som ifall man hade gjort dem själv från grunden skulle komplicera applikationens kod och ta väldigt lång tid skulle jag gissa. Det är mycket jag inte behöver tänka på med ett ramverk och jag har tid över att lägga krut på annat på applikationen när ramverket löser routing, fetching, inläsning av data till element o.s.v."
    },
    {
        question: "Vilka lärdomar gjorde du dig när du implementerade autentisering med JWT på servern?",
        answer: "Det gick bra att implementera JWT på servern och jag stötte inte på några stora fallgropar. Jag följde guiden till punkt och pricka och det fungerade förutom att jag hade problem med att installera bcrypt till en början. Eftersom att jag inte hade python installerat fick jag märkliga felmeddelanden när jag körde npm install bcrypt. Men efter att jag installerade python och uppdaterade npm fungerade det. Så jag lärde mig att det är väldigt viktigt att alltid kolla dependencies för program man installerar. Även om det är program som man förväntar sig ska installera dependencies åt en. Och det är en annan lärdom, förvänta dig inte att npm eller någonting liknande ska ta hand om allting åt dig."
    },
    {
        question: "Vad är din TIL för detta kmom?",
        answer: "Vue är ett intressant ramverk och jag ser fram emot att lära mig mer om det. Fastän jag endast har fått en snabb insyn i arbetssättet känns det bra och jag är självsäker i att det kommer att gå bra."
    },
]
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
});*/

module.exports = router;
