# Izmene master rada — Predlog 4 i Predlog 6

Dokument sadrži tekst spreman za copy-paste u Word. Zamenjuje poglavlje 6 (Testiranje → Deployovanje), dodaje 4.9, ažurira sadržaj, uvod 1.4/1.5 i ispravke u ostatku rada.

---

## AŽURIRANI SADRŽAJ

```
1.  Uvod
    1.1  Predmet i cilj rada
    1.2  Značaj digitalizacije zdravstvenih sistema
    1.3  Problem tradicionalnog zakazivanja pregleda
    1.4  Metodologija izrade rada
    1.5  Struktura rada
2.  TEORIJSKE OSNOVE
    2.1  Web aplikacije
    2.2  React biblioteka
    2.3  Next.js framework
    2.4  Tailwind CSS
    2.5  Sistemi za zakazivanje pregleda
    2.6  Administratorski paneli
3.  ANALIZA I ZAHTEVI SISTEMA
    3.1  Analiza problema
    3.2  Ciljevi sistema
    3.3  Funkcionalni zahtevi sistema
    3.4  Nefunkcionalni zahtevi sistema
    3.5  Korisničke uloge
    3.6  Tok korišćenja sistema
4.  PROJEKTOVANJE SISTEMA
    4.1  Arhitektura sistema
    4.2  Organizacija projekta
    4.3  Komponentna arhitektura
    4.4  Model podataka
    4.5  Projektovanje korisničkog interfejsa
    4.6  Projektovanje administratorskog panela
    4.7  SEO optimizacija i metadata
    4.8  Obrada grešaka i fallback stranice
    4.9  Projektovanje bezbednosti sistema          ← NOVO
5.  IMPLEMENTACIJA SISTEMA
    5.1  Implementacija frontend dela
    5.2  Implementacija backend logike
    5.3  Implementacija autentifikacije i zaštite sistema
    5.4  Implementacija sistema zakazivanja
    5.5  Implementacija administratorskog panela
    5.6  Implementacija email sistema
    5.7  Implementacija validacije
    5.8  Implementacija toast notifikacija
    5.9  Implementacija UI/UX poboljšanja
6.  DEPLOVOVANJE I KONFIGURACIJA SISTEMA          ← ZAMENA (bivše Testiranje)
    6.1  Razvojno okruženje
    6.2  Struktura konfiguracionih fajlova
    6.3  Pokretanje aplikacije
    6.4  Bezbednost osetljivih podataka
7.  MOGUĆA BUDUĆA UNAPREĐENJA
8.  ZAKLJUČAK
9.  LITERATURA
Prilozi
```

---

## 1.4 Metodologija izrade rada — ZAMENITI POSLEDNJI PASUS

**Umesto:**
> Proces izrade sistema obuhvatio je nekoliko faza: analizu problema i zahteva sistema, projektovanje arhitekture aplikacije, implementaciju funkcionalnosti, testiranje sistema i evaluaciju rezultata.

**Stavi:**
> Proces izrade sistema obuhvatio je nekoliko faza: analizu problema i zahteva sistema, projektovanje arhitekture aplikacije, implementaciju funkcionalnosti, konfiguraciju i pokretanje aplikacije u razvojnom okruženju, kao i evaluaciju realizovanih funkcionalnosti kroz praktičnu demonstraciju rada sistema.

---

## 1.5 Struktura rada — ZAMENITI POSLEDNJA DVA PASUSA

**Umesto:**
> Šesto poglavlje obuhvata testiranje funkcionalnosti sistema, validaciju podataka, testiranje sigurnosti i responsive dizajna.

**Stavi:**
> Šesto poglavlje opisuje deployovanje i konfiguraciju sistema, uključujući razvojno okruženje, strukturu konfiguracionih fajlova, način pokretanja aplikacije i zaštitu osetljivih podataka.

**Dodati u opis poglavlja 4:**
> U okviru poglavlja 4.9 prikazano je projektovanje bezbednosti sistema, uključujući autentifikaciju administratora, sesije, middleware zaštitu i bezbedno skladištenje kredencijala.

---

## 4.9 Projektovanje bezbednosti sistema — NOVO POGAVLJE

*(Umetnuti posle 4.8, pre poglavlja 5)*

Bezbednost sistema predstavlja jedan od ključnih aspekata razvoja web aplikacija, posebno u sistemima koji upravljaju podacima o terminima i korisnicima. U okviru projekta MediTime bezbednost je projektovana kroz više slojeva zaštite administratorskog dela aplikacije, dok javni deo ostaje dostupan bez autentifikacije.

