![bar bord banner](https://raw.githubusercontent.com/lennertderyck/bar-board/master/branding/banner.png)

<br>

### [Software](#software) | [Roadmap](#roadmap) | [Help](#problemen-en-hulp) | [Demo](https://bar-bord.haegepoorters.be/src/) (wachtwoord: ```stamvader```)

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

## Roadmap
- Instellen of er items gekocht kunnen worden met een negatief tegoed.
- Instellen hoeveel intrest er gevraagd wordt bij een negatief tegoed.

- Eigen rekeningnummer opgeven
- Eigen spotify-code opgeven

---

### Problemen en hulp
| **[Bug raporteren](https://github.com/lennertderyck/bar-board/issues/new?assignees=&labels=bug&template=bug_report.md&title=)** | **[Suggestie insturen](https://github.com/lennertderyck/bar-board/issues/new?assignees=&labels=enhancement&template=feature_request.md&title=)** |

Maak voor problemen een nieuw bug report aan of mail voor hulp naar [mij](mailto:hello@lennertderyck.be).
