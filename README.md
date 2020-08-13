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

## Vereisten

**Hardware**
Een desktop-computer of laptop, voorlopig is er nog geen applicatie voor iPad of Android.

**Platformen**
- Windows 7 of hoger
- macOS 10.10 (Yosemite) of hoger
- Ubuntu 12.04 of hoger, Fedora 21, Debian 8 (andere platformen zijn niet gegarandeerd, maar je kan het zeker uitproberen.)

**Voetnoot**
Stambord wordt gemaakt met Electron, een framework om desktop applicaties te kunnen ontwikkelen met webtechnologieën. Electron maakt hier gebruik van Chromium van Google voor, het systeem waar ook Google Chrome op gebaseerd is.

Een goede vuistregel is dus; Als Chrome op je computer werkt, dan zal Stambord waarschijnlijk ook werken.

## Software gebruiken
| **[Demo](https://stambord.haegepoorters.be/src/)** (wachtwoord: ```stamvader```) | **[Download voor Windows en MacOS](https://github.com/lennertderyck/stambord/releases)** |

> We zijn overgeschakeld van Electron-Forge naar Electron-packager

Stambord is beschikbaar voor Windows en MacOS, maar indien je de app toch zelf wil packagen is dit ook mogelijk.

#### 1. Installatie
- [Download stambord-master.zip](https://github.com/lennertderyck/stambord/archive/master.zip)
- Unzip stambord-master.zip door hier dubbel op te klikken
- Open Commandoprompt
- Controleer of Node.js geïnstalleerd is
  - Plak de volgende code ```node -v``` en druk Enter
  - Als Node.js niet geïnstalleerd is download deze dan via https://nodejs.org/en/
  - Volg de stappen voor de installatie

#### 2. Omzetting
- Sleep de folder stambord-master naar het icoontje van Commandprompt
- Installeer Node packages ```npm install```
- Plak het volgende in de Commandprompt```npm run package```

Er zal in de map die je gedownload hebt een nieuwe folder gemaakt worden dat volgens het volgende patroon genaamd is: "stambord-darwin|win32-x64". Afhankelijk van je besturingsysteem zal er "darwin" (voor Mac) of "win32" staan (voor Windows).

<blockquote>
  <p>Heb je een Windows-versie gemaakt? <a href="mailto:hello@lennertderyck.be?subject=Stambord Windows build">Laat me iets weten!</a></p>
</blockquote>

> 
 
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

Dit project wordt semi-onderhouden, in de zin dat er aan gewerkt wordt wanneer school, werk en de scouts dit toelaten. Bij vragen of fouten in Stambord zijn we uiteraard bereid om ondersteuning te bieden waar mogelijk.

Maak voor problemen een nieuw bug report aan of mail voor hulp naar [mij](mailto:hello@lennertderyck.be?subject=Stambord).