### Autentifikacija administratora

Pristup administratorskom panelu omogućen je isključivo nakon uspešne prijave putem login forme. Kredencijali administratora (email i lozinka) čuvaju se u `.env.local` fajlu i ne hardkoduju se u izvornom kodu aplikacije. Nakon uspešne provere, sistem generiše HMAC-SHA256 sesijski token pomoću tajne vrednosti (`ADMIN_SECRET`) i čuva ga u httpOnly kolačiću.

### Zaštita sesije

Sesijski token implementiran je u modulu `lib/session.js`, dok se ime kolačića definiše kao `meditime_admin_session`. Kolačić je konfigurisan sa sledećim parametrima:

- **httpOnly** — sprečava pristup tokenu iz JavaScript koda u pregledaču,
- **secure** — u produkcionom okruženju omogućava slanje isključivo preko HTTPS protokola,
- **sameSite: lax** — smanjuje rizik od CSRF napada,
- **maxAge** — ograničava trajanje sesije (8 sati).

Odjava administratora realizovana je brisanjem kolačića postavljanjem `maxAge: 0`.

### Middleware zaštita ruta

Administratorske rute (`/admin/*`) zaštićene su middleware mehanizmom definisanim u `middleware.js`. Pre prikaza bilo koje admin stranice middleware:

1. čita sesijski token iz kolačića,
2. generiše očekivani HMAC token,
3. upoređuje vrednosti,
4. preusmerava neautentifikovane korisnike na `/admin/login`.

Middleware se ne primenjuje na javne rute (`/`, `/doctors`, `/appointments` itd.), čime pacijenti mogu slobodno koristiti sistem bez prijave.

### Zaštita podataka i konfiguracije

Osetljivi podaci (admin kredencijali, SMTP pristup, tajna za sesiju) skladište se isključivo u `.env.local` fajlu koji nije deo repozitorijuma. Fajl `.env.local` treba dodati u `.gitignore` kako bi se sprečilo slučajno objavljivanje tajni.

### SEO i indeksiranje admin dela

Fajl `robots.txt` eksplicitno isključuje administratorske rute iz indeksiranja (`Disallow: /admin/`), čime se smanjuje vidljivost admin panela u internet pretraživačima.

### Serverska validacija

Kao dodatni sigurnosni sloj, sva kritična poslovna logika (zakazivanje, potvrda termina, upravljanje lekarima) izvršava se na serverskoj strani kroz Server Actions. Klijentska HTML5 validacija služi za poboljšanje korisničkog iskustva, ali ne predstavlja primarni sigurnosni mehanizam.

Implementacija bezbednosti opisana je detaljnije u poglavlju 5.3, dok je konfiguracija osetljivih podataka u razvojnom okruženju prikazana u poglavlju 6.4.

**Prilog (opciono):** dijagram toka autentifikacije (Login → Token → Cookie → Middleware → Admin panel).

---

## 5.3 — DODATI NA POČETAK (1 pasus)

> Detaljno projektovanje bezbednosnih mehanizama prikazano je u poglavlju 4.9. U nastavku su opisane konkretne implementacije autentifikacije i middleware zaštite u kodu aplikacije.

---

## ISPRAVKA — Slika 14 duplikat

U poglavlju 5.3 promeniti naslov slike:

- **Slika 14** — ostaje za Server Action (`5.2`)
- **Slika 15** — middleware zaštita (`5.3`) — pa renumerisati sve sledeće slike +1

Trenutno imaš dve „Slike 14“. Preporučena numeracija od 5.3 nadalje:

| Stara | Nova |
|-------|------|
| Slika 14 (middleware) | **Slika 15** |
| Slika 15 (forma) | **Slika 16** |
| Slika 16 (success) | **Slika 17** |
| Slika 17 (admin termini) | **Slika 18** |
| Slika 18 (email) | **Slika 19** |
| Slika 19 (validacija) | **Slika 20** |
| Slika 20–22 (toast, UX) | **Slika 21–23** |

---

## ISPRAVKA — 4.4 Model podataka (statusi)

**Umesto:**
```
• pending - zakazan,
• confirmed - potvrđen,
• rejected - odbijen,
• cancelled - otkazan.
```

**Stavi:**
```
• pending — na čekanju (zahtev poslat, čeka odobrenje administratora),
• confirmed — potvrđen (administrator je odobrio termin),
• rejected — odbijen,
• cancelled — otkazan.
```

