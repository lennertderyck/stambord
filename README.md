![bar bord banner](https://raw.githubusercontent.com/lennertderyck/bar-board/master/branding/banner.png)

### | [Functies](#functies) | [Software](#software) | [Demo](https://bar-bord.haegepoorters.be/src/) |

---

# Bar Bord
Papieren stamkaarten zijn verleden tijd, hier is Bar Bord! Gebruik Bar Bord om leiding te laten betalen voor drank, snacks, etc.

## Functies
#### Voeg items toe
Maak een lijst aan van items die verkocht kunnen worden, geef een naam, prijs en kleurtag voor elk item op.

#### Maak leiding aan
Voeg namen van leiding toe en een bedrag dat deze persoon bij het aanmaken als tegoed overgemaakt heeft.

#### Itemkeuze
De personen worden opgelijst, hier kan iemand zijn naam uit kiezen. Daarna wordt een hoeveelheid gekozen en het item die ze willen kopen.
De items die gekozen worden hebben worden in het kleur getoond dat werd opgegeven wanneer het item aangemaakt werkt.

#### Records
Elk item dat gekocht wordt, wordt bewaard en is te controleren.

#### Beheer
Enkel stamleiding kan leiding en drank beheren, en tegoed toevoegen.

#### Backup
Alle gegevens kunnen geexporteerd worden als backup indien gegevens verloren raken.

---

## Software
| **[Demo](https://bar-bord.haegepoorters.be/src/)** (wachtwoord: ```baarmoeder```) | **[Download voor MacOS](https://github.com/lennertderyck/bar-board/releases)** |

Voorlopig is Bar Bord enkel beschikbaar voor MacOS, maar we zouden deze ook graag uitbrengen voor Windows.<br>
Wil je Bar Bord eigenhandig omzetten als Windows programma? Volg de stappen hieronder:

#### 1. Installatie
- [Download bar-board-master.zip](https://github.com/lennertderyck/bar-board/archive/master.zip)
- Unzip bar-board-master.zip door hier dubbel op te klikken
- Controleer of Node.js geïnstalleerd is
  - Open Commandoprompt, plak de volgende code ```node -v``` en druk Enter
  - Als Node.js niet geïnstalleerd is download deze dan via https://nodejs.org/en/
  - Volg de stappen die op het scherm 
- Installeer NPM ```npm install npm@latest -g```
- Installeer Electron Forge ```npm i -g @electron-forge/cli```

#### 2. Omzetting
- Sleep de folder bar-board-master naar het icoontje van command prompt
- Plak het volgende in de commandprompt ```electron-forge make```

Er zal in de map die je gedownload hebt een nieuwe folder gemaakt worden genaamd 'Out', hier vind je de nieuwe applicatie in.

---

### Problemen en hulp
| **[Bug raporteren](https://github.com/lennertderyck/bar-board/issues/new?assignees=&labels=bug&template=bug_report.md&title=)** | **[Suggestie insturen](https://github.com/lennertderyck/bar-board/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)** |

Maak voor problemen een nieuw bug report aan of mail voor hulp naar [mij](mailto:hello@lennertderyck.be).
