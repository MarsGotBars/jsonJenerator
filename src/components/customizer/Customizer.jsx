import React, { useCallback, useEffect, useState } from "react";
import { useSendProduct } from "hooks/usePost";
import { useOptionContext } from "context/Optioncontext";
import Form from "components/form/Form";
import Title from "components/layout/Title";
export default function Customizer() {
  const { dataSelect, opt, myData } = useOptionContext();
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  const [customData, setCustomData] = myData;

  const [inputValues, setInputValues] = useState({
    naam: "",
    SKUs: "",
    afwerking: "",
    "keukenblad dikte": "",
    prijzen: "",
    gewichten: "",
  });


  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setInputValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    [setInputValues]
  );

  const handleGeneration = (inputValues, inputData) => {
    const variants = [];
    const {
      naam,
      SKUs,
      ["keukenblad dikte"]: keukenbladDikte,
      ...variationData
    } = inputValues;
    // SKU data
    let splitSKU = SKUs.toUpperCase().split(" ");
    let productSKU = splitSKU[0] + "a";
    inputData.sku = productSKU;
    // ! SKU data
    // format thickness
    const splitRegex = /(\d+(?:,\d+)?(?:-\d+(?:,\d+)?)?)\s*(\w+)/g;
    const dikteObj = {};
    let match;
    let index = 0;

    while ((match = splitRegex.exec(keukenbladDikte)) !== null) {
      dikteObj[index] = `${match[1]} ${match[2]}`;
      if (
        dikteObj[index] === "3,2-8,2 cm" ||
        dikteObj[index] === "2,9-7,9 cm"
      ) {
        dikteObj[index] += " opgedikt in verstek";
      } else dikteObj[index] += " massief";
      index++;
    }
    // ! format thickness
    const attributes = inputData.attributes;
    attributes[0].options = dikteObj;
    // attributes and variation generation
    const prijzen = variationData.prijzen.split(" ");
    const gewichten = variationData.gewichten.split(" ");
    const afwerkingen = variationData.afwerking.split(" ");

    // refactor this, as it shouldn't be a loop
    afwerkingen.forEach((afwerking, index) => {
      let variation = {
        attributes: [
          {
            id: 18,
            name: "Keukenblad dikte",
            option: dikteObj[index],
          },
          {
            id: 1,
            name: "Afwerking",
            option: afwerking,
          },
        ],
        sku: splitSKU[index],
        regular_price: prijzen[index],
        weight: gewichten[index],
      };
      variants.push(variation);
    });
    inputData.default_attributes = variants[0]["attributes"];
    inputData.variations = variants;
    // data iteration | Iterate over each key available in variationData
    for (const key in variationData) {
      const uppercaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      // scope current incoming VarData
      let updatedVarData = {};
      // split data
      let data = variationData[key].trim().split(" ");
      // could possibly put variations into here
      for (let j = 0; j < data.length; j++) {
        // create number keys for each instance of data
        updatedVarData[j] = data[j];
      }

      // set attribute specifications
      if (Object.keys(updatedVarData[0]).length != 0) {
        for (const attr in attributes) {
          const number = attributes[attr];
          if (number.name === uppercaseKey) number.options = updatedVarData;
        }
      }
    }
    // ! data iteration
    // lastly format the correct description!
    inputData.description = changeCurrentDescription();
    inputData.slug =
      inputData.name && inputData.name.toLowerCase().split(" ").join("-");
    return inputData;
  };

  const changeCurrentDescription = useCallback(() => {
    const name =
      inputValues.naam.charAt(0).toUpperCase() + inputValues.naam.slice(1);
    switch (selectedOption) {
      case "Dekton":
        return `<h1><strong>Dekton ${name} keramiek keukenblad</strong></h1>
        <a href="https://stonecenter-shop.nl/">StoneCenter</a><strong> fabriceert</strong> naast natuursteen- en composiet- ook <strong>keramische keukenbladen</strong> waaronder het Dekton ${name} keramiek keukenblad. Dekton is een begrip op het gebied van keramiek keukenbladen en heeft zich gespecialiseerd tot een van de beste keramisch leveranciers die er zijn. Met name kwaliteit en hun brede assortiment is het grote voordeel van Dekton.
        
        Naast de toepassing voor Dekton ${name} keramiek keukenbladen, kan het materiaal ook voor velen andere toepassingen gebruikt worden, denk aan: gevels, wanden, vloeren wanden en alle andere bedenkbare toepassingen.
        <h2><strong>Wat is Dekton ${name} keramiek?</strong></h2>
        Een Dekton ${name} keramiek keukenbladen zijn gemaakt van een mix van hoogwaardige grondstoffen om de beste eigenschappen aan het werkblad oppervlak mee te geven. Dekton keramiek is veelzijdig en kan voor verschillende bouwprojecten uw beste keuze zijn. Dekton is beschikbaar in verschillende diktes van 8 mm tot wel 30 mm met een afmeting van 320 x 144 cm, zo is het relatief licht van gewicht waardoor het uitermate geschikt is voor keukens en badkamers ook voor gevels en wanden. Ook voor intensief gebruikte vloeren is Dekton het ideale materiaal.
        <h3><strong>Voordelen van een Dekton ${name} keramiek keukenblad</strong></h3>
        "Dekton bezit diverse opmerkelijke eigenschappen die het tot een uitstekende keuze maken voor keukenbladen. Laten we beginnen met zijn opmerkelijke hittebestendigheid. Zelfs een gloeiendhete pan zal geen thermische schokken veroorzaken, wat betekent dat u zich geen zorgen hoeft te maken over barsten of verkleuringen. In feite kunt u zelfs voedsel direct op het oppervlak bereiden, zonder een snijplank te gebruiken, aangezien Dekton een uitzonderlijke krasbestendigheid biedt, wat krassen voorkomt.
        
        Een andere opvallende eigenschap van Dekton is zijn vlekbestendigheid. Zelfs hardnekkige vlekken zoals wijn, koffie, inkt en roestvlekken vormen geen bedreiging voor dit materiaal. Maar dat is nog niet alles. Dekton heeft ook een extreem lage poreusheid, waardoor het bestand is tegen huishoudelijke chemicaliën zoals bleekmiddel, afvoerreinigers en ovenontvetters, zonder schade te ondervinden.
        
        Wat de structurele sterkte betreft, is Dekton indrukwekkend. Het heeft tot wel vijf keer de buigsterkte van graniet, waardoor het mogelijk is om grotere overspanningen te creëren, zelfs tot 30 cm uitstekend, wat ideaal is voor ruime keukeneilanden. Daarnaast biedt Dekton hoge kleurstabiliteit en is het bestand tegen schadelijke effecten van UV-straling.
        
        Deze uitstekende eigenschappen maken Dekton tot een duurzaam en onderhoudsarm materiaal voor keukenbladen dat jarenlang meegaat, zodat u zich geen zorgen hoeft te maken over het vervangen of intensief onderhouden van uw keukenoppervlak."
        <h3><strong>Inmeten</strong></h3>
        De basis voor een perfect afgewerkt resultaat hangt af van een nauwkeurige technische inmeting. Dit is net zo cruciaal als de eerste steen leggen in een bouwproject. Hoewel inmeten essentieel is, kunnen menselijke fouten niet altijd worden vermeden. Gelukkig kunnen we eventuele fouten snel corrigeren, dankzij onze ruime voorraad. Met behulp van geavanceerde lasermeetinstrumenten kunnen we de meeste situaties ter plaatse inmeten en, indien nodig, zelfs technische tekeningen maken. Op basis van deze metingen of tekeningen worden vloeren en wanden snel opgeleverd, zodat u uw ruimte snel in gebruik kunt nemen.
        <h3><strong>Transport</strong></h3>
        Als u een aannemer hebt ingeschakeld en hij geen tijd heeft om het keramische keukenblad op te halen, geen probleem. StoneCenter beschikt over eigen transportwagens en kan tegen een voordelige prijs leveren. Bovendien kunnen we de levering rechtstreeks bij de klant afhandelen, zonder dat de klant zich hierover zorgen hoeft te maken. Dit efficiënte proces stelt ons in staat om transportkosten te minimaliseren.
        <h3><strong>Wat is Keramiek?</strong></h3>
        Keramiek is evenmin natuursteen maar is uiteraard wel zo hard als steen. Keramiek dat gebruikt kan worden voor keukenbladen worden in platen van variërende diktes geleverd. U kunt zich de plaat wellicht het beste voorstellen als een grote muur- of vloertegel in de vorm van een plaat van 150cm x 320cm en tot 2cm dik maar dan met de juiste eigenschappen die een keukenblad nodig heeft.
        
        Dit keramiek is als materiaal lijkt qua eigenschappen onovertroffen dit in combinatie met het uiterlijk van de mooiste natuursteensoorten die werkelijk niet van echt te onderscheiden is.
        
        Maar ook al zijn de eigenschappen nog zo uitmuntend we kunnen u als natuursteenspecialist toch nog zaken vertellen die u ook behoord te weten. Ja het klinkt haast evident maar laat u een pan van een bepaalde hoogte op het keramieken aanrechtblad vallen dan ontstaat een punt belasting en kan tot een barst leiden. Daarnaast kunt u nog zo vaak een pan of vijzel op het keramieken keukenblad zetten. Beter is het om ook hier onderzetters te gebruiken want uiteindelijk zullen er krassen ontstaan die u overigens op elke keukenblad materiaal te zien zal krijgen.
        <h3><strong>Montage van Dekton keramiek keukenbladen</strong></h3>
        Veel van onze klanten kiezen ervoor om het inmeten, leveren en plaatsen aan ons over te laten, een verstandige keuze. Hierdoor worden alle risico's aan StoneCenter toevertrouwd, en u kunt profiteren van onze deskundige montage. Elk project is uniek en kan variëren in de benodigde tijd. Als u vragen heeft over de montage of overweegt u om zelf te laten monteren, dan staan onze collega's klaar om u van advies te voorzien.
        <h3><strong>Onderhoud van Dekton ${name} keramiek keukenbladen</strong></h3>
        Het onderhoud van Dekton ${name} keramiek keukenbladen is eenvoudig omdat deze keukenbladen vrijwel geen onderhoud vereisen. Er is geen impregnatie of jaarlijks onderhoud nodig. Echter, regelmatige reiniging is echter wel noodzakelijk. StoneCenter biedt de juiste schoonmaakmiddelen voor optimale reiniging. Voor keramische materialen in verschillende ruimtes, zoals de badkamer, bieden we specifieke reinigingsmiddelen aan. Onze <a href="../../keramiek-aanrechtblad-onderhoudsset/">onderhoud set</a> voor keramiek keukenbladen is ideaal voor het verwijderen van kalk en zeepresten in de buurt van de spoelbak.
        
        Voor dagelijkse en wekelijkse reiniging raden we <a href="../../hmk-moeller-stone-care-r157-intensieve-tegelreiniger/">HMK R157</a> aan, dat dagelijkse verontreinigingen en zeepresten verwijdert. In geval van hardnekkige kalkvlekken op je Dekton ${name} keramiek keukenblad, is <a href="../../hmk-moeller-stone-care-r183-snelle-cementsluier-verwijderaar/">HMK R183</a> een effectieve oplossing. Voor professionele reiniging van keramische producten in verschillende kamers, zoals de woonkamer, hal, toilet en keuken, is <a href="../../hmk-moeller-stone-care-r161-porcelanato-grondreiniger/">HMK R161</a> een uitstekende keuze. Voor buitenproducten biedt StoneCenter <a href="../../hmk-moeller-stone-care-r175-serizzio-en-steenreiniger/">HMK R175</a>, dat zelfs de meest hardnekkige vlekken verwijdert, en ook nog eens milieuvriendelijk is.
        
        Heeft u nog vragen over het reinigen van uw Dekton ${name} keramiek keukenblad? Aarzel dan niet om contact op te nemen of langs te komen bij een van onze vestigingen. Onze collega's staan u graag te woord. U kunt onze reinigingsmiddelen ook eenvoudig online bestellen, waardoor u tijd bespaart en ze binnen enkele dagen in huis hebt.
        <h3><strong>Kom langs bij een van onze showrooms</strong></h3>
        Dekton werkbladen vormen samen met StoneCenter de meest ideale combinatie. Wij nemen erg veel af dus vanwege dit gegeven kunnen wij u de beste prijzen offreren.
        
        Maar de prijs hangt ook af van de gewenste opstelling en uiteraard speelt het formaat en de exacte maten een belangrijke rol.
        
        Wilt u zeker zijn dat u de meest scherpe prijs van Nederland zult krijgen. Daarnaast is het goed te realiseren dat de kleur en de impact van de afbeeldingen behoorlijk kunnen verschillen met het echte materiaal waar u de komende decennia naar zult kijken zodra u uw keuken binnenkomt. Alleen om die reden is het de moeite waard om bij ons langs te komen in een van onze showrooms bij u in de buurt.
        
        Wij nodigen u daarom van harte uit een afspraak te maken vul uw eigen datum en wens is en we zullen u dan bevestigen of het mogelijk of met een alternatief komen.
        
        Gebruik in dat geval de knop of “<a href="https://stonecenter-shop.nl/afspraak-maken-met-stonecenter-delft-of-breda/">maak uw afspraak hie</a>r” zodat u niet hoeft te wachten wanneer een klant net voor u is binnenwandelt. Wij nemen dan uitgebreid tijd voor u en u heeft dan ook meteen uw offerte op maat.`;
      case "Neolith":
        return `<h1><strong>Neolith ${name}</strong><strong> Keramiek keukenblad</strong></h1>\n<p>Neolith ${name} Keramiek keukenblad is gemaakt van <a href=\"https://nl.wikipedia.org/wiki/Porselein\">porselein</a>. Waardoor het praktische oplossingen voor uitgebreid projecten aanbied. Het heeft veel verschillende kleuren. Met de bedoeling voor het gebruik in veel toepassingen voor zowel binnen als buiten. Neolith keramiek keukenbladen herkent u aan de bijzondere plaat maat: 3230x1630 en 3230x1530 mm. Deze zijn uit voorraad leverbaar in 6 mm en 12 mm versterkt.</p>\n<h2><strong>Waarom Neolith ${name}</strong><strong> Keramiek Keukenblad</strong></h2>\n<p>StoneCenter maakt Neolith in de vorm van Keukenbladen, vensterbanken, gevelplaten en interieur maatwerken enz. Neolith is 100% anti bacterieel, kras bestendig en waterdicht is. waardoor het voor Keukenblad de meest geschikte grondstof is. Neolith ${name} is makkelijk met onderhoud en reinigen. Tevens is het bestand tegen elke zeer vervuiling en zuren. Neolith heeft de volgende diktes: 6 mm versterkt, 8 mm (5+3 mm) en 12 mm versterkt en zelfs kunnen wij op dikken tot verschillende diktes.</p>\n<p>De minimale dikte van 6 mm zorgt voor lichte eind product waardoor de verwerking uitgebreid wordt. Daarnaast is Neolith ${name} schoon, water dicht en bestand tegen hoge temperaturen en vuur. Het is gemaakt uit uitsluitend milieu vriendelijke grondstoffen en volledig recyclebaar. Het is een zeer duurzaam product.</p>\n<h3><strong>Kenmerken van Neolith ${name} Keramiek Keukenblad</strong></h3>\n<p>Keramiek Keukenbladen hebben vooral veel voordelen dan nadelen. Voordat wij met de voordelen van keramiek beginnen, willen wij eerst de nadelen toelichten. Keramiek is minder bestendig tegen puntbelasting. Dat betekent als het een scherp object hard neerkomt op een keramische oppervlakte, zal deze beschadiging (breuk) veroorzaken.<br />\nWeliswaar de nadelen erg onprettig kan zijn, maar de voordelen van keramiek is haar sterkste kant. Keramiek is erg Sterk.</p>\n<p>Daardoor is het erg bestendig tegen krassen en slijten. Bovendien is deze materiaal niet poreus. Hierdoor is keramisch tegels hygiënisch in de badkamer en zo maakt het makkelijk met schoon maken. Al met al is keramiek zeer vriendelijk in gebruik en onderhoud. Zelfs met lauw water is voor de meeste vervuiling een goede oplossing. Ondanks dat adviseren we de reinigers van StoneCenter, onder het kopje <a href=\"https://stonecenter-shop.nl/product-categorie/natuursteen-onderhoudsmiddelen/\">onderhoud</a> lees je meer hierover. Samengevat zijn Keramische keukenbladen een aanrader voor je keuken en met haar veelzijdige kleuren zorgt het voor een luxe, natuurlijke en Vintage uitstraling.</p>\n<h3><strong>Inmeten</strong></h3>\n<p>De basis van een mooi afgewerkte vloer hang af van technisch en praktisch perfect in gemeten vloer. Het is precies het zelfde als je de eerst steen goed heeft aangelegd. Maar het brengt ook risico met zich mee. Door de vele jaren ervaring is inmeten een vakgebied van StoneCenter geworden. Desondanks kunnen fouten menselijk blijven, maar gelukkig kunnen wij, doordat wij alles op voorraad hebben, snel het foutje herstellen. Met behulp van laser meetinstrumenten, kunnen we de meeste soorten situaties ter plaatse inmeten en desnoods maken we een technische tekening. Door middel van de in meting of de productie tekening worden je vloer of wand snel opgeleverd. Zodoende kun je je huis snel in gebruik nemen.</p>\n<h3><strong>Transport</strong></h3>\n<p>Heb je een aannemer in dienst en hij heeft geen tijd om de Keramiek Keukenbladen op te halen. Geen probleem. Omdat StoneCenter ook haar eigen transport wagens heeft, kunnen we tegen een scherpe prijs voor je leveren. Daarnaast kunnen wij het ook bij klanten lossen zonder dat de klant de moeite neemt. Op deze wijze wordt alle leveringen erg efficiënt. Daardoor kunnen wij ook onze transport kosten naar beneden te drukken. Om de veiligheid in acht te nemen voor onze klanten en onze chauffeurs vragen wij onze klanten om de restante bedragen per mobiele pin apparaat te betalen.</p>\n<h3>Wat is Keramiek?</h3>\n<p>Keramiek is evenmin natuursteen maar is uiteraard wel zo hard als steen. Keramiek dat gebruikt kan worden voor keukenbladen worden in platen van variërende diktes geleverd. U kunt zich de plaat wellicht het beste voorstellen als een grote muur- of vloertegel in de vorm van een plaat van 150cm x 320cm en tot 2cm dik maar dan met de juiste eigenschappen die een keukenblad nodig heeft.</p>\n<p>Dit keramiek is als materiaal lijkt qua eigenschappen onovertroffen dit in combinatie met het uiterlijk van de mooiste natuursteensoorten die werkelijk niet van echt te onderscheiden is.</p>\n<p>Maar ook al zijn de eigenschappen nog zo uitmuntend we kunnen u als natuursteenspecialist toch nog zaken vertellen die u ook behoord te weten. Ja het klinkt haast evident maar laat u een pan van een bepaalde hoogte op het keramieken aanrechtblad vallen dan ontstaat een punt belasting en kan tot een barst leiden. Daarnaast kunt u nog zo vaak een pan of vijzel op het keramieken keukenblad zetten. Beter is het om ook hier onderzetters te gebruiken want uiteindelijk zullen er krassen ontstaan die u overigens op elke keukenblad materiaal te zien zal krijgen.</p>\n<h3><strong>Neolith ${name} monteren</strong></h3>\n<p>Veel van onze klanten kiezen voor inmeten, levering en plaatsen van ons, nou heel verstandig. Hierdoor schuift u alle risico naar StoneCenter. Daarmee profiteert u ook van onze vakkundige montage mogelijkheid. Elke project is verschillend en kan korter of langer duren. Terwijl u onder een genot van een kop koffie aan het kranten lezen bent, monteert onze monteurs zonder u lastig te vallen uw Neolith ${name} Keramiek Keukenbladen. Heeft u vragen hierover en wilt u eventueel zelf monteren. Onze collega’s staan u graag te woord.</p>\n<h3><strong>Onderhoud van Neolith ${name} keramiek keukenblad</strong></h3>\n<p>Onderhoud van Neolith ${name} Keramiek Keukenblad is niet lastig. Omdat Keramiek Keukenbladen geen onderhoud nodig hebben. In dat geval hoef je geen impregnatie of jaarlijkse onderhoud voor te doen. Weliswaar de onderhoud niet nodig is, maar de reiniging moet wel gedaan worden. Hiervoor heeft StoneCenter de geschikte middelen voor de optimale reiniging. De Keramische materiaal in verschillende ruimtes vraagt specifieke middelen voor reiniging. Zoals bij de badkamer. Doordat er in om de spoelbak heen veel gespoeld wordt met water, ontstaat er een laag aan kalk en zeepresten. Hiervoor heeft StoneCenter een onderhoudsset ontwikkeld. Namelijk de <a href=\"http://stonecenter-shop.nl/product/keramiek-aanrechtblad-onderhoudsset/\">keramiek keukenblad onderhoudsset.</a></p>\n<p>Verder voor andere dagelijks en wekelijkse reiniging gebruik je <a href=\"http://stonecenter-shop.nl/product/hmk-r157-intensieve-tegelreiniger/\">HMK R157</a>. Dit reinigt de dagelijks verontreiniging en de zeepresten. Alleen als er hardnekkige kalk op je Neolith ${name} keramiek keukenblad ligt, kan het met <a href=\"http://stonecenter-shop.nl/product/hmk-r163-cementsluier-verwijderaar/\">HMK R163</a> makkelijk schoon gemaakt worden. Door middel van <a href=\"http://stonecenter-shop.nl/product/hmk-r161-porcelanato-grondreiniger/\">HMK R161</a> kun je de keramische producten wat in je woonkamer, hal, toilet en keuken liggen goed en professioneel schoon maken. Voor de reiniging van buiten producten heeft StoneCenter de <a href=\"http://stonecenter-shop.nl/product/hmk-r175-serizzio-en-steenreiniger/\">HMK R175</a> voor je klaar staan. Doordat het de meest hardnekkige vlekken makkelijk verwijderd, is het heel erg geschikt voor de keramische tuintegels. Bovendien is het ook goed voor het milieu.</p>\n<p>Heb je toch vragen over de reiniging van je Neolith ${name} keramiek keukenblad? Neem gerust contact of loop binnen bij een van de vestigingen. Onze collega’s staan je graag te woord. Je kan de reinigers ook online bestellen. Hierdoor bespaar je veel tijd en heb je ze binnen enkele dagen in huis.</p>\n<h3><strong>Keramiek Keukenbladen direct online Offerte aanvragen of toch langs komen bij onze showrooms?</strong></h3>\n<p>Vandaag de dag wordt alles verbetert en internet als communicatie middel wordt alleen maar belangrijker voor iedereen. Hierdoor profiteert StoneCenter van het techniek en maakt haar klanten makkelijk om online offerte te plaatsen.Dat kan simpel met 1 klik op de knop <a href=\"https://stonecenter-shop.nl/offerteaanvraag/\">offerte aanvraag</a>. Wenst u toch een personeel te spreken, dan kunt u het beste bellen met 015-257 49 90 voor Delft en voor Breda 076 - 515 56 69. Daarnaast kun je je gewenste <a href=\"http://stonecenter-shop.nl/contact/\">vestiging</a> bezoeken en daar de Keramiek Keukenbladen ook uitkiezen.</p>\n<p>&nbsp;</p>\n`;
      case "Marazzi":
        return `<h1><strong>Marazzi ${name} keramiek keukenblad</strong></h1>
        <u><a href="https://stonecenternatuursteen.nl/">StoneCenter</a></u> biedt naast natuursteen en composiet ook keramische keukenblad aan zoals Marazzi ${name} keramiek keukenblad. Marazzi is in gebied van keramiek bladen gespecialiseerd tot een van de beste keramische materiaal soorten. Naast gebruik maken van Marazzi ${name} keramiek keukenblad , maken we ook andere producten zoals gevels , wanden en alle andere bedenkbare toepassingen.
        <h2><strong>Wat is Marazzi ${name} keramiek</strong></h2>
        Marazzi ${name} keramiek keukenblad is gemaakt van hoogwaardige mix van grondstoffen die gebruikt worden om glas, materialen in porselein en kwartsoppervlakken te maken. Welke hierdoor zijn mechanische eigenschappen krijgt. Marazzi ${name} keramiek kan in verschillende bouwprojecten uw beste keuze zijn. Deze materiaal is beschikbaar in verschillende diktes van 8 mm tot wel 30 mm en van een afmeting van 320 x 144 cm , zo is het van licht gewicht tot veel ontwerpmogelijkheden. Marazzi ${name} keramiek kan makkelijk in uw Keuken , badkamers, gevels , wanden en in veel belopen vloeren het best ideaal materiaal zijn.
        <h3><strong>Marazzi ${name} keramiek keukenblad voordelen</strong></h3>
        We beginnen met het eerste bijzondere eigenschaap en dat is hittebestendigheid. Denk er aan dat je een kokende pan makkelijk op je keukenblad zet zonder enkel zorgen. Ook denk er aan dat je zonder een snijplank uw voedsel op keukenblad snijdt terwijl u geen krassen krijgt we praten hier dan over hoge krasbestendigheid. Met volgende bijzondere eigenschaap van Marazzi hoeft u niet meer bang zijn tegen hardnekkigste vlekken zoals wijn, koffie , stift en roestvlekken en dat zal weer vlekbestendigheid van Marazzi zijn. Bovendien Marazzi heeft extreem lage poreusheid welke het bestand maakt tegen huishoudelijk chemische stoffen zoals bleekmiddel, afvoerreiniger of ovenontvetters welke geen schade toe kan brengen aan Marazzi. Om helder te maken moeten zeggen dat Marazzi tot wel vijf keer grotere buigsterkte heeft dan graniet en daarom kan het ultracompact over het spanwijdte van een kookeiland met overstekken van maar liefst 30 cm. Naast deze eigenschappen heeft Marazzi hoge kleurstabiliteit en hoge UV bestendigheid .Deze allemaal zorgen voor een keukenblad dat jarenlang meegaat en weinig onderhoud vergt.
        <h3><strong>Inmeten</strong></h3>
        De basis van een mooi afgewerkte resultaat hang af van technisch en praktisch perfect in gemeten project. Het is precies het zelfde als je de eerst steen goed heeft aangelegd. Maar het brengt ook risico met zich mee. Door de vele jaren ervaring is inmeten een vakgebied van StoneCenter geworden. Desondanks kunnen fouten menselijk blijven, maar gelukkig kunnen wij, doordat wij alles op voorraad hebben, snel het foutje herstellen. Met behulp van laser meetinstrumenten, kunnen we de meeste soorten situaties ter plaatse inmeten en desnoods maken we een technische tekening. Door middel van de in meting of de productie tekening worden je vloer of wand snel opgeleverd. Zodoende kun je je huis snel in gebruik nemen.
        <h3><strong>Transport</strong></h3>
        Heb je een aannemer in dienst en hij heeft geen tijd om de Keramiek keukenbladen op te halen. Geen probleem. Omdat StoneCenter ook haar eigen transport wagens heeft, kunnen we tegen een scherpe prijs voor je leveren. Daarnaast kunnen wij het ook bij klanten lossen zonder dat de klant de moeite neemt. Op deze wijze wordt alle leveringen erg efficiënt. Daardoor kunnen wij ook onze transport kosten naar beneden te drukken. Om de veiligheid in acht te nemen voor onze klanten en onze chauffeurs vragen wij onze klanten om de restante bedragen per mobiele pin apparaat te betalen.
        <h3><strong>Marazzi ${name} keramiek keukenblad monteren</strong></h3>
        Veel van onze klanten kiezen voor inmeten, levering en plaatsen van ons, nou heel verstandig. Hierdoor schuift u alle risico naar StoneCenter. Daarmee profiteert u ook van onze vakkundige montage mogelijkheid. Elke project is verschillend en kan korter of langer duren. Terwijl u onder een genot van een kop koffie aan het kranten lezen bent, monteert onze monteurs zonder u lastig te vallen uw Marazzi ${name}  keramiek keukenblad. Heeft u vragen hierover en wilt u eventueel zelf monteren. Onze collega’s staan u graag te woord.
        <h3><strong>Onderhoud van Marazzi ${name} keramiek keukenblad</strong></h3>
        Onderhoud van Marazzi ${name} keramiek keukenblad is niet lastig. Omdat Keramiek Keukenbladen geen onderhoud nodig hebben. In dat geval hoef je geen impregnatie of jaarlijkse onderhoud voor te doen. Weliswaar de onderhoud niet nodig is, maar de reiniging moet wel gedaan worden. Hiervoor heeft StoneCenter de geschikte middelen voor de optimale reiniging. De Keramische materiaal in verschillende ruimtes vraagt specifieke middelen voor reiniging. Zoals bij de badkamer. Doordat er in om de spoelbak heen veel gespoeld wordt met water, ontstaat er een laag aan kalk en zeepresten. Hiervoor heeft StoneCenter een onderhoudsset ontwikkeld. Namelijk de <u><a href="http://stonecenter-shop.nl/product/keramiek-aanrechtblad-onderhoudsset/">keramiek keukenblad onderhoudsset.</a></u>
        
        Verder voor andere dagelijks en wekelijkse reiniging gebruik je <u><a href="http://stonecenter-shop.nl/product/hmk-r157-intensieve-tegelreiniger/">HMK R157</a></u>. Dit reinigt de dagelijks verontreiniging en de zeepresten. Alleen als er hardnekkige kalk op je Marazzi ${name} keramiek keukenblad ligt, kan het met <u><a href="http://stonecenter-shop.nl/product/hmk-r163-cementsluier-verwijderaar/">HMK R163</a></u> makkelijk schoon gemaakt worden. Door middel van <u><a href="http://stonecenter-shop.nl/product/hmk-r161-porcelanato-grondreiniger/">HMK R161</a></u> kun je de keramische producten wat in je woonkamer, hal, toilet en keuken liggen goed en professioneel schoon maken. Voor de reiniging van buiten producten heeft StoneCenter de <u><a href="http://stonecenter-shop.nl/product/hmk-r175-serizzio-en-steenreiniger/">HMK R175</a></u> voor je klaar staan. Doordat het de meest hardnekkige vlekken makkelijk verwijderd, is het heel erg geschikt voor de keramische tuintegels. Bovendien is het ook goed voor het milieu.
        
        Heb je toch vragen over de reiniging van je Marazzi ${name} keramiek keukenblad? Neem gerust contact of loop binnen bij een van de vestigingen. Onze collega’s staan je graag te woord. Je kan de reinigers ook online bestellen. Hierdoor bespaar je veel tijd en heb je ze binnen enkele dagen in huis.
        <h3><strong>Keramiek Keukenbladen direct online Offerte aanvragen of toch langs komen bij onze showrooms?</strong></h3>
        Vandaag de dag wordt alles verbetert en internet als communicatie middel wordt alleen maar belangrijker voor iedereen. Hierdoor profiteert StoneCenter van het techniek en maakt haar klanten makkelijk om online offerte te plaatsen. Dat kan simpel met 1 klik op de knop <u><a href="https://stonecenter-shop.nl/offerteaanvraag/">offerte aanvraag</a></u>. Wenst u toch een personeel te spreken, dan kunt u het beste bellen met 015-257 49 90 voor Delft en voor Breda 076 - 515 56 69. Daarnaast kun je je gewenste <u><a href="http://stonecenter-shop.nl/contact/">vestiging</a></u> bezoeken en daar de Keramiek Keukenbladen ook uitkiezen.`;
      default:
        break;
    }
  }, [inputValues.naam, selectedOption]);

  useEffect(() => {
    changeCurrentDescription();
  }, [inputValues.naam, selectedOption, changeCurrentDescription]);

  const findOccurrences = (str, replacement, toReplace) => {
    const regex = new RegExp(toReplace, "gi");
    return str.replace(regex, () => {
      // Capitalize the first letter of the replacement string
      const capitalizedReplacement =
        replacement.charAt(0).toUpperCase() + replacement.slice(1);
      return capitalizedReplacement;
    });
  };

  const findStrInObj = (obj, name, toReplace) => {
    const updatedObj = { ...obj };
    for (const key in updatedObj) {
      if (typeof updatedObj[key] === "string") {
        updatedObj[key] = findOccurrences(
          updatedObj[key],
          name.trim(),
          toReplace
        );
      } else if (
        typeof updatedObj[key] === "object" &&
        updatedObj[key] !== null
      ) {
        updatedObj[key] = findStrInObj(updatedObj[key], name, toReplace); // Recursively traverse nested objects
      }
    }
    return updatedObj;
  };

  const handleFind = useCallback(
    (inputValues) => {
      const updatedData = findStrInObj(
        selectedData,
        inputValues.naam,
        "Replace-me"
      );
      // Generate custom data
      const customData = handleGeneration(inputValues, updatedData);

      // Update the customData state only once at the end
      setCustomData(customData);
    },
    [selectedData, handleGeneration, findStrInObj, setCustomData]
  );

  useEffect(() => {
    if (selectedOption) {
      handleFind(inputValues);
    }
  }, [inputValues, selectedOption]);
  return (
    <>
      <Title classes={"font-bold text-lg text-center"}>
        Submit your data here
      </Title>
      <Form
        formData={inputValues}
        handleChange={handleChange}
        classes={"flex flex-col items-center gap-6"}
      />
      <div></div>
    </>
  );
}
