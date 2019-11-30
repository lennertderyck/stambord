![bar bord banner](https://raw.githubusercontent.com/lennertderyck/bar-board/master/branding/banner.png)

<br>

### [Functies](#functies) | [Software](#software) | [Demo](https://bar-bord.haegepoorters.be/src/) (wachtwoord: ```stamvader```)

---

# Bar Bord
Papieren stamkaarten zijn verleden tijd, hier is Bar Bord! Gebruik Bar Bord om leiding te laten betalen voor drank, snacks, etc.

Oorspronkelijk ontwikkeld om het betaalprobleem op te lossen op m'n [eigen scouts](https://www.google.com/search?q=haegepoorters+destelbergen), nu beschikbaar voor elke vereniging die het betalen van drank, snacks etc. eenvoudig wil doen verlopen.

> Opgelet, deze applicatie is op geen enkele manier verbonden met het internet. Het is dus mogelijk om het te draaien zonder een verbinding, maar er is geen integratie met een betalingsysteem zoals Bancontact. Je dient dus zelf handmatig tegoed toe te voegen als beheerder.

## Functies
- **Items toevoegen** Geef drank, snacks of andere items op die verkocht kunnen worden. Je kan voor elk item een kleur opgeven dat wordt weergegeven bij de oplijsting van de items.
- **Personen toevoegen** Voeg personen toe aan het systeem. Elke persoon krijgt zijn eigen 'rekening'.
- **Verkooprecords** Alles wat verkocht wordt, wordt bijgehoude. Dit maakt het mogelijk om te controleren of iemand te weinig betaald. Men ziet items, de naam van de persoon en de prijs (incl. intrest)
- **Beheer** Items en leiding toevoegen/verwijderen of tegoed toevoegen kan enkel gedaan worden door een beheerder die zich moet aanmelden.
- **Backup** De records, personen en items kunnen bewaard worden in een bestand. Dit bestand kan later terug worden ingeladen om de gegevens te herstellen.

### Roadmap
- Instellen of er items gekocht kunnen worden met een negatief tegoed.
- Instellen hoeveel intrest er gevraagd wordt bij een negatief tegoed.

---

## Software
| **[Demo](https://bar-bord.haegepoorters.be/src/)** (wachtwoord: ```stamvader```) | **[Download voor MacOS](https://github.com/lennertderyck/bar-board/releases)** |

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
