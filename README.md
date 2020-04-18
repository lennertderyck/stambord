![bar bord banner](https://raw.githubusercontent.com/lennertderyck/stam-bord/master/branding/BANNER_BARBORD_SMALL_Tekengebied%201%20kopie%202.png)

<br>

### [Software](#software) | [Roadmap](#roadmap) | [Help](#problemen-en-hulp) | [Demo](https://bar-bord.haegepoorters.be/src/) (wachtwoord: ```stamvader```)

---

## Dependencies
Stambord is gemaakt met webtechnologie en we hebben ervoor gezorgd dat je je geen zorgen hoeft te maken over dependencies. Omdat het de bedoeling is dat je de applicatie offline kan gebruiken is er geen gebruik gemaakt van externe resources.

Stambord werd gemaakt met behulp van ...
- [Bootstrap](https://getbootstrap.com/) – interface
- [Feather](https://feathericons.com/) – Iconen
- [Taffy.js](http://taffydb.com/) – Json database ➡️ [Dexie](https://dexie.org/) – Database
- [Filesaver.js](https://github.com/eligrey/FileSaver.js/) – Backupfunctie

## Software
| **[Demo](https://bar-bord.haegepoorters.be/src/)** (wachtwoord: ```stamvader```) | **[Download voor MacOS](https://github.com/lennertderyck/stambord/releases)** |

Voorlopig is Stambord enkel beschikbaar voor MacOS, maar we zouden deze ook graag uitbrengen voor Windows.<br>
Wil je Bar Bord eigenhandig omzetten als Windows programma? Volg de stappen hieronder:

#### 1. Installatie
- [Download stambord-master.zip](https://github.com/lennertderyck/stambord/archive/master.zip)
- Unzip stambord-master.zip door hier dubbel op te klikken
- Controleer of Node.js geïnstalleerd is
  - Open Commandoprompt, plak de volgende code ```node -v``` en druk Enter
  - Als Node.js niet geïnstalleerd is download deze dan via https://nodejs.org/en/
  - Volg de stappen die op het scherm 
- Installeer Node packages ```npm install```
- Installeer Electron Forge ```npm i -g @electron-forge/cli```

#### 2. Omzetting
- Sleep de folder stambord-master naar het icoontje van command prompt
- Plak het volgende in de commandprompt ```electron-forge make```

Er zal in de map die je gedownload hebt een nieuwe folder gemaakt worden genaamd 'Out', hier vind je de nieuwe applicatie in.

## Roadmap
- Instellen of er items gekocht kunnen worden met een negatief tegoed.
- Instellen hoeveel intrest er gevraagd wordt bij een negatief tegoed.
- Eigen rekeningnummer opgeven

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

---

### Problemen en hulp
| **[Bug raporteren](https://github.com/lennertderyck/stambord/issues/new?assignees=&labels=bug&template=bug_report.md&title=)** | **[Suggestie insturen](https://github.com/lennertderyck/stambord/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)** |

Maak voor problemen een nieuw bug report aan of mail voor hulp naar [mij](mailto:hello@lennertderyck.be?subject=Stambord).
