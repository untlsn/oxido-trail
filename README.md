# Simple article generator

Jest to projekt na zadanie rektutacyjne od [Oxido](https://oxido.pl/) napisane w JavaScript\
Kod aplikacji znajduje się w pliku [index.ts](./index.ts)

## Get started
- Dodaj plik .env o podanym szyku:
```yaml
OPEN_AI_KEY: Klucz do api openai
OPEN_AI_MODEL: 
	Model jakiego bedzie uzywało api openai. 
	Domyślnie 'gpt-4o-mini'
```
- Program można odpalić na dwa sposoby:
  - Bun (domyślny)
  - Nodejs

### Bun (pomiń jeżeli preferujesz nodejs)
Bun jest to nowoczesny runtime dla JS i TS, który świetnie sprawdza się w prostym CLI
- Instalacja\
Proces instalacji jest prosty, bo wymaga tylko jednej komędy, co widać na [stronie](https://bun.sh/):
```bash
#Windows:
powershell -c "irm bun.sh/install.ps1 | iex"
```
```bash
#Linux & macOS
curl -fsSL https://bun.sh/install | bash
```
- Dependencje\
Program do działania wygama sdk od openai\
Dodaj flage --production, jeżeli chcesz pominąc depencencje z devmode
```bash
bun install
```
- Uruchamianie
```bash
bun run ./index.ts
```
```bash
# shortcut
bun start
```
```bash
# z podglądem
bun run ./index.ts --with-template
```
```bash
# shortcut z podglądem
bun start:full
```
### NodeJS (pomiń jeżeli preferujesz bun)
NodeJS jest to OG runtime dla JS, jednak nie wspiera TS out of the box
- Instalacja\
Instalacja nodejs jest bardziej skomplikowana i najlepiej odwołać się do [dokumentacji](https://nodejs.org/en/download/package-manager)
- Dependencje\
Program do działania wymaga sdk od openai i dotenv do działania z plikami env\
Dodaj flage --production, jeżeli chcesz pominąc depencencje z devmode
```bash
npm install
```
- Uruchamianie\
Do uruchomienia przez nodejs użyj precompilowanej wersji
```bash
node ./index.js 
```
```bash
# Z podglądem
node ./index.js --with-template 
```

