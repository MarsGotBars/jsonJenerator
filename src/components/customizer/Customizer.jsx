import React, { useEffect, useState } from "react";
import { useOptionContext } from "../../context/Optioncontext";
export default function Customizer() {
  const { dataSelect, opt } = useOptionContext();
  const [selectedOption] = opt;
  const [selectedData] = dataSelect;
  const [description, setDescription] = useState("");
  const [currentSku, setCurrentSku] = useState({
    productSKU: "",
    variations: [],
  });
  const [currentTxt, setCurrentTxt] = useState({
    naam: "",
    slug: "",
  });
  const [inputValues, setInputValues] = useState({
    naam: "",
    SKUs: "",
    afwerkingen: "",
    diktes: "",
    prijzen: "",
    gewichten: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleData = (inputValues) => {
    // destructure to save myself time
    const { naam, SKUs, afwerkingen, diktes, prijzen, gewichten } = inputValues;

    // format the name
    const slugName =
      naam.length > 0 ? naam.split(" ").join("-").toLowerCase() : naam;
    setCurrentTxt({
      naam: naam,
      slug: slugName,
    });

    // format the sku for the product + all variations
    let productSKU;
    let splitSKU = SKUs.split(" ");
    if (splitSKU instanceof Array && splitSKU.length > 1) {
      productSKU = splitSKU[0].toUpperCase() + "a";
    } else {
      console.warn("single!");
      return;
    }
    setCurrentSku({
      productSKU: productSKU,
      variations: splitSKU,
    });
    if (afwerkingen) {
      
    }
  };
  console.log(currentSku);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("name", inputValues.naam);
    console.log("sku", inputValues.SKUs);
    handleData(inputValues);
  };

  const format = () => {
    switch (selectedOption) {
      case "dekton":
        setDescription(`<h1><strong>Dekton x keramiek keukenbladen</strong></h1>
                <a href="https://stonecenter-shop.nl/">StoneCenter</a><strong> fabriceert</strong> naast natuursteen- en composiet- ook <strong>keramische keukenbladen</strong> waaronder het Dekton Vigil keramiek keukenblad. Dekton is een begrip op het gebied van keramiek keukenbladen en heeft zich gespecialiseerd tot een van de beste keramisch leveranciers die er zijn. Met name kwaliteit en hun brede assortiment is het grote voordeel van Dekton.
                
                Naast de toepassing voor Dekton Vigil keramiek keukenbladen, kan het materiaal ook voor velen andere toepassingen gebruikt worden, denk aan: gevels, wanden, vloeren wanden en alle andere bedenkbare toepassingen.
                <h2><strong>Wat is Dekton Vigil keramiek?</strong></h2>
                Een Dekton Vigil keramiek keukenbladen zijn gemaakt van een mix van hoogwaardige grondstoffen om de beste eigenschappen aan het werkblad oppervlak mee te geven. Dekton keramiek is veelzijdig en kan voor verschillende bouwprojecten uw beste keuze zijn. Dekton is beschikbaar in verschillende diktes van 8 mm tot wel 30 mm met een afmeting van 320 x 144 cm, zo is het relatief licht van gewicht waardoor het uitermate geschikt is voor keukens en badkamers ook voor gevels en wanden. Ook voor intensief gebruikte vloeren is Dekton het ideale materiaal.
                <h3><strong>Voordelen van een Dekton Vigil keramiek keukenblad</strong></h3>
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
                <h3><strong>Onderhoud van Dekton Vigil keramiek keukenbladen</strong></h3>
                Het onderhoud van Dekton Vigil keramiek keukenbladen is eenvoudig omdat deze keukenbladen vrijwel geen onderhoud vereisen. Er is geen impregnatie of jaarlijks onderhoud nodig. Echter, regelmatige reiniging is echter wel noodzakelijk. StoneCenter biedt de juiste schoonmaakmiddelen voor optimale reiniging. Voor keramische materialen in verschillende ruimtes, zoals de badkamer, bieden we specifieke reinigingsmiddelen aan. Onze <a href="../../keramiek-aanrechtblad-onderhoudsset/">onderhoud set</a> voor keramiek keukenbladen is ideaal voor het verwijderen van kalk en zeepresten in de buurt van de spoelbak.
                
                Voor dagelijkse en wekelijkse reiniging raden we <a href="../../hmk-moeller-stone-care-r157-intensieve-tegelreiniger/">HMK R157</a> aan, dat dagelijkse verontreinigingen en zeepresten verwijdert. In geval van hardnekkige kalkvlekken op je Dekton Vigil keramiek keukenblad, is <a href="../../hmk-moeller-stone-care-r183-snelle-cementsluier-verwijderaar/">HMK R183</a> een effectieve oplossing. Voor professionele reiniging van keramische producten in verschillende kamers, zoals de woonkamer, hal, toilet en keuken, is <a href="../../hmk-moeller-stone-care-r161-porcelanato-grondreiniger/">HMK R161</a> een uitstekende keuze. Voor buitenproducten biedt StoneCenter <a href="../../hmk-moeller-stone-care-r175-serizzio-en-steenreiniger/">HMK R175</a>, dat zelfs de meest hardnekkige vlekken verwijdert, en ook nog eens milieuvriendelijk is.
                
                Heeft u nog vragen over het reinigen van uw Dekton Vigil keramiek keukenblad? Aarzel dan niet om contact op te nemen of langs te komen bij een van onze vestigingen. Onze collega's staan u graag te woord. U kunt onze reinigingsmiddelen ook eenvoudig online bestellen, waardoor u tijd bespaart en ze binnen enkele dagen in huis hebt.
                <h3><strong>Kom langs bij een van onze showrooms</strong></h3>
                Dekton werkbladen vormen samen met StoneCenter de meest ideale combinatie. Wij nemen erg veel af dus vanwege dit gegeven kunnen wij u de beste prijzen offreren.
                
                Maar de prijs hangt ook af van de gewenste opstelling en uiteraard speelt het formaat en de exacte maten een belangrijke rol.
                
                Wilt u zeker zijn dat u de meest scherpe prijs van Nederland zult krijgen. Daarnaast is het goed te realiseren dat de kleur en de impact van de afbeeldingen behoorlijk kunnen verschillen met het echte materiaal waar u de komende decennia naar zult kijken zodra u uw keuken binnenkomt. Alleen om die reden is het de moeite waard om bij ons langs te komen in een van onze showrooms bij u in de buurt.
                
                Wij nodigen u daarom van harte uit een afspraak te maken vul uw eigen datum en wens is en we zullen u dan bevestigen of het mogelijk of met een alternatief komen.
                
                Gebruik in dat geval de knop of “<a href="https://stonecenter-shop.nl/afspraak-maken-met-stonecenter-delft-of-breda/">maak uw afspraak hie</a>r” zodat u niet hoeft te wachten wanneer een klant net voor u is binnenwandelt. Wij nemen dan uitgebreid tijd voor u en u heeft dan ook meteen uw offerte op maat.`);
        break;

      default:
        break;
    }
  };
  useEffect(() => {
    format();
  }, [selectedOption]);
  return (
    <>
      <h2 className="font-bold text-lg text-center">
        Submit your necessary data here
      </h2>
      <form className="flex flex-col items-center gap-6">
        <div className="grid grid-cols-2 gap-2 w-full">
          <div>
            <label htmlFor="naam">Naam</label>
            <input
              onChange={handleChange}
              type="text"
              name="naam"
              value={inputValues.naam}
              placeholder="naam"
            />
          </div>
          <div>
            <label htmlFor="SKUs">SKU's</label>
            <input
              onChange={handleChange}
              type="text"
              name="SKUs"
              value={inputValues.SKUs}
              placeholder="SKUs"
            />
          </div>
          <div>
            <label htmlFor="afwerkingen">afwerkingen</label>
            <input
              onChange={handleChange}
              type="text"
              name="afwerkingen"
              value={inputValues.afwerkingen}
              placeholder="afwerkingen"
            />
          </div>
          <div>
            <label htmlFor="diktes">diktes</label>
            <input
              onChange={handleChange}
              type="text"
              name="diktes"
              value={inputValues.diktes}
              placeholder="diktes"
            />
          </div>
          <div>
            <label htmlFor="prijzen">prijzen</label>
            <input
              onChange={handleChange}
              type="text"
              name="prijzen"
              value={inputValues.prijzen}
              placeholder="prijzen"
            />
          </div>
          <div>
            <label htmlFor="gewichten">gewichten</label>
            <input
              onChange={handleChange}
              type="text"
              name="gewichten"
              value={inputValues.gewichten}
              placeholder="gewichten"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className=" bg-slate-700 rounded-md w-1/2 h-10 hover:bg-slate-100 hover:text-black duration-200"
        >
          Submit
        </button>
      </form>
    </>
  );
}