---

## ISPRAVKA — 4.5 UI/UX

**Ukloniti:**
> automatski scroll na vrh stranice

**Stavi:**
> automatsko osvežavanje prikaza nakon izmena u admin panelu (`revalidatePath`)

---

## ISPRAVKA — Obriši placeholdere

Obriši sve rečenice tipa:
> „U ovom delu rada potrebno je dodati...“

Slike su već ubačene u rad.

---

## 6. DEPLOVOVANJE I KONFIGURACIJA SISTEMA — NOVO POGAVLJE

*(Zamenjuje celo poglavlje 6 TESTIRANJE SISTEMA — obriši 6.1 do 6.6)*

Nakon implementacije funkcionalnosti, aplikacija MediTime pokreće se u lokalnom razvojnom okruženju. Iako produkciono deployovanje na hosting platformu (npr. Vercel) nije bilo predmet ovog rada, neophodno je obezbediti ispravnu konfiguraciju okruženja i zaštitu osetljivih podataka kako bi sistem radio stabilno i bezbedno.

### 6.1 Razvojno okruženje

Aplikacija MediTime razvijena je korišćenjem sledećeg softverskog okruženja:

| Komponenta | Verzija / alat |
|------------|----------------|
| Node.js | v18 ili noviji |
| npm | upravljanje paketima |
| Next.js | 16.x |
| React | 19.x |
| Tailwind CSS | 4.x |
| Editor | Visual Studio Code / Cursor |

Instalacija zavisnosti projekta vrši se komandom:

```
npm install
```

Projekat koristi App Router arhitekturu Next.js framework-a i ne zahteva poseban backend server — frontend i backend logika objedinjeni su u jednom projektu.

### 6.2 Struktura konfiguracionih fajlova

Konfiguracija aplikacije zasniva se na sledećim fajlovima:

**`.env.local`** — sadrži osetljive podatke koji se ne commit-uju u repozitorijum:

| Promenljiva | Namena |
|-------------|--------|
| `ADMIN_EMAIL` | Email administratora |
| `ADMIN_PASSWORD` | Lozinka administratora |
| `ADMIN_SECRET` | Tajna za generisanje HMAC sesijskog tokena |
| `EMAIL_HOST` | SMTP server (npr. smtp.gmail.com) |
| `EMAIL_PORT` | SMTP port (587) |
| `EMAIL_USER` | Email nalog za slanje |
| `EMAIL_PASS` | Lozinka / app password |
| `EMAIL_FROM` | Prikazano ime pošiljaoca |
| `NEXT_PUBLIC_URL` | Bazni URL aplikacije |

**`next.config.ts`** — konfiguracija Next.js framework-a.

**`middleware.js`** — zaštita administratorskih ruta.

**`data/`** — JSON skladište podataka (termini, lekari).

**Prilog:** screenshot `.env.local` sa **maskiranim** vrednostima lozinki (npr. `EMAIL_PASS=********`).

### 6.3 Pokretanje aplikacije

Aplikacija podržava sledeće komande definisane u `package.json`:

| Komanda | Namena |
|---------|--------|
| `npm run dev` | Pokretanje u razvojnom režimu (localhost:3000) |
| `npm run build` | Generisanje produkcione verzije |
| `npm run start` | Pokretanje produkcione verzije |
| `npm run lint` | Provera kvaliteta koda (ESLint) |

Tokom razvoja aplikacija se najčešće pokreće komandom:

```
npm run dev
```

Nakon pokretanja, javni deo aplikacije dostupan je na adresi `http://localhost:3000`, a administratorski panel na `http://localhost:3000/admin/login`.

Produkciono deployovanje na platforme poput Vercel-a podrazumeva povezivanje Git repozitorijuma, postavljanje environment varijabli na platformi i automatski build pri svakom push-u — što predstavlja mogućnost budućeg unapređenja opisanu u poglavlju 7.

**Prilog:** screenshot terminala sa uspešno pokrenutim `npm run dev`.

### 6.4 Bezbednost osetljivih podataka

Zaštita osetljivih podataka projektovana je kroz nekoliko principa:

**1. Odvajanje konfiguracije od koda**

Kredencijali administratora i SMTP servera nikada nisu hardkodovani u izvornom kodu. Učitavaju se isključivo preko `process.env` iz `.env.local` fajla.

**2. Zaštita `.env.local` fajla**

