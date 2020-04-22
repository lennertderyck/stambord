![bar bord banner](https://raw.githubusercontent.com/lennertderyck/bar-board/master/branding/banner.png)

<br>

### [Software](#software) | [Roadmap](#roadmap) | [Help](#problemen-en-hulp) | [Demo](https://stambord.haegepoorters.be/src/) (wachtwoord: ```stamvader```)

---
![Node.js CI](https://github.com/lennertderyck/stambord/workflows/Node.js%20CI/badge.svg)
> Een nieuwe versie is onderweg ... [**Lees meer**](#de-volgende-versie-)

## Dependencies
Stambord is gemaakt met webtechnologie en we hebben ervoor gezorgd dat je je geen zorgen hoeft te maken over dependencies. Omdat het de bedoeling is dat je de applicatie offline kan gebruiken is er geen gebruik gemaakt van externe resources die een internetverbinding vereisen.

Stambord werd gemaakt met behulp van ...
- [Bootstrap](https://getbootstrap.com/) – interface
- [Feather](https://feathericons.com/) – Iconen
- [Taffy.js](http://taffydb.com/) – Json database ➡️ [Dexie](https://dexie.org/) – Database
- [Filesaver.js](https://github.com/eligrey/FileSaver.js/) – Backupfunctie

## Software gebruiken
| **[Demo](https://stambord.haegepoorters.be/src/)** (wachtwoord: ```stamvader```) | **[Download voor MacOS](https://github.com/lennertderyck/stambord/releases)** |

Voorlopig is Stambord enkel beschikbaar voor MacOS, maar we zouden deze ook graag uitbrengen voor Windows.<br>
Wil je Bar Bord eenvoudig eigenhandig omzetten als Windows programma? Volg de stappen hieronder:

#### 1. Installatie
- [Download stambord-master.zip](https://github.com/lennertderyck/stambord/archive/master.zip)
- Unzip stambord-master.zip door hier dubbel op te klikken
- Open Commandoprompt
- Controleer of Node.js geïnstalleerd is
  - Plak de volgende code ```node -v``` en druk Enter
  - Als Node.js niet geïnstalleerd is download deze dan via https://nodejs.org/en/
  - Volg de stappen die op het scherm 

#### 2. Omzetting
- Sleep de folder stambord-master naar het icoontje van Commandprompt
- Installeer Node packages ```npm install```
- Plak het volgende in de Commandprompt```npm run package```

Er zal in de map die je gedownload hebt een nieuwe folder gemaakt worden genaamd 'out', klik door in de verschillende mappen, je vind hier dan de applicatie.

> Heb je een Windows-versie gemaakt? [Laat me iets weten!](mailto:hello@lennertderyck.be?subject=Stambord Windows build

## De volgende versie ...

Om de code beheersbaar te houden hebben we de volledige applicatie herschreven.
- localStorage wordt vervangen door indexedDB
- Code wordt opgesplitst in modules
- Er wordt gebruik gemaakt van JavaScript 6
- Invoervelden worden nu aangesproken door API's
en zo zijn er nog veel meer wijzigingen en verbeteringen.

Door gebruik te maken van enkele nieuwe functies van JavaScript (6) is het daarom belangrijk een back-up te maken van de gegevens (tabblad 'Instellingen') alvorens de nieuwe versie te installeren.

Een bijkomend voordeel van deze veranderingen is het makkelijker kunnen implementeren van nieuwe features, de applicatie bevat minder bugs en is stabieler.

Voor nu zijn deze wijzigingen te vinden op de canary-branch. Eens alle huidige functies opnieuw aanwezig zijn zullen de wijzigingen naar de master-branch gepushed worden.

<details>
  <summary>Disclaimer</summary>
  <p>Wij, de ontwikkelaars achter deze applicatie, zijn op geen enkele manier verantwoordelijk voor eventuele problemen die zich voordoen door het het gebruik van deze applicatie.</p>
  <p>Ondanks Stambord met zorg ontwikkeld en getest werd, kunnen er nog steeds bugs in de applicatie zitten. We raden gebruikers aan dat wanneer zij zo problemen ervaren ze onmiddelijk contact met ons opnemen zodat wij zo snel mogelijk hun van een fix kunnen voorzien.</p>
  <p>Wij zijn dan ook niet verantwoordelijk voor verliezen of andere gevolgen door het gebruik van deze applicatie. Deze is dan ook alleen bedoeld voor gebruik door kleine groepen, zoals leiding/monitoren in een jeugdvereniging of een andere niet-professionele omgeving.</p>
  <p>We hopen dat het gebruik van Stambord een positieve ervaring mag zijn.</p>
</details>

---

### Problemen en hulp
| **[Bug raporteren](https://github.com/lennertderyck/stambord/issues/new?assignees=&labels=bug&template=bug_report.md&title=)** | **[Suggestie insturen](https://github.com/lennertderyck/stambord/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)** |

Maak voor problemen een nieuw bug report aan of mail voor hulp naar [mij](mailto:hello@lennertderyck.be?subject=Stambord).