Fajl `.env.local` mora biti u `.gitignore` kako ne bi bio objavljen na GitHub-u ili drugim platformama. U radu se prikazuju samo imena promenljivih, bez stvarnih lozinki.

**3. httpOnly sesijski kolačić**

Autentifikacioni token nije dostupan JavaScript-u u pregledaču, što smanjuje rizik od krađe sesije putem XSS napada.

**4. Middleware zaštita**

Sve rute `/admin/*` proveravaju validnost tokena pre prikaza sadržaja. Detalji implementacije dati su u poglavljima 4.9 i 5.3.

**5. robots.txt**

Administratorske rute isključene su iz indeksiranja pretraživačima.

**6. Serverska validacija**

Kritične operacije (zakazivanje, potvrda termina) uvek se proveravaju na serverskoj strani, bez obzira na klijentsku validaciju.

Primena ovih principa omogućava bezbedno pokretanje aplikacije u razvojnom okruženju i predstavlja osnovu za buduće produkciono deployovanje.

**Prilog:** screenshot `robots.txt` u pregledaču ili strukture `.env.local` sa maskiranim vrednostima.

---

## 8.1 Zaključak — DODATI REČENICU

Na kraj pasusa o sistemu dodati:

> Pored implementacije, obezbeđena je i konfiguracija razvojnog okruženja sa zaštitom osetljivih podataka kroz `.env.local` fajl i middleware mehanizam, što je prikazano u poglavlju 6.

---

## PREGLED RADA — ISPRAVKE I PREPORUKE

### Šta je dobro

- Jasna struktura od uvoda do zaključka
- Dobro povezivanje teorije, analize, projektovanja i implementacije
- Prilozi (slike) pokrivaju arhitekturu, kod, UI, admin, email
- Tok: pacijent šalje zahtev → pending → admin → confirmed + email
- Funkcionalni zahtevi usklađeni sa stvarnom aplikacijom

### Obavezne ispravke (primeni u Word-u)

| # | Problem | Ispravka |
|---|---------|----------|
| 1 | Dva puta **Slika 14** | Renumeriši od 5.3 (vidi tabelu gore) |
| 2 | `pending - zakazan` | `pending — na čekanju` |
| 3 | Poglavlje 6 Testiranje | Zameni poglavljem 6 Deployovanje (gore) |
| 4 | Nema 4.9 | Dodaj poglavlje 4.9 Bezbednost |
| 5 | 1.4 i 1.5 pominju testiranje | Ažuriraj prema tekstu gore |
| 6 | Placeholderi „U ovom delu rada potrebno je dodati...“ | Obriši iz finalne verzije |
| 7 | 4.1 — proveri dijagram arhitekture | Dodaj ako još nije |
| 8 | `cancelled 'otkazan` | `cancelled — otkazan` |
| 9 | Veliko **S** u „Sistema“ naslovima | Ujednači: „sistema“ |

### Terminologija — usklađivanje kroz ceo rad

| Pogrešno | Ispravno |
|----------|----------|
| Pacijent zakazuje pregled | Pacijent **šalje zahtev** za pregled |
| Pregled je zakazan (odmah) | Zahtev je **primljen / na čekanju** |
| Potvrda o zakazivanju | Potvrda o **poslatom zahtevu** |
| pending = zakazan | pending = **na čekanju** |
| confirmed = potvrđen | confirmed = **potvrđen / zakazan** |

### Preporuke (opciono)

1. Spoji 5.7 + 5.8 + 5.9 u jedno podpoglavlje ako fali prostor.
2. Poglavlje 7.3 — dodaj screenshot admin dashboard statistike.
3. Literatura — proveri godine izdanja i dodaj URL-ove.
4. Dodaj listu priloga na kraju rada (Slika 1–23).
5. Dodaj Apstrakt ako fakultet traži.

---

## CHECKLIST PRE PREDAJE

- [ ] Sadržaj ažuriran (4.9, poglavlje 6)
- [ ] Slike renumerisane (nema duplog 14)
- [ ] Statusi termina ispravljeni u 4.4
- [ ] Placeholderi obrisani
- [ ] `.env.local` na screenshot-ima — lozinke maskirane
- [ ] 1.4, 1.5, 8.1 ažurirani
- [ ] Provera paginacije u Word-u
- [ ] Literatura — format po smernicama fakulteta

---

*Master rad — MediTime | Nikola Mađarac M5/2023 | Mentor: Dr Selver Pepić | Trstenik 2026*
