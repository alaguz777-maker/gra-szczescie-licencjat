// TŁO I RESPONSYWNOŚĆ
let tło;
let tłoRatio;       // Proporcje obrazka tła
let canvasRatio;    // Proporcje ekranu
let tłoHeight;      // Wyliczona wysokość tła
let tłoWidth;       // Wyliczona szerokość tła
let xTła;           // Przesunięcie poziome tła (centrowanie)

// RAMKA I PRZEWIJANIE (SCROLL) 
let page;           // Bufor graficzny dla głównej strony (scrollowanej)
// Bufory dla poszczególnych etapów gry:
let syt1page, lvl1page, dzień41page, dzień42page;
let dzień42wynik11page, dzień42wynik12page, dzień42wynik21page, dzień42wynik22page;
let wynik1page, wynik2page, wynik3page;

let scrollY = 0;    // Aktualna pozycja przewijania
let frameH = 1;     // Wysokość ramki wyświetlania
let frameW = 1;     // Szerokość ramki wyświetlania
let dragging = false;
let scrollMax = 0;  // Maksymalna wartość przewijania dla danej strony
let lastMouseY;
let frameX;         // Pozycja X ramki
let frameY;         // Pozycja Y ramki
let scrolling = 'off'; // Czy przewijanie jest aktywne

// EKRAN STARTOWY
let startH;
let startW;
let startRatio;
let pStartW;        // Wymiary przycisku start
let pStartH;
let pStartX;
let pStartY;

// EKRAN TWORZENIA POSTACI
let nameInputs = []; // Pola tekstowe na imiona
let activeInput;
let toggles = [      // Stany przełączników zaimków
  {ona: false, on: false, ono: false}, // kolumna 0 (Osoba 1)
  {ona: false, on: false, ono: false}, // kolumna 1 (Osoba 2)
  {ona: false, on: false, ono: false}  // kolumna 2 (Osoba 3)
];
let buttonPositions = []; // Pozycje przycisków do wykrywania kliknięć
// Zmienne przechowujące dane gracza:
let imie1, imie2, imie3;
let zaimki1, zaimki2, zaimki3;
let nodata; // Flaga błędu (brak wpisanych danych)

// LOGIKA GRY (WSTĘP I ETAPY)
let wstępW;
let wstępH;
let doonce = 0;     // Flaga wykonania kodu tylko raz przy wejściu w etap
let Stage = -2;     // Główny licznik etapu gry (-2 to start)
let lastClickTime = -3000;
let osoba1Ratio;
let liniaRatio;

//SYTUACJA 1
let doonce1 = 0; // Dodatkowa flaga "doonce" dla specyficznych sytuacji

// SYTUACJA 2 / LVL 1
let offsetY = 0;
let stresY = 380;
let pkt = 40;       // Punkty zasobów
let myśli = 0;      // Poziom myśli (0-100)
let skalaStres = 0; // Poziom stresu (0-100)
let click = 0;      // możliwość kliknięcia w ekran, aby przejść dalej (0=zablokowana)
let wyb = 0;        // Wybór gracza (1 lub 2)
let startstres = 45; // Poziom początkowy dla danej sceny
let startmyśli = 40;
let kartyRatio;
let warnings = false; // Czy pokazać ostrzeżenia o wysokim stresie
let zmianaStage = 0;  // Podetapy wewnątrz tutoriala


// MINI-GRA: KARTA ODDECH
let oddechStage = 0;
let startTime;
let cycleCount = 0;   // Licznik cykli oddechowych
let animDone = false; // Czy animacja zakończona
let pierwszyraz = 0;  // Czy karta użyta pierwszy raz (koszt punktów)

// MINI-GRA: KARTA MYŚLI
let mysliStage = 0;
let inputMysli;       // Input do wpisywania myśli
let wpisaneMysli = []; // Tablica obiektów myśli
// Granice obszaru, w którym latają myśli:
const MIN_X_AREA = 0.108;
const MAX_X_AREA = 0.883;
const MIN_Y_AREA = 0.274;
const MAX_Y_AREA = 0.584;
let firstTime = 1;    // Czy instrukcja wyświetlana pierwszy raz
let czasZmianyStanu;
const CZAS_CZEKANIA_KLATKI = 5 * 60; // Czas wyświetlania przed zanikaniem
const CZAS_ZANIKANIA_KLATKI = 5 * 60; // Czas animacji zanikania
let alphaMysli = 255; // Przezroczystość tekstów

// MINI-GRA: KARTA ZMYSŁY
let zmyslyStage = 0;
// Flagi zaliczenia poszczególnych zmysłów:
let wzrokdone = false;
let sluchdone = false;
let zapachdone = false;
let dotykdone = false;

// MINI-GRA: KARTA STOP
let stopStage = 0;
let shapes = [];      // Tablica kształtów do policzenia
let shapesize;
let kolory;
let ilePomarańczowych = 0; // Prawidłowa odpowiedź
let inputStop;        // Input na odpowiedź gracza
let ilość;            // Wartość wpisana
let błąd;             // Czy gracz się pomylił

// ZARZĄDZANIE KARTAMI
let wybórKarty = false; // Czy menu wyboru kart jest aktywne
let doKarty = false;    // Czy karta została wybrana
let dooddech = false;
let dozmysły = false;
let domyśli = false;
let dostop = false;
let kartyStage = 1;

// WZROST STRESU I MYŚLI
let stresadded;
let S = 2; // Mały przyrost (Small)
let M = 5; // Średni przyrost (Medium)
let L = 7; // Duży przyrost (Large)

// WYNIK KOŃCOWY
let wynik = 0;
let wybnow = 0;

// ŁADOWANIE ZASOBÓW
function preload() {
  // Obrazy tła i interfejsu
  tło = loadImage('tło.jpg');
  start = loadImage('start.png');
  osobyStrona = loadImage('osobyStrona.png');
  kartyStart = loadImage('kartyStart.png');
  pStart1 = loadImage('przyciskStart1.png');
  pStart2 = loadImage('przyciskStart2.png');
  linia = loadImage('linia.png');
  
  // Elementy fabularne i postacie
  wstęp = loadImage('wstęp.png');
  syt1 = loadImage('syt1.png');
  info1 = loadImage('info1.png');
  info2 = loadImage('info2.png');
  osoba1 = loadImage('osoba1.png');
  osoba2 = loadImage('osoba2.png');
  osoba3 = loadImage('osoba3.png');
  
  // Elementy interfejsu wyboru płci/zaimków
  on1 = loadImage('on1.png');
  on2 = loadImage('on2.png');
  ona1 = loadImage('ona1.png');
  ona2 = loadImage('ona2.png');
  ono1 = loadImage('ono1.png');
  ono2 = loadImage('ono2.png');
  
  // Czcionka
  Neucha = loadFont('Neucha-Regular.ttf');
  
  // UI Stresu i Myśli
  streslvl = loadImage('streslvl.png');
  stres = loadImage('stres.png');
  strestxt = loadImage('strestxt.png');
  punkty = loadImage('punkty.png');
  myśli1 = loadImage('myśli1.png');
  myśli2 = loadImage('myśli2.png');
  myśli3 = loadImage('myśli3.png');
  myśli4 = loadImage('myśli4.png');
  myśli5 = loadImage('myśli5.png');
  myśli6 = loadImage('myśli6.png');
  myśli7 = loadImage('myśli7.png');
  myśli8 = loadImage('myśli8.png');
  myśli9 = loadImage('myśli9.png');
  
  // Grafiki poziomów i dymki informacyjne
  lvl1 = loadImage('lvl1.png');
  lvl1Koniec = loadImage('lvl1_koniec.png');
  lvl1odp2 = loadImage('lvl1_odp2.png');
  lvl1odp1 = loadImage('lvl1_odp1.png');
  oddechGra1 = loadImage('oddechGra1.png');
  mysliGra1 = loadImage('myśliGra1.png');
  mysliGra2 = loadImage('mysliGra2.png');
  infopkt = loadImage('infopkt.png');
  infoMyśli = loadImage('infoMyśli.png');
  infoStres = loadImage('infostres.png');
  info4 = loadImage('info4.png');
  
  // Wybory i wyniki
  syt2wyb1 = loadImage('syt2wyb1.png');
  syt2wyb2 = loadImage('syt2wyb2.png');
  lvl1wynik1 = loadImage('lvl1wynik1.png');
  lvl1wynik2 = loadImage('lvl1wynik2.png');
  lvl1wynik3 = loadImage('lvl1wynik3.png');
  lvl1wynik4 = loadImage('lvl1wynik4.png');
  info5 = loadImage('info5.png');
  info6 = loadImage('info6.png');
  info7 = loadImage('info7.png');
  strzalka = loadImage('strzałka.png');
  x15 = loadImage('x15.png');
  x2 = loadImage('x2.png');
  warning = loadImage('warning.png');
  
  // Karty i mini-gry
  karty1 = loadImage('karty.png');
  mysli = loadImage('myśli.png');
  oddech = loadImage('oddech.png');
  stop1 = loadImage('stop1.png');
  stop2 = loadImage('stop2.png');
  zmysly = loadImage('zmysły.png');
  wroc = loadImage('wroc.png');
  uzyj = loadImage('uzyj.png');
  circle1 = loadImage('circle1.png');
  myslImg = loadImage('mysl.png');
  strzalka2 = loadImage('strzalka2.png');
  text1 = loadImage('text1.png');
  text2 = loadImage('text2.png');
  zmyslyGra1 = loadImage('zmyslyGra1.png');
  zapach = loadImage('zapach.png');
  dotyk = loadImage('dotyk.png');
  sluch = loadImage('słuch.png');
  wzrok = loadImage('wzrok.png');
  text3 = loadImage('text3.png');
  stopGra1 = loadImage('stopGra1.png');
  stop20 = loadImage('stop20.png');
  stop40 = loadImage('stop40.png');
  przyciskStop = loadImage('przyciskStop.png');
  przyciskStop2 = loadImage('przyciskStop2.png');
  osoba12 = loadImage('osoba12.png');
  osoba22 = loadImage('osoba22.png');
  osoba32 = loadImage('osoba32.png');
  
  // Ostatnia sytuacja i zakończenia
  dzień41 = loadImage('dzień4.1.png');
  dzień42 = loadImage('dzień4_2.png');
  dzień42odp1 = loadImage('dzień4_2_odp1.png');
  dzień42odp21 = loadImage('dzień4_2_odp2_1.png');
  dzień42odp22 = loadImage('dzień4_2_odp2_2.png');
  dzień42odp1c2 = loadImage('dzień4_2_odp1_c2.png');
  dzień42odp21c2 = loadImage('dzień4_2_odp2_1_c2.png');
  dzień42odp22c2 = loadImage('dzień4_2_odp2_2_c2.png');
  dzień41wyb1 = loadImage('dzień41wyb1.png');
  dzień41wyb2 = loadImage('dzień41wyb2.png');
  dzień42wynik11 = loadImage('dzień42wynik11.png');
  dzień42wynik12 = loadImage('dzień42wynik12.png');
  dzień42wynik21 = loadImage('dzień42wynik21.png');
  dzień42wynik22 = loadImage('dzień42wynik22.png');
  wynik1 = loadImage('wynik1.png');
  wynik2 = loadImage('wynik2.png');
  wynik3 = loadImage('wynik3.png');
  ekranKoniec = loadImage('ekranKoniec.png');
}
function setup() {
  createCanvas(windowWidth,windowHeight);
  
  // Inicjalizacja pól do wpisywania imion
  for (let i = 0; i < 3; i++) {
    let inp = createInput();
    inp.attribute("placeholder", "Tu wpisz imię");
    inp.style('background-color', '#F5EAD0');
    inp.style('border', 'none');
    inp.style('outline', 'none');
    inp.attribute('maxlength', 15);
    nameInputs.push(inp);
}
  wstępW = wstęp.width;
  wstępH = wstęp.height;
  
  // Tworzenie buforów graficznych (wirtualnych stron) do przewijania
  page = createGraphics(wstępW, 10000);
  syt1page = createGraphics(wstępW, 10000);
  lvl1page = createGraphics(wstępW, 10000);
  dzień41page = createGraphics(wstępW, 10000);
  dzień42page = createGraphics(wstępW, 10000);
  dzień42wynik11page = createGraphics(wstępW, 10000);
  dzień42wynik12page = createGraphics(wstępW, 10000);
  dzień42wynik21page = createGraphics(wstępW, 10000);
  dzień42wynik22page = createGraphics(wstępW, 10000);
  wynik1page = createGraphics(wstępW, 10000);
  wynik2page = createGraphics(wstępW, 10000);
  wynik3page = createGraphics(wstępW, 10000);

  // Wstępne rysowanie obrazków na buforach
  page.image(wstęp, 0, 30, wstępW, wstępH);
  syt1page.image(syt1, 0, 30);
  lvl1page.image(lvl1, 0, 30);
  dzień41page.image(dzień41, 0, 30);
  dzień42page.image(dzień42, 0, 30);
  dzień42wynik11page.image(dzień42wynik11,0,30);
  dzień42wynik12page.image(dzień42wynik12,0,30);
  dzień42wynik21page.image(dzień42wynik21,0,30);
  dzień42wynik22page.image(dzień42wynik22,0,30);
  wynik1page.image(wynik1,0,30);
  wynik2page.image(wynik2,0,30);
  wynik3page.image(wynik3,0,30);
  
  // Konfiguracja inputów dla mini-gier (ukryte na starcie)
  inputMysli = createInput('');
  inputMysli.hide();
  inputMysli.style('background-color', '#F5EAD0');
  inputMysli.style('border', 'none');
  inputMysli.style('outline', 'none');
  inputMysli.style('border-radius', '30px');
  inputMysli.style('padding-left', '15px');
  inputMysli.attribute('placeholder', 'Tutaj wpisz myśli...');
  inputMysli.changed(obsluzWprowadzenie);

  inputStop = createInput('');
  inputStop.hide();
  inputStop.style('background-color', '#F5EAD0');
  inputStop.style('border', 'none');
  inputStop.style('outline', 'none');
  inputStop.style('border-radius', '30px');
  inputStop.attribute('placeholder', 'Wpisz ilość');
}

// PĘTLA GŁÓWNA

function draw() {
  background(255,250,238);
  noStroke();
  fill(0);
  
  // Mapowanie wartości stresu na pozycję paska
  stresY = map(skalaStres, 0, 100, 380, 0);
  
  //TŁO
  
  tłoRatio = tło.width/tło.height;
  canvasRatio = width/height;
  
  if (canvasRatio > tłoRatio) {
    tłoHeight = height;
    tłoWidth = tłoRatio * tłoHeight;
  } else {
    tłoWidth = width;
    tłoHeight = tłoWidth / tłoRatio;
  }
  
  xTła = (width - tłoWidth) / 2;
  
  // RAMKA
  
  frameH = 572/832*tłoHeight;
  frameW = 980/1280*tłoWidth;
  
  frameX = xTła+150/1280*tłoWidth;
  frameY = 140/832*tłoHeight;
  
  //ETAPY GRY
  
  if (Stage === -2){
    // Obliczanie skalowania ekranu startowego
    startRatio = start.width/start.height;
    
    if (canvasRatio > startRatio) {
      startH = height;
      startW = startRatio * startH;
    } else {
      startW = width;
      startH = startW / startRatio;
    }
    let xStart = (width-startW)/2;
    let kartyRatio = kartyStart.width/kartyStart.height;
    let pStart1Ratio = pStart1.width/pStart1.height;
    image(start,xStart,0,startW,startH);
    image(kartyStart, -0.1*startW,0.25*startH,startH*kartyRatio,startH);
    
    // Rysowanie przycisku start z efektem hover
    pStartW = startW * 0.3;
    pStartH = pStartW / (pStart1.width / pStart1.height);
    pStartX = (width - pStartW) / 2;
    pStartY = (startH - pStartH) / 2;
    
    if (mouseX > pStartX && mouseX < pStartX + pStartW && mouseY > pStartY && mouseY < pStartY + pStartH) {
  image(pStart2, pStartX, pStartY, pStartW, pStartH);
} else {
  image(pStart1, pStartX, pStartY, pStartW, pStartH);
}
  }

  
  // NAZYWANIE POSTACI
  
  if (Stage === -1){
    image(osobyStrona, xTła, 0, tłoWidth, tłoHeight)
    
  // Ustawienie pozycji inputów
  let boxW = 0.12 * tłoWidth;
  let boxH = 0.06 * tłoHeight;

  let positions = [
    [xTła + 0.216*tłoWidth, 0.525*tłoHeight],
    [xTła + 0.440*tłoWidth, 0.525*tłoHeight],
    [xTła + 0.664*tłoWidth, 0.525*tłoHeight]
  ];

  textAlign(CENTER, CENTER);
  textSize(width*0.017);
  fill(0);
  textFont(Neucha);

  for (let i = 0; i < 3; i++) {
    let [bx, by] = positions[i];

    nameInputs[i].position(bx, by);
    nameInputs[i].size(boxW, boxH);

    // Pobieranie wartości z inputów
    let val = nameInputs[i].value();
  if (i === 0) imie1 = val;
  if (i === 1) imie2 = val;
  if (i === 2) imie3 = val;
  }
    
  // Rysowanie przycisków zaimków (ona/on/ono)
  let przyciskRatio = on1.width / on1.height;
  let przyciskW = boxW; 
  let przyciskH = przyciskW / przyciskRatio;
  let przyciskMargin = boxH * 0.4; 

  for (let i = 0; i < 3; i++) {
    let [bx, by] = positions[i];

    let przyciskX = bx + (boxW - przyciskW) / 2;
    let przyciskY = by + boxH + przyciskMargin;
    
    // Zapisanie pozycji przycisków do obsługi kliknięć
    buttonPositions[i] = {
    on: [przyciskX, przyciskY + przyciskH + przyciskH*0.2, przyciskW, przyciskH],
    ona: [przyciskX, przyciskY, przyciskW, przyciskH],
    ono: [przyciskX, przyciskY + 2*(przyciskH + przyciskH*0.2), przyciskW, przyciskH]
  };

  image(toggles[i].ona ? ona2 : ona1, przyciskX, przyciskY, przyciskW, przyciskH);
  image(toggles[i].on ? on2 : on1, przyciskX, przyciskY + przyciskH + przyciskH*0.2, przyciskW, przyciskH);
  image(toggles[i].ono ? ono2 : ono1, przyciskX, przyciskY + 2*(przyciskH + przyciskH*0.2), przyciskW, przyciskH);
}
    if (nodata === 1){
      text("Podaj imiona i wybierz zaimki!", xTła+0.5*tłoWidth, 0.542*tłoWidth);
    }
} else {
  // Ukrycie inputów gdy nie jesteśmy na etapie -1
  for (let inp of nameInputs) {
    inp.position(-1000, -1000); 
  }

  }
  
  // STAGE 0-13: WSTĘP FABULARNY
  
  if (Stage>=0 && Stage<=13){
    if (doonce===0 && Stage===0){
      scrollY = -950; // Ustawienie początkowego scrolla
    }
    liniaRatio = linia.width/linia.height;
    image(tło, xTła, 0, tłoWidth, tłoHeight);
    // Wyświetlanie scrollowanej strony w ramce
    image(page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
    // Rysowanie linii maskującej/ozdobnej
    image(linia, frameX, frameY-frameW/liniaRatio/2, frameW, frameW/liniaRatio);
    
  }
  
  // STAGE 14-26: SYTUACJA 1
  
  if (Stage>13 && Stage<26){
    if (Stage===14){
      scrollY = -1000;
    }
    liniaRatio = linia.width/linia.height;
    image(tło, xTła, 0, tłoWidth, tłoHeight);  
    image(syt1page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
    image(linia, frameX, frameY-frameW/liniaRatio/2, frameW, frameW/liniaRatio);

  }
  
  // STAGE 25+: POKAZANIE UI STRESU
  if (Stage===25){
    if (doonce1===0){
    scrollY = -900;
      // Kopiowanie paska stresu do zmiennej pomocniczej dla maskowania
    scaledstreslvl = createImage(stres.width,stres.height);
    scaledstreslvl.copy(streslvl, 0, 0, streslvl.width, streslvl.height, 0, stresY, stres.width, stres.height+50);
    doonce1++;
    }
  }
  
  // GŁÓWNA PĘTLA UI (STRES, MYŚLI, PUNKTY) OD STAGE 26
  if (Stage > 25){
    // Aktualizacja wizualizacji paska stresu
    let stres1;
    if (skalaStres != stres1){
      scaledstreslvl = createImage(stres.width,stres.height);
      scaledstreslvl.copy(streslvl, 0, 0, streslvl.width, streslvl.height, 0, stresY, stres.width, stres.height+50);
      stres1 = skalaStres;
    }
    image(tło, xTła, 0, tłoWidth, tłoHeight);
    
    // Tła dla konkretnych zakończeń poziomó
    if ((Stage >= 48 && Stage <=50)||(Stage===58)||(Stage===81)||(Stage===114)){ 
      image(lvl1Koniec,xTła, 0, tłoWidth, tłoHeight);
    }
    
    // GENEROWANIE TEKSTÓW WYNIKOWYCH (DYNAMICZNE IMIONA)
    if (Stage===115){
    if (wynik===1 || wynik===0){
      if(doonce===0){
        // Wypisywanie imion i zaimków na buforze wynikowym (tylko raz)
        wynik1page.textSize(40);
        wynik1page.textFont('Verdana');
        let w1 = wynik1page.textWidth(imie1);
        let w2 = wynik1page.textWidth(imie2);
        let w3 = wynik1page.textWidth(imie3);
        wynik1page.text(imie1,263-w1/2,574);
        wynik1page.text(imie2,263-w2/2,962);
        wynik1page.text(imie2,263-w2/2,1354);
        wynik1page.text(imie3,263-w3/2,1781);
        wynik1page.text(imie3,263-w3/2,2212);
        wynik1page.text(imie1,263-w1/2,2611);
        wynik1page.text(imie1,263-w1/2,3003);
        wynik1page.text(imie1,263-w1/2,3434);
        wynik1page.text(imie3,263-w3/2,3867);
        wynik1page.text(imie2,263-w2/2,4251);
        wynik1page.textFont(Neucha);
        wynik1page.text(zaimki1,928,3248);
        scrollY=-950;
        doonce++;
         }
      image(wynik1page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
    }
    if (wynik===2){
      if(doonce===0){
        wynik2page.textSize(40);
        wynik2page.textFont('Verdana');
        let w1 = wynik2page.textWidth(imie1);
        let w2 = wynik2page.textWidth(imie2);
        let w3 = wynik2page.textWidth(imie3);
        wynik2page.text(imie3,263-w3/2,570);
        wynik2page.text(imie1,263-w1/2,964);
        wynik2page.text(imie2,263-w2/2,1351);
        wynik2page.text(imie3,263-w3/2,1776);
        wynik2page.text(imie1,263-w1/2,2212);
        wynik2page.text(imie2,263-w2/2,2613);
        wynik2page.textFont(Neucha);
        if (zaimki3==="o"){
          wynik2page.text('Chciałobym',458,2470);
        } else if (zaimki3==='a'){
          wynik2page.text('Chciałabym',458,2470);
        } else {
          wynik2page.text('Chciałbym',458,2470);
        }
        wynik2page.textFont('Verdana');
        wynik2page.text('ł',539,2470);
        scrollY=-1000;
        doonce++;
         }
      image(wynik2page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
    }
    if (wynik===3){
      if(doonce===0){
        scrollY=-1000;
        wynik3page.textSize(40);
        wynik3page.textFont('Verdana');
        let w1 = wynik3page.textWidth(imie1);
        let w2 = wynik3page.textWidth(imie2);
        let w3 = wynik3page.textWidth(imie3);
        wynik3page.text(imie1,260-w1/2,520);
        wynik3page.text(imie3,265-w3/2,900);
        wynik3page.text(imie2,265-w2/2,1295);
        wynik3page.text(imie1,260-w1/2,1690);
        wynik3page.text(imie2,265-w2/2,2075);
        wynik3page.text(imie1,260-w1/2,2492);
        wynik3page.text(imie3,265-w3/2,2893);
        wynik3page.text(imie3,265-w3/2,3292);
        wynik1page.textFont(Neucha);
        wynik3page.text(zaimki2,700,1148);
        wynik3page.text(zaimki1,788,1540);
        doonce++;
         }
      image(wynik3page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
    }
  }
    
    // RYSOWANIE STRESU, PUNKTÓW, MYŚLI
    let stresRatio = stres.width/stres.height;
    let strestxtRatio = strestxt.width/strestxt.height;
    let punktyRatio = punkty.width/punkty.height;
    
      if (Stage===95){
    image(lvl1Koniec,xTła, 0, tłoWidth, tłoHeight);
  }
    
    // Pasek stresu
    image(stres,xTła+0.02*tłoWidth,0.04*tłoHeight, 0.25*tłoHeight*stresRatio, 0.25*tłoHeight )
    scaledstreslvl.mask(stres);
image(scaledstreslvl,xTła+0.02*tłoWidth,0.04*tłoHeight, 0.25*tłoHeight*stresRatio, 0.25*tłoHeight);
    image(strestxt, xTła+0.06*tłoWidth, 0.09*tłoHeight,0.15*tłoHeight*strestxtRatio,0.15*tłoHeight)
    textFont(Neucha);
    textSize(0.025*tłoWidth);
    if(skalaStres<10){
      text(skalaStres, xTła+0.031*tłoWidth, 0.172*tłoWidth);
    } else{
      text(skalaStres, xTła+0.026*tłoWidth, 0.172*tłoWidth);
    }
    
    // Punkty
    image(punkty, xTła+0.866*tłoWidth,0.035*tłoHeight,0.11*tłoWidth,0.11*tłoWidth/punktyRatio)
    textFont(Neucha);
    textSize(0.025*tłoWidth);
    text(pkt,xTła+0.915*tłoWidth,0.08*tłoHeight,50);
    
    // Myśli
    let myśliRatio = myśli1.width/myśli1.height;
    if (myśli<=11){
      image(myśli1,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    } else if (myśli<=22){
      image(myśli2,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=33){
      image(myśli3,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=44){
      image(myśli4,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=55){
      image(myśli5,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=66){
      image(myśli6,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=77){
      image(myśli7,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=88){
      image(myśli8,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }else if (myśli<=100){
      image(myśli9,0.22*tłoWidth,0.026*tłoHeight, 0.54*tłoWidth, 0.54*tłoWidth/myśliRatio);
    }  
    text(myśli, xTła+0.257*tłoWidth, 0.049*tłoWidth);
  }
   
  // OSTRZEŻENIA (KIEDY MYŚLI SĄ WYSOKIE)
  if (warnings===true){
    if (myśli>50){    image(warning,xTła+0.015*tłoWidth,0.21*tłoWidth,0.048*tłoWidth,0.048*tłoWidth);
    }
    if (myśli>50 && myśli<=75){   image(x15,xTła+0.016*tłoWidth,0.272*tłoWidth,0.048*tłoWidth,0.048*tłoWidth);
    }
    if (myśli>75){   image(x2,xTła+0.016*tłoWidth,0.272*tłoWidth,0.048*tłoWidth,0.048*tłoWidth);
    }
  }
  
  // RYSOWANIE STRON SCROLLOWANYCH DLA RÓŻNYCH ETAPÓW
  
  if ((Stage>=35 && Stage<=47) || (Stage>=51 && Stage<55) || (Stage>=56 && Stage<58) || (Stage>58 && Stage<79) || Stage===80){
    if (Stage===35){
          scrollY = -900;
    }
    image(lvl1page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
  }
  
  if (Stage===82 || (Stage>83 && Stage<92) || Stage===94){
    if (Stage===82){
          scrollY = -1000;
    }
    image(dzień41page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
  }
  if (Stage>=97 && Stage<=110 || Stage===112){
    if (Stage===97){
          scrollY = -900;
    }
    image(dzień42page, frameX, frameY, frameW, frameH, 0, scrollY,             wstępW,wstępW*frameH/frameW);
  }
  if (Stage===113){
    if (Stage===113 && doonce === 0){
      if (wyb===1){
        if (myśli<=50){
          scrollY = -950;
        } else {
          scrollY = -1000;
        }
      } 
      if (wyb===2){
        if (myśli<=50){
          scrollY = -1000;
        } else {
          scrollY = -1000;
        }
      }
      doonce++;
    }
    if (wyb===1){
      if (myśli<=50){
        image(dzień42wynik11page, frameX, frameY, frameW, frameH, 0, scrollY, wstępW,wstępW*frameH/frameW);
      } else {
        image(dzień42wynik12page, frameX, frameY, frameW, frameH, 0, scrollY, wstępW,wstępW*frameH/frameW);
      }}
    if (wyb===2){
     if (myśli<=50){
        image(dzień42wynik21page, frameX, frameY, frameW, frameH, 0, scrollY, wstępW,wstępW*frameH/frameW);
      } else {
        image(dzień42wynik22page, frameX, frameY, frameW, frameH, 0, scrollY, wstępW,wstępW*frameH/frameW);
      } 
    }
  }


  // RYSOWANIE ETAPÓW - CO DZIEJE SIĘ PO KAŻDYM KLIKNIĘCIU
  
  //WSTĘP
  
  if (Stage===0){
    click=1;
    textAlign(LEFT, BASELINE);
    scrollY = -950;
    image(info1, frameX/7, frameY, info1.width*width/wstęp.width/1.5, info1.height*width/wstęp.width/1.5);
    if (doonce===0){
    page.textSize(30);
    page.textFont('Verdana');
    let w1 = page.textWidth(imie1);
    let w2 = page.textWidth(imie2);
    let w3 = page.textWidth(imie3);
    page.text(imie1,291-w1/2,574);
    page.text(imie2,291-w2/2,962);
    page.text(imie2,291-w2/2,1354);
    page.text(imie3,291-w3/2,1781);
    page.text(imie3,291-w3/2,2212);
    page.text(imie1,291-w1/2,2611);
    page.text(imie1,291-w1/2,3003);
    page.text(imie1,291-w1/2,3434);
    page.text(imie3,291-w3/2,3867);
    page.text(imie2,291-w2/2,4251);
    page.textSize(40);
    page.textFont(Neucha);
    page.text(zaimki1,961,3248);
    page.text(zaimki1,1345,3250);
    doonce++;
    }
  } 
  if (Stage === 1 && doonce === 0){
      scrollY = -500;
      scrolling = 'on';
      scrollMax = scrollY;
      doonce++;
    }
  if (Stage === 2 && doonce === 0){
    scrollY = -100;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 3 && doonce === 0){
    scrollY = 250;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 4 && doonce === 0){
    scrollY = 700;
    scrollMax = scrollY;
    doonce++;
  } 
  if (Stage === 5){
    if (doonce === 0){
      scrollY = 1100;
    scrollMax = scrollY;
      doonce++;
    }
    image(info2, frameX/7, frameY, info2.width*width/wstęp.width/1.5, info2.height*width/wstęp.width/1.5)
  }
  if (Stage === 6 && doonce === 0){
    scrollY = 1500;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 7 && doonce === 0){
    scrollY = 1900;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 8 && doonce === 0){
    scrollY = 2300;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 9 && doonce === 0){
    scrollY = 2750;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 10 && doonce === 0){
    scrollY = 3150;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 11){
    if (doonce === 0){
      click = 0;
      scrollY = 3650;
      scrollMax = scrollY;
      doonce++;
    }
    if (click===0){
    iRatio=info4.width/info4.height; image(info4,xTła+0.524*tłoWidth,0.42*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("Strzałka oznacza, że po kolejnym kliknięciu przejdziesz do następnej sytuacji.",xTła+0.62*tłoWidth,0.435*tłoWidth,0.32*tłoWidth);
    }
  }
  if (Stage === 12){
    Stage = 14;
    }

  
// KOLEJNA SYTUACJA

  if (Stage === 14){
    scrollY = -1000;
    scrolling = 'off'
    
    if (doonce===0){
    syt1page.textSize(30);
    syt1page.textFont('Verdana');
    let w1 = syt1page.textWidth(imie1);
    let w2 = syt1page.textWidth(imie2);
    let w3 = syt1page.textWidth(imie3);
    syt1page.text(imie2,334-w2/2,512);
    syt1page.text(imie1,334-w1/2,890);
    syt1page.text(imie1,334-w1/2,1275);
    syt1page.text(imie3,334-w3/2,1661);
    syt1page.text(imie3,334-w3/2,2043);
    syt1page.text(imie2,334-w2/2,2431);
    syt1page.text(imie2,334-w2/2,2856);
    syt1page.text(imie1,334-w1/2,3243);
    syt1page.text(imie1,334-w1/2,3627);
    syt1page.text(imie2,334-w2/2,4013);
    syt1page.text(imie3,334-w3/2,4394);
    doonce++;
    }

  }
  if (Stage === 15 && doonce ===0){
    scrolling = 'on';
    scrollY = -600;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 16 && doonce ===0){
    scrollY = -215;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 17 && doonce ===0){
    scrollY = 160;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 18 && doonce ===0){
    scrollY = 540;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 19 && doonce ===0){
    scrollY = 910;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 20 && doonce ===0){
    scrollY = 1300;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 21 && doonce ===0){
    scrollY = 1720;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 22 && doonce ===0){
    scrollY = 2120;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 23 && doonce ===0){
    scrollY = 2500;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 24 && doonce ===0){
    scrollY = 2880;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage === 25 && doonce ===0){
    scrollY = 3265;
    scrollMax = scrollY;
    doonce++;
  }
  
  if (Stage === 26){
    let infopktRatio = infopkt.width/infopkt.height;
    image(infopkt,0.6*tłoWidth,0.025*tłoHeight,0.25*tłoWidth, 0.19*tłoWidth/infopktRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text('Tu możesz zobaczyć swoje punkty. Więcej o nich dowiesz się, gdy będą one potrzebne.',0.614*tłoWidth,0.04*tłoHeight,0.22*tłoWidth)
    if (doonce===0){
      doonce1 = 0
      doonce++
    }
  }
  
  if (Stage >=27 && Stage <=30){
    let Ratio = infoMyśli.width/infoMyśli.height;
    image(infoMyśli,0.1*tłoWidth,0.1*tłoHeight,0.3*tłoWidth, 0.3*tłoWidth/Ratio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    if (Stage===27){
      text('To wskaźnik myśli twoich postaci. Skala ta rozciąga się od 0 do 100',0.115*tłoWidth,0.155*tłoHeight,0.28*tłoWidth)
    }
    if (Stage === 28){
      text('0 oznacza spokój i jasny umysł',0.115*tłoWidth,0.155*tłoHeight,0.28*tłoWidth);
    }
    if (Stage === 29){
      myśli = 100;
      text('100 znaczy chaos i wiele myśli jednocześnie',0.115*tłoWidth,0.155*tłoHeight,0.28*tłoWidth);
    }
    if (Stage === 30){
      myśli = 0;
      text('Jest to wspólny poziom myśli. Widzisz tu sumę wszystkich myśli trzech postaci.',0.115*tłoWidth,0.103*tłoWidth,0.28*tłoWidth);
    }
  }
  
  if (Stage>=31 && Stage<=34){
    let iratio = infoStres.width/infoStres.height;
    if(zmianaStage===0){
    image(infoStres, xTła+0.016*tłoWidth, 0.3*tłoHeight, 0.3*tłoWidth, 0.3*tłoWidth/iratio);}
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    if (Stage===31){
      text("Tu widzisz poziom stresu. Podobnie jak myśli, przyjmuje on wartości od 0 do 100.", xTła+0.03*tłoWidth, 0.35*tłoHeight, 0.27*tłoWidth)
    }
    if (Stage===32){
      text("Wskaźnik stresu jest wspólny dla wszystkich trzech postaci.", xTła+0.03*tłoWidth, 0.232*tłoWidth, 0.27*tłoWidth)
    }
    if (Stage===33){
      skalaStres=70
      text("Gdy któraś z nich się stresuje, wartość rośnie.", xTła+0.03*tłoWidth, 0.232*tłoWidth, 0.27*tłoWidth)
    }
    if (Stage===34){
      if(zmianaStage===0){
      click = 0;
      skalaStres=20
      text("a gdy stres którejś z postaci maleje, wskaźnik również spada.", xTła+0.03*tłoWidth, 0.355*tłoHeight, 0.27*tłoWidth)
      }
      if(zmianaStage>=1){
        let oratio = osoba12.width/osoba12.height;
        image(osoba12, width/2-0.125*tłoWidth ,tłoHeight/2-0.125*tłoWidth, 0.25*tłoWidth,0.25*tłoWidth/oratio)
        textSize(0.02*tłoWidth);
        textFont('Verdana');
        let w = textWidth(imie1);
        text(imie1, width/2 - w/2, 0.437*tłoWidth);
        infoRatio=info4.width/info4.height;
    image(info4,xTła+0.041*tłoWidth,0.5*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/infoRatio);
        textSize(0.02*tłoHeight);
        if(zmianaStage===1){
        text("Na tę historię wpływ mają trzy osoby. Zobaczysz co dzieje się u każdej z nich.",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth);
        }
        if (zmianaStage===2){
          text("W tym momencie na problem napotyka " + imie1 + '.',xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth);
          click = 1;
        }
      }
    }
  }
  
  if (Stage === 35 && doonce===0){
    skalaStres=45;
    myśli=41;
    scrolling="off";
    lvl1page.textSize(30);
    lvl1page.textFont('Verdana');
    let w = lvl1page.textWidth(imie2);
    lvl1page.text(imie2, 270 - w/2, 1650);
    lvl1page.textSize(50);
    lvl1page.textFont(Neucha);
    lvl1page.text(zaimki1, 1289,400);
    lvl1page.text(zaimki1, 832,451);
    lvl1page.text(zaimki1, 271,656);
    lvl1page.text(zaimki1, 975,658);
    lvl1page.text(zaimki1, 313,1089);
    doonce++;
  }
  if (Stage === 36 && doonce === 0){
    scrollY = -650;
    scrolling="on";
    scrollMax = -650;
    doonce++;
  }
  if (Stage === 37 && doonce === 0){
    scrollY = -390;
    scrollMax = -390;
    myśli+=2
    skalaStres+=2
    doonce++;
  }
  if (Stage === 38 && doonce === 0){
    scrollY = -150;
    scrollMax = -150;
    myśli+=2
    skalaStres+=2
    doonce++;
  }
  if (Stage === 39 && doonce === 0){
    scrollY = 0;
    scrollMax = 0;
    doonce++;
  }
  if (Stage === 40 && doonce === 0){
    scrollY = 120;
    scrollMax = 120;
    doonce++;
  }
  if (Stage === 41 && doonce === 0){
    scrollY = 550;
    scrollMax = 550;
    doonce++;
  }
  if (Stage === 42 && doonce === 0){
    scrollY = 950;
    scrollMax = 950;
    myśli+=6
    skalaStres+=6
    doonce++;
  }
  if (Stage === 43 && doonce === 0){
      scrollY = 1550;
      scrollMax = 1550;
      doonce++;
    }
  if (Stage>=43 && Stage<=47){
    infoRatio=info4.width/info4.height;
    image(info4,xTła+0.041*tłoWidth,0.5*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/infoRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    if (Stage===43){
    text("Możesz teraz wybrać, jak dalej potoczy się historia",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth);
    }
    if (Stage===44){
    text("Uważaj jednak! Poziom stresu i ilość myśli wpłyną na reakcję postaci.",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth)
    }
    if (Stage===45){
    text("Zróbmy eksperyment. Zobaczmy, co wydarzy się przy obecnym poziomie stresu i ilości myśli.",xTła+0.136*tłoWidth,0.514*tłoWidth,0.33*tłoWidth)
    }
    if (Stage===46){
    Stage=47;
    }
  if (Stage === 47){
    if (doonce===0){
      scrollY = 1550;
      click = 0;
      doonce++
    }
  text("Kliknij w jedną z opcji",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth)
    
  let wyb1W = 0.278 * tłoWidth;
  let wyb1H = wyb1W * (syt2wyb1.height / syt2wyb1.width);

  let wyb2W = 0.278 * tłoWidth;
  let wyb2H = wyb2W * (syt2wyb2.height / syt2wyb2.width);

  let X1 = xTła + 0.204 * tłoWidth;
  let wybY = 0.392 * tłoWidth;

  let X2 = xTła + 0.507 * tłoWidth;

  let overWyb1 =
    mouseX > X1 &&
    mouseX < X1 + wyb1W &&
    mouseY > wybY &&
    mouseY < wybY + wyb1H;

  let overWyb2 =
    mouseX > X2 &&
    mouseX < X2 + wyb2W &&
    mouseY > wybY &&
    mouseY < wybY + wyb2H;

    if (overWyb1) {
      image(syt2wyb1, X1, wybY, wyb1W, wyb1H);
    }
    if (overWyb2) {
      image(syt2wyb2, X2, wybY, wyb2W, wyb2H);
    }
  }
  }
  if ((Stage >=48 && Stage<=50)||(Stage===58)||(Stage===81)){
    if (wyb===1){
      if (myśli<=50){
        let rat = lvl1wynik3.width/lvl1wynik3.height;
        image(lvl1wynik3, xTła+0.315*tłoWidth,0.16*tłoWidth,0.36*tłoWidth,0.36*tłoWidth/rat)
      } else {
        let rat = lvl1wynik4.width/lvl1wynik4.height;
        image(lvl1wynik4, xTła+0.315*tłoWidth,0.16*tłoWidth,0.36*tłoWidth,0.36*tłoWidth/rat)
      }
    } else if (wyb===2){
      if (myśli<=50){
        let rat = lvl1wynik1.width/lvl1wynik1.height;
        image(lvl1wynik1, xTła+0.315*tłoWidth,0.16*tłoWidth,0.36*tłoWidth,0.36*tłoWidth/rat)
      } else {
        let rat = lvl1wynik2.width/lvl1wynik2.height;
        image(lvl1wynik2, xTła+0.315*tłoWidth,0.17*tłoWidth,0.36*tłoWidth,0.36*tłoWidth/rat)
      }
    }
  stresadded = skalaStres-startstres;
    if (stresadded>=0){
      text("+ "+stresadded,xTła+0.38*tłoWidth,0.445*tłoWidth);
    } else {
      text("- "+stresadded*(-1),xTła+0.38*tłoWidth,0.445*tłoWidth);
    }
  let myśliadded = myśli-startmyśli;
    if (myśliadded>=0){
      text("+ "+myśliadded,xTła+0.57*tłoWidth,0.445*tłoWidth);
    } else {
      text("- "+myśliadded*(-1),xTła+0.57*tłoWidth,0.445*tłoWidth);
    }
  }
  if (Stage===48){
  let infoRatio=info5.width/info5.height;
  image(info5,xTła+0.158*tłoWidth,0.46*tłoWidth,0.274*tłoWidth, 0.274*tłoWidth/infoRatio);
  textFont('Verdana');
  textSize(0.02*tłoHeight);
  text("Tu widzisz, o ile wzrósł stres w całej tej sytuacji", xTła+0.172*tłoWidth, 0.495*tłoWidth, 0.251*tłoWidth);
    click = 1;
  }
  if (Stage===49){
    let infoRatio=info5.width/info5.height;
    image(info5,xTła+0.37*tłoWidth,0.46*tłoWidth,0.274*tłoWidth, 0.274*tłoWidth/infoRatio);
  textFont('Verdana');
  textSize(0.02*tłoHeight);
  text("a tu, o ile wzrosła ilość myśli", xTła+0.394*tłoWidth, 0.495*tłoWidth, 0.251*tłoWidth);
  }
  if (Stage===50){
    click=0;
    let infoRatio=info6.width/info6.height;
    image(info6,xTła+0.597*tłoWidth,0.426*tłoWidth,0.274*tłoWidth, 0.274*tłoWidth/infoRatio);
  textFont('Verdana');
  textSize(0.02*tłoHeight);
  text("kliknij strzałkę i wróć do wyboru", xTła+0.612*tłoWidth, 0.447*tłoWidth, 0.24*tłoWidth);
    
   if (mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
      let strzalkaRatio = strzalka.width / strzalka.height;
      image(strzalka, xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio);
  }
  }
  if (Stage>=51 && Stage<=52){
    let infoRatio=info4.width/info4.height;
    textFont('Verdana');
    textSize(0.02*tłoHeight); image(info4,xTła+0.041*tłoWidth,0.5*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/infoRatio);
  }
  if (Stage===51){
    click = 1;
    text("Teraz wiesz, co stanie się przy obecnym poziomie stresu i obecnej ilości myśli",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth)
  }
  if (Stage===52){
    text("Możesz jednak wpłynąć na obie te skale",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth)
  }
  if (Stage>=53 && Stage<55){
    scrollY = 1550;
    let infoRatio=info4.width/info4.height;
    textFont('Verdana');
    textSize(0.02*tłoHeight); image(info4,xTła+0.041*tłoWidth,0.47*tłoWidth,0.47*tłoWidth,0.47*tłoWidth/infoRatio);
    if (Stage===53){
       text("Karty, które teraz widzisz, przedstawiają techniki, których możesz użyć, żeby obniżyć poziom stresu i ilość myśli.",xTła+0.143*tłoWidth,0.48*tłoWidth,0.33*tłoWidth)
     }
    if (Stage===54){
       text("Tym razem użyj karty ODDECH - kliknij w nią",xTła+0.143*tłoWidth,0.495*tłoWidth,0.33*tłoWidth)
      click = 0;
     }
    karty();
  }
  if(Stage===55){
    click = 0;
    kartaoddech();
    }
  if (Stage>=56 && Stage<58){
    let infoRatio=info4.width/info4.height;
    textFont('Verdana');
    textSize(0.02*tłoHeight); image(info4,xTła+0.041*tłoWidth,0.5*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/infoRatio);
  }
  if (Stage===56){
    click = 1;
    text("Brawo! Stres i ilość myśli są teraz niższe",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth)
  }
  if (Stage===57){
    click = 0;
    text("Wybierz teraz tę samą opcję co poprzednio i zobacz co się zmieni. ",xTła+0.136*tłoWidth,0.514*tłoWidth,0.32*tłoWidth)
    if (wyb===1){
      let sratio = syt2wyb1.height / syt2wyb1.width;
      if (mouseX > xTła + 0.205 * tłoWidth && mouseX < xTła + 0.488 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.283 * tłoWidth*sratio){
        image(syt2wyb1,xTła + 0.204 * tłoWidth,0.392 * tłoWidth, 0.278*tłoWidth, 0.278*tłoWidth*sratio);
      }
    }
    if (wyb===2){
      let sratio = syt2wyb2.height / syt2wyb2.width;
      if (mouseX > xTła + 0.507 * tłoWidth && mouseX < xTła + 0.794 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.283 * tłoWidth*sratio){
        image(syt2wyb2,xTła + 0.507 * tłoWidth,0.392 * tłoWidth, 0.278*tłoWidth, 0.278*tłoWidth*sratio);
      }
    }
  }
  if (Stage===58){
    if (mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
      let strzalkaRatio = strzalka.width / strzalka.height;
      image(strzalka, xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio);
      let infoRatio=info6.width/info6.height;
    image(info6,xTła+0.597*tłoWidth,0.426*tłoWidth,0.274*tłoWidth, 0.274*tłoWidth/infoRatio);
  textFont('Verdana');
  textSize(0.02*tłoHeight);
  text("kliknij strzałkę i wróć do wyboru", xTła+0.612*tłoWidth, 0.447*tłoWidth, 0.24*tłoWidth);
    }
  }
  if (Stage>=59 && Stage<=64 || Stage===70 && Stage<79){
    let infoRatio=info4.width/info4.height;
    textFont('Verdana');
    textSize(0.02*tłoHeight); image(info4,xTła+0.041*tłoWidth,0.5*tłoWidth,0.47*tłoWidth,0.47*tłoWidth/infoRatio);
  }
  if (Stage===59){
    skalaStres=55;
    myśli=51;
    click=1;
    text("Czy widzisz teraz, jak ilość myśli wpływa na wynik przeżywanej przez postać sytuacji?",xTła+0.146*tłoWidth,0.516*tłoWidth,0.35*tłoWidth)
  }
  if (Stage===60){
    text("Gdy myśli jest więcej, postać zaczyna się martwić, przez co czuje się gorzej i wzrasta jej stres.",xTła+0.146*tłoWidth,0.517*tłoWidth,0.35*tłoWidth)
  }
  if (Stage===61){
    text("Pilnuj więc, żeby myśli nie było zbyt dużo.",xTła+0.146*tłoWidth,0.525*tłoWidth,0.35*tłoWidth)
  }
  if (Stage===62){
    text("Na sytuacje wpływa ilość myśli większa od 50.",xTła+0.146*tłoWidth,0.525*tłoWidth,0.35*tłoWidth)
  }
  if (Stage===63){
    text("To znaczy, że gdy ilość myśli przekroczy 50, historia postaci zmieni się, tak jak w eksperymencie przed chwilą.",xTła+0.146*tłoWidth,0.51*tłoWidth,0.35*tłoWidth)
  }
  if (Stage===64){
    text("Zwiększy się też stres postaci.",xTła+0.146*tłoWidth,0.525*tłoWidth,0.35*tłoWidth)
  }
  if (Stage>=65 && Stage<70){
    textFont('Verdana');
    textSize(0.02*tłoHeight); 
    let x15Ratio = x15.width/x15.height;
    image(warning,xTła+0.015*tłoWidth,0.21*tłoWidth,0.048*tłoWidth,0.048*tłoWidth);
    if (Stage>=67 && Stage<=69){
    image(x15,xTła+0.016*tłoWidth,0.272*tłoWidth,0.048*tłoWidth,0.048*tłoWidth);
      let info7Ratio = info7.width/info7.height;
     image(info7,xTła+0.08*tłoWidth,0.267*tłoWidth,0.38*tłoWidth,0.38*tłoWidth/info7Ratio);
    }
  }
  if (Stage===65){
    Stage=66;
  }
  if (Stage===66){
    let info7Ratio = info7.width/info7.height;
     image(info7,xTła+0.08*tłoWidth,0.205*tłoWidth,0.38*tłoWidth,0.38*tłoWidth/info7Ratio);
    text("Jeśli ilość myśli przekroczy 50 i historia, jaką przeżyje postać, się zmieni, zobaczysz takie ostrzeżenie.",xTła+0.117*tłoWidth,0.213*tłoWidth,0.33*tłoWidth);
  }
  
  if (Stage===67){
    text("Jednak nie tylko historia się wtedy zmienia. Stres również rośnie.",xTła+0.12*tłoWidth,0.283*tłoWidth,0.33*tłoWidth);
  }
  if (Stage===68){
    text("Takie ostrzeżenie mówi, że cały stres zdobyty w tej sytuacji zwiększy się 1,5 razy.",xTła+0.12*tłoWidth,0.283*tłoWidth,0.33*tłoWidth)
  }
  if (Stage===69){
    image(x2,xTła+0.016*tłoWidth,0.272*tłoWidth,0.048*tłoWidth,0.048*tłoWidth);
    text("Takie ostrzeżenie pojawi się za to, gdy ilość myśli przekroczy 75 i stres mnożony będzie razy 2.",xTła+0.12*tłoWidth,0.282*tłoWidth,0.33*tłoWidth)
  }

  if (Stage===70){
    warnings = true;
    text("Wróćmy więc do sytuacji sprzed naszego eksperymentu.",xTła+0.146*tłoWidth,0.516*tłoWidth,0.35*tłoWidth)
  }
  
  if (Stage===71){
    let infoRatio=info4.width/info4.height;
    textFont('Verdana');
    textSize(0.02*tłoHeight); image(info4,xTła+0.041*tłoWidth,0.472*tłoWidth,0.47*tłoWidth,0.47*tłoWidth/infoRatio);
    text("Od teraz to Ty będziesz decydować, której karty użyjesz.",xTła+0.143*tłoWidth,0.49*tłoWidth,0.35*tłoWidth);
    karty();
  }
  if (Stage>=72 && Stage<=75){
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    let cratio = circle1.width/circle1.height;
    let iratio = info6.width/info6.height;
    let oddechRatio=oddech.width/oddech.height;         image(oddech,xTła+0.13*tłoWidth,0.37*tłoWidth,0.7*tłoWidth,0.7*tłoWidth/oddechRatio);
    if (Stage===72){
      image(circle1,xTła+0.246*tłoWidth,0.375*tłoWidth,0.05*tłoWidth, 0.05*tłoWidth/cratio);
      image(info6, xTła+0.016*tłoWidth, 0.28*tłoWidth, 0.3*tłoWidth, 0.3*tłoWidth/iratio);
      text("Tu znajdziesz koszt karty. Do zapłaty przydadzą Ci się punkty, które widzisz w prawym górnym rogu ekranu.",xTła+0.03*tłoWidth,0.295*tłoWidth,0.28*tłoWidth);
  }
    if (Stage===73){
      image(info5, xTła+0.67*tłoWidth, 0.07*tłoWidth, 0.3*tłoWidth, 0.3*tłoWidth/iratio);
      text("Punkty to twoje zasoby umysłu.",xTła+0.692*tłoWidth,0.114*tłoWidth,0.28*tłoWidth);
    }
    if (Stage===74){
      image(info5, xTła+0.67*tłoWidth, 0.07*tłoWidth, 0.3*tłoWidth, 0.3*tłoWidth/iratio);
      text("Gdy masz ich wystarczająco, jesteś w stanie zamiast automatycznie reagować na stres, wykonać technikę na karcie.",xTła+0.685*tłoWidth,0.101*tłoWidth,0.28*tłoWidth);
    }
    if (Stage===75){
      image(circle1,xTła+0.219*tłoWidth,0.51*tłoWidth,0.05*tłoWidth, 0.05*tłoWidth/cratio);
      image(circle1,xTła+0.235*tłoWidth,0.575*tłoWidth,0.05*tłoWidth, 0.05*tłoWidth/cratio);
      image(info6, xTła+0.005*tłoWidth, 0.38*tłoWidth, 0.3*tłoWidth, 0.3*tłoWidth/iratio);
      text("Tu widzisz, jak zmienią się ilość myśli i stres po użyciu karty.",xTła+0.02*tłoWidth,0.4*tłoWidth,0.28*tłoWidth);
      image(info6,xTła+0.51*tłoWidth,0.43*tłoWidth,0.32*tłoWidth,0.32*tłoWidth/iratio);
      text("Grając, zwracaj uwagę na te liczby na karcie STOP. Zauważysz, że przy wysokim poziomie myśli liczby mogą się na niej zmienić :)",xTła+0.523*tłoWidth,0.444*tłoWidth,0.3*tłoWidth); 
    }
  }
  if (Stage>=76 && Stage<79){
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    let infoRatio=info4.width/info4.height;  image(info4,xTła+0.041*tłoWidth,0.472*tłoWidth,0.47*tłoWidth,0.47*tłoWidth/infoRatio);
    if (Stage===76){
    text("Możesz użyć karty przed każdym wyborem postaci. Opcja ta pojawi się 3 razy w trakcie całej gry. Karty pojawią się wtedy na ekranie. ",xTła+0.143*tłoWidth,0.482*tłoWidth,0.35*tłoWidth);
    }
    if (Stage===77){
      text("Nie musisz jednak wybierać żadnej. Możesz od razu kliknąć wybraną opcję i przejść do dalszej części historii. ",xTła+0.143*tłoWidth,0.482*tłoWidth,0.35*tłoWidth);
    }
    if (Stage===78){
      click=0;
      text("Czas na Twój ruch. Wybierz opcję lub zagraj jedną z kart. ",xTła+0.143*tłoWidth,0.488*tłoWidth,0.35*tłoWidth);
      wybórKarty = true;
      let sratio = syt2wyb1.height / syt2wyb1.width;
      if (mouseX > xTła + 0.205 * tłoWidth && mouseX < xTła + 0.488 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.283 * tłoWidth*sratio){
        image(syt2wyb1,xTła + 0.204 * tłoWidth,0.392 * tłoWidth, 0.278*tłoWidth, 0.278*tłoWidth*sratio)
      } 
    if (mouseX > xTła + 0.514 * tłoWidth && mouseX < xTła + 0.794 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.283 * tłoWidth*sratio){
        image(syt2wyb2,xTła + 0.507 * tłoWidth,0.392 * tłoWidth, 0.278*tłoWidth, 0.278*tłoWidth*sratio) 
      }
    }
    
    karty(); //wyświetla karty

  }
  if (Stage===80){
    click=0; 
    scrollY = 1550;
    
    let sratio = syt2wyb1.height / syt2wyb1.width;
      if (mouseX > xTła + 0.204 * tłoWidth && mouseX < xTła + 0.488 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.278 * tłoWidth*sratio){
        image(syt2wyb1,xTła + 0.204 * tłoWidth,0.392 * tłoWidth, 0.278*tłoWidth, 0.278*tłoWidth*sratio)
      } if (mouseX > xTła + 0.507 * tłoWidth && mouseX < xTła + 0.794 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.392 * tłoWidth + 0.283 * tłoWidth*sratio){
        image(syt2wyb2,xTła + 0.507 * tłoWidth,0.392 * tłoWidth, 0.278*tłoWidth, 0.278*tłoWidth*sratio)
      }
  }
  if (Stage===81){
    if (mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
      let strzalkaRatio = strzalka.width / strzalka.height;
      image(strzalka, xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio);
    }
  }
  if (Stage===82){
    click = 1;
    startmyśli = myśli;
    scrolling = 'off';
    startstres = skalaStres;
  }


  if (Stage===83){
    let oratio = osoba32.width/osoba32.height;
    image(osoba32, width/2-0.125*tłoWidth ,tłoHeight/2-0.125*tłoWidth, 0.25*tłoWidth,0.25*tłoWidth/oratio)
    textSize(0.02*tłoWidth);
    textFont('Verdana');
    let w = textWidth(imie1);
    text(imie3, width/2 - w/2, 0.437*tłoWidth);
  }
  if (Stage===84 && doonce === 0){
    scrolling = 'on'
    scrollY = -600;
    dzień41page.textSize(30);
    dzień41page.textFont('Verdana');
    let w2 = dzień41page.textWidth(imie2);
    dzień41page.text(imie2, 270 - w2/2, 495);
    let w3 = dzień41page.textWidth(imie3);
    dzień41page.text(imie3, 1675 - w3/2, 885);
    dzień41page.text(imie2, 269 - w2/2, 1642);
    let w1 = dzień41page.textWidth(imie1);
    dzień41page.textSize(37);
    dzień41page.text(imie1+"?!", 205, 2184);
    dzień41page.textSize(40);
    dzień41page.textFont(Neucha);
    if (zaimki1==='a'){
      dzień41page.text("jej",846,356)
    } else {
      dzień41page.text("go",846,356)
    }
    if (zaimki1==='a'){
      dzień41page.text("ona",1438,1142);
    } else if (zaimki1==='e'){
      dzień41page.text("on",1438,1142);
    } else if (zaimki1==='o'){
      dzień41page.text("ono",1438,1142);
    }
    if (zaimki1!="e"){
    dzień41page.text(zaimki1,699,2509);
    }
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage===85 && doonce === 0){
    scrollY = -200;
    scrollMax = scrollY;
    doonce++; 
    skalaStres+=S;
    myśli+=S;
  }
   if (Stage===86 && doonce === 0){
    scrollY = 100;
    scrollMax = scrollY;
    doonce++;
    skalaStres+=S;
    myśli+=M;
  }
  if (Stage===87 && doonce === 0){
    scrollY = 550;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage===88 && doonce === 0){
    scrollY = 800;
    scrollMax = scrollY;
    doonce++;
    myśli+=S;
  }
  if (Stage===89 && doonce === 0){
    scrollY = 950;
    scrollMax = scrollY;
    doonce++;
    skalaStres+=S;
    myśli+=S;
  }
  if (Stage===90 && doonce === 0){
    scrollY = 1100;
    scrollMax = scrollY;
    doonce++;
    skalaStres+=S;
    myśli+=L;
  }
  if (Stage===91){
    if(doonce === 0){
    click = 0;
    scrollY = 1700;
    scrollMax = scrollY;
    doonce++;
    wybórKarty = true;
    }
    if (mouseX>xTła+0.207*tłoWidth && mouseY>0.372*tłoWidth && mouseX<xTła+0.474*tłoWidth && mouseY<0.473*tłoWidth){
      iratio=dzień41wyb1.width/dzień41wyb1.height;
    image(dzień41wyb1,xTła+0.205*tłoWidth, 0.37*tłoWidth, 0.277*tłoWidth,0.277*tłoWidth/iratio);
      if (zaimki1!="e"){
    textSize(0.025*tłoHeight);
    text(zaimki1,xTła+0.386*tłoWidth,0.421*tłoWidth);
    }
  }
    if (mouseX>xTła+0.508*tłoWidth && mouseY>0.369*tłoWidth && mouseX<xTła+0.787*tłoWidth && mouseY<0.473*tłoWidth){
      iratio=dzień41wyb2.width/dzień41wyb2.height;
    image(dzień41wyb2,xTła+0.508*tłoWidth, 0.369*tłoWidth, 0.277*tłoWidth,0.277*tłoWidth/iratio);
    }
    
    karty();
  }
  if(Stage===93){
    Stage=94;
  }
  if (Stage===95){
     if (mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
      let strzalkaRatio = strzalka.width / strzalka.height;
      image(strzalka,xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio)
    }
      textFont('Verdana');
      textSize(0.02*tłoHeight);
      if (wyb===1){
      if (myśli<=50){
        text("Ok, będzie dobrze. Macie plan. Możesz już się uspokoić. To było dużo myśli, ale czujesz się bezpieczniej, kiedy one trochę ustają. Czas działać. Zaczynacie robić prezentację.", xTła+0.317*tłoWidth,0.19*tłoWidth,0.36*tłoWidth)
      } else {
        text("Ok, będzie dobrze. Macie plan. Możesz już się uspokoić. Ale co jak wam nie wyjdzie? Co jak wykładowca nie zrozumie? Czemu te sytuacje muszą się przytrafiać właśnie tobie? Znacie się przecież od dawna. " + imie1 + " wie jak ważny jest dla Ciebie ten projekt. Widzieliście się przecież wczoraj! Czemu nie pamięta o waszym spotkaniu? Ale teraz czas działać. Zaczynacie robić prezentację.", xTła+0.317*tłoWidth,0.16*tłoWidth,0.36*tłoWidth)
      }
    } else if (wyb===2){
      if (myśli<=50){
        text("Ok, będzie dobrze. Macie plan. Możesz już się uspokoić. To było dużo myśli, ale czujesz się bezpieczniej, kiedy one trochę ustają. Nie masz wpływu na to, co robi " + imie1 + ". Skupisz się na tym, na co wpływ masz. Kiedy myślisz jest mniej, możesz głęboko odetchnąć. Będzie co będzie, ale sobie poradzisz. ", xTła+0.317*tłoWidth,0.17*tłoWidth,0.36*tłoWidth)
      } else {
        text("Ok, będzie dobrze. Macie plan. Możesz już się uspokoić. Ale co jak wam nie wyjdzie? Co jak " + imie1 + " się nie odezwie? Co jak nie zdążycie? Nie powinieneś teraz o tym myśleć. Nie masz na to wpływu. Ale czemu te sytuacje muszą się przytrafiać właśnie tobie? Znacie się przecież od dawna. " +imie1 + " wie jak ważny jest dla Ciebie ten projekt. Widzieliście się przecież wczoraj! Czemu nie pamięta?", xTła+0.317*tłoWidth,0.16*tłoWidth,0.36*tłoWidth)
      }
    }
  stresadded = skalaStres-startstres;
    textFont(Neucha);
    textSize(0.03*tłoWidth);
    if (stresadded>=0){
      text("+ "+stresadded,xTła+0.38*tłoWidth,0.445*tłoWidth);
    } else {
      text("- "+stresadded*(-1),xTła+0.38*tłoWidth,0.445*tłoWidth);
    }
  let myśliadded = myśli-startmyśli;
    if (myśliadded>=0){
      text("+ "+myśliadded,xTła+0.57*tłoWidth,0.445*tłoWidth);
    } else {
      text("- "+myśliadded*(-1),xTła+0.57*tłoWidth,0.445*tłoWidth);
    }
  }
  
  if (Stage===96){
    startstres = skalaStres;
    startmyśli = myśli;
    click = 1;
    let oratio = osoba12.width/osoba12.height;
    image(osoba12, width/2-0.125*tłoWidth ,tłoHeight/2-0.125*tłoWidth, 0.25*tłoWidth,0.25*tłoWidth/oratio)
    textSize(0.02*tłoWidth);
    textFont('Verdana');
    let w = textWidth(imie1);
    text(imie1, width/2 - w/2, 0.437*tłoWidth);
  }
  if (Stage===97 && doonce === 0){
    click=0;
    scrolling = 'on'
    dzień42page.textSize(40);
    dzień42page.textFont(Neucha);
    dzień42page.text(zaimki1,190,3564);
    dzień42page.text(zaimki2,626,2597);
    dzień42page.text(zaimki1,1206,3027);
    if (zaimki2 === "a" && zaimki2 === 'a'){
      dzień42page.text('one',94,3710);
    } else {
      dzień42page.text('oni',94,3710);
    }
    if (zaimki1 === 'o'){
    dzień42page.text('e',288,104)
    } 
    if (zaimki1 === 'e'){
        dzień42page.text('y',288,104)
    }
    if (zaimki1 === 'a'){
    dzień42page.text(zaimki1,288,104)
    }
    dzień42page.textSize(30);
    dzień42page.textFont("Verdana");
    let w2 = dzień42page.textWidth(imie2);
    dzień42page.text(imie2, 263 - w2/2, 788);
    let w3 = dzień42page.textWidth(imie3);
    dzień42page.text(imie3, 263 - w3/2, 1178);
    dzień42page.text(imie3, 263 - w3/2, 1570);
    dzień42page.text(imie3, 263 - w3/2, 1954);
    dzień42page.text(imie3, 263 - w3/2, 2346);
    dzień42page.text(imie2, 263 - w2/2, 2738);
    dzień42page.text(imie2, 263 - w2/2, 3172);
    let w1 = dzień42page.textWidth(imie1);
    dzień42page.textSize(37);
    dzień42page.text(imie1+"?", 681, 1423);
    dzień42page.text(imie1 + ",", 479, 2983);
    doonce++;
    click=1;
  }
  if (Stage===98 && doonce === 0){
    scrolling = 'on';
    scrollY = -700;
    scrollMax = scrollY;
    scrollMax = 3500;
    myśli+=S
    doonce++;
  }
  if (Stage===99 && doonce === 0){
    scrollY = -300;
    scrollMax = scrollY;
    skalaStres+=M
    myśli+=M
    doonce++;
  }
  if (Stage===100 && doonce === 0){
    scrollY = 100;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage===101 && doonce === 0){
    scrollY = 500;
    scrollMax = scrollY;
    skalaStres+=S
    myśli+=S
    doonce++;
  }
  if (Stage===102 && doonce === 0){
    scrollY = 900;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage===103 && doonce === 0){
    scrollY = 1300;
    scrollMax = scrollY;
    skalaStres+=S
    myśli+=M
    doonce++;
  }
  if (Stage===104 && doonce === 0){
    scrollY = 1700;
    scrollMax = scrollY;
    doonce++;
  }
  if (Stage===105 && doonce === 0){
    scrollY = 2100;
    scrollMax = scrollY;
    skalaStres+=S
    myśli+=S
    doonce++;
  }
  if (Stage===106 && doonce === 0){
    scrollY = 2320;
    scrollMax = scrollY;
    myśli+=S
    doonce++;
  }
  if (Stage===107 && doonce === 0){
    scrollY = 2470;
    scrollMax = scrollY;
    skalaStres+=S
    doonce++;
  }
  if (Stage===108 && doonce === 0){
    scrollY = 2610;
    scrollMax = scrollY;
    myśli+=L
    doonce++;
  }
  if (Stage===109 && doonce === 0){
    scrollY = 2780;
    scrollMax = scrollY;
    myśli+=M
    doonce++;
  }
  if (Stage===110){
    if (doonce===0){
    scrolling = 'off'
    scrollY = 3500;
    scrollMax = scrollY;
    click = 0;
    wybórKarty = true;
    myśli+=S
    doonce++;
    }
    
    if (mouseX > xTła + 0.18 * tłoWidth && mouseX < xTła + 0.18 * tłoWidth + (dzień42odp1.width * 0.8 * tłoWidth / dzień42page.width) && mouseY > 0.4 * tłoWidth && mouseY < 0.4 * tłoWidth + (dzień42odp1.height * 0.8 * tłoWidth / dzień42page.width)){
    image(dzień42odp1c2, xTła+0.18*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width)
    } else {
    image(dzień42odp1, xTła+0.18*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width);
    }
    
    if (myśli<=75){
      
      if (mouseX > xTła + 0.53 * tłoWidth && mouseX < xTła + 0.53 * tłoWidth + (dzień42odp1.width * 0.8 * tłoWidth / dzień42page.width) && mouseY > 0.4 * tłoWidth && mouseY < 0.4 * tłoWidth + (dzień42odp1.height * 0.8 * tłoWidth / dzień42page.width)) {
      image(dzień42odp22c2, xTła+0.53*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width);
      }else{
      image(dzień42odp22, xTła+0.53*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width);
      }
      
    } else {
      
      if (mouseX > xTła + 0.53 * tłoWidth && mouseX < xTła + 0.53 * tłoWidth + (dzień42odp1.width * 0.8 * tłoWidth / dzień42page.width) && mouseY > 0.4 * tłoWidth && mouseY < 0.4 * tłoWidth + (dzień42odp1.height * 0.8 * tłoWidth / dzień42page.width)) {
      image(dzień42odp21c2, xTła+0.53*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width);
      }else{
    image(dzień42odp21, xTła+0.53*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width);
      }
      
    }
    
    karty();
  }
  if (Stage===112){
    image(dzień42odp1, xTła+0.18*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width)
    if (myśli<=75){
      image(dzień42odp22, xTła+0.53*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width)
    } else {
    image(dzień42odp21, xTła+0.53*tłoWidth, 0.4*tłoWidth, dzień42odp1.width*0.8*tłoWidth/dzień42page.width, dzień42odp1.height*0.8*tłoWidth/dzień42page.width)
    }
  }
  if (Stage===113){
    scrolling = 'on'
    click=0;
    if (scrollY <= -950){ 
      let iRatio=info4.width/info4.height;
                               image(info4,xTła+0.137*tłoWidth,0.131*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("Przewijaj stronę kółkiem myszy lub palcem po touchpadzie.",xTła+0.234*tłoWidth,0.145*tłoWidth,0.32*tłoWidth);
      startstres = skalaStres;
      startmyśli = myśli;
    }
    if (wyb===1 && doonce1===0){
      if (myśli<=50){
        scrollMax = 2600
        dzień42wynik11page.textSize(30);
        dzień42wynik11page.textFont('Verdana');
        let w1 = dzień42wynik11page.textWidth(imie1);
        let w2 = dzień42wynik11page.textWidth(imie2);
        dzień42wynik11page.text(imie1,1667-w1/2,605);
        dzień42wynik11page.text(imie1,1663-w1/2,1133);
        dzień42wynik11page.text(imie1,1661-w1/2,3653);
        dzień42wynik11page.text(imie2,263-w2/2,2502);
        dzień42wynik11page.text(imie2,259-w2/2,2944);
        dzień42wynik11page.textSize(40);
        dzień42wynik11page.textFont(Neucha);
        dzień42wynik11page.text(zaimki1,1166,412);
      }else {
        scrollMax = 2250
        dzień42wynik12page.textSize(40);
        dzień42wynik12page.textFont(Neucha);
        if (zaimki2==='a' && zaimki3==='a'){
          dzień42wynik12page.text("e",535,237);
        } else{
          dzień42wynik12page.text("i",535,237);
        }
        dzień42wynik12page.text(zaimki1,1295,238);
        dzień42wynik12page.text(zaimki1,1181,543);
        if (zaimki2==='a'){
          dzień42wynik12page.text('ona',380,3323);
          dzień42wynik12page.text(zaimki2,682,3321);
          dzień42wynik12page.text(zaimki2,1252,3323);
        } else if (zaimki2==="e"){
          dzień42wynik12page.text('on',380,3323);
        } if (zaimki2==='o'){
          dzień42wynik12page.text('ono',380,3323);
          dzień42wynik12page.text(zaimki2,682,3321);
          dzień42wynik12page.text('e',1252,3323);
        }
        if (zaimki2 === 'e'){
          dzień42wynik12page.text('y',1255,3320);
        }
        dzień42wynik12page.textSize(30);
        dzień42wynik12page.textFont('Verdana');
        
        let w1 = dzień42wynik12page.textWidth(imie1);
        dzień42wynik12page.text(imie1,1680-w1/2,735);
        dzień42wynik12page.text(imie1,1680-w1/2,1260);
        let w2 = dzień42wynik12page.textWidth(imie3);
        dzień42wynik12page.text(imie2,270-w2/2,2494);
        dzień42wynik12page.text(imie2,270-w2/2,2935);
        zaimki2='o'
      }
      doonce1++
    }
    if (wyb===2 && doonce1===0){
      if (myśli<=50){
        scrollMax = 700
        dzień42wynik21page.textSize(40);
        dzień42wynik21page.textFont(Neucha);
        dzień42wynik21page.text(zaimki1,205,238);
        dzień42wynik21page.text(zaimki1,1121,371);
        dzień42wynik21page.text(zaimki1,1158,818);
        if (zaimki1==='o'){
          dzień42wynik21page.text('e',1339,1260);
        } else if (zaimki1==='e'){
        dzień42wynik21page.text('y',1339,1260);
        } else {
          dzień42wynik21page.text(zaimki1,1339,1260);
        }
        dzień42wynik21page.text(zaimki1,1279,817);
        if (zaimki1==='o'){
          dzień42wynik21page.text('e',286,1740);
        } else if (zaimki1==='e'){
        dzień42wynik21page.text('y',286,1740);
        } else {
          dzień42wynik21page.text(zaimki1,286,1740);
        }
        dzień42wynik21page.textSize(30);
        dzień42wynik21page.textFont('Verdana');
        let w1 = dzień42wynik21page.textWidth(imie1);
        dzień42wynik21page.text(imie1,1676-w1/2,1011);
        dzień42wynik21page.text(imie1,1676-w1/2,1488);
      }else {
        scrollMax = -700
      }
      doonce1++;
    }
    if (scrollY === scrollMax){
      let sratio = strzalka.width/strzalka.height;
      image(strzalka, xTła+0.83*tłoWidth, 0.6*tłoWidth,0.05*tłoWidth,0.05*tłoWidth/sratio)
      if (mouseX>xTła+0.83*tłoWidth && mouseX<xTła+0.88*tłoWidth && mouseY>0.6*tłoWidth && mouseY<0.634*tłoWidth){
        image(strzalka2, xTła+0.83*tłoWidth, 0.6*tłoWidth,0.05*tłoWidth,0.05*tłoWidth/sratio)
      }
    }
  }
  
  if (Stage===114){
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("To tyle. Nadszedł dzień prezentacji. Daliście z siebie wszystko. Zobaczmy, jak z jej wynikiem czują się bohaterowie tej historii", xTła+0.33*tłoWidth,0.209*tłoWidth,0.34*tłoWidth);
    if (mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
    let strzalkaRatio = strzalka.width / strzalka.height;
      image(strzalka,xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio)
    }
    stresadded = skalaStres-startstres;
    textFont(Neucha);
    textSize(0.03*tłoWidth);
    if (stresadded>=0){
      text("+ "+stresadded,xTła+0.38*tłoWidth,0.445*tłoWidth);
    } else {
      text("- "+stresadded*(-1),xTła+0.38*tłoWidth,0.445*tłoWidth);
    }
  let myśliadded = myśli-startmyśli;
    if (myśliadded>=0){
      text("+ "+myśliadded,xTła+0.57*tłoWidth,0.445*tłoWidth);
    } else {
      text("- "+myśliadded*(-1),xTła+0.57*tłoWidth,0.445*tłoWidth);
    }
    
  }
  
  if (Stage===115){
    click = 0;
    scrolling = "on";
    if (wynik===1 || wynik===0){
      scrollMax=3400
    }
    if (wynik===2){
      scrollMax=1500;
    }
    if (wynik===3){
      scrollMax=2200;
    }
    if (scrollY>=scrollMax-50){
      let sratio = strzalka.width/strzalka.height;
      image(strzalka, xTła+0.83*tłoWidth, 0.6*tłoWidth,0.05*tłoWidth,0.05*tłoWidth/sratio)
      if (mouseX>xTła+0.83*tłoWidth && mouseX<xTła+0.88*tłoWidth && mouseY>0.6*tłoWidth && mouseY<0.634*tłoWidth){
        image(strzalka2, xTła+0.83*tłoWidth, 0.6*tłoWidth,0.05*tłoWidth,0.05*tłoWidth/sratio)
    }
    }
  }
  if (Stage===116){
    image(ekranKoniec, xTła, 0, tłoWidth, tłoHeight); 
    textFont(Neucha);
    textSize(0.03*tłoWidth);
    text(skalaStres,xTła+0.388*tłoWidth,0.445*tłoWidth);
    text(myśli,xTła+0.577*tłoWidth,0.445*tłoWidth);
  }

  // Przejście do minigier
  if (dooddech){
    kartaoddech();
    doKarty=false;
  }
  if (dozmysły){
    kartaZmysly();
    doKarty=false;
  }
  if (domyśli){
    kartaMyśli();
    doKarty=false;
  }
  if (dostop){
    kartaStop();
    doKarty=false;
    }
  
  // Zablokowanie stresu i myśli do max 100
  if(skalaStres>100){
    skalaStres=100;
  }
  if(myśli>100){
    myśli=100;
  }
  
  fill(255);
  stroke(255);
  rect(0,tłoHeight,tłoWidth,height-tłoHeight);
}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mouseClicked(){
  
  if ((Stage===113 || Stage===115) && scrollY === scrollMax && mouseX>xTła+0.83*tłoWidth && mouseX<xTła+0.88*tłoWidth && mouseY>0.6*tłoWidth && mouseY<0.634*tłoWidth){
    Stage++;
    doonce=0;
  }
  
  if (Stage===110||Stage===112){
    if (mouseX>xTła+0.117*tłoWidth && mouseX<xTła+0.48*tłoWidth && mouseY>0.4*tłoWidth && mouseY<0.48*tłoWidth){
      if (myśli<=50){
        wynik++;
        print('4')
      }
        wyb = 1;
        Stage = 113;
        doonce = 0
        doonce1 = 0;
      }
      if (mouseX>xTła+0.53*tłoWidth && mouseX<xTła+0.83*tłoWidth && mouseY>0.4*tłoWidth && mouseY<0.48*tłoWidth){
        if (myśli<=50){
        wynik++;
      }
        wyb = 2;
        Stage = 113;
        doonce = 0;
        doonce1 = 0;
      }
  }
  if((Stage===95 || Stage===114) && mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
    doonce=0;
    wyb=0;
    if (myśli>50 && myśli<=75){
      skalaStres+=floor(1.5*stresadded);
    }
    if (myśli>75){
      skalaStres+=2*stresadded;
    }
    Stage++;
  }

  if (Stage===91 || Stage===94){
      if (mouseX>xTła+0.2*tłoWidth && mouseX<xTła+0.49*tłoWidth && mouseY>0.37*tłoWidth && mouseY<0.48*tłoWidth){
        if (myśli<=50){
        wynik++;
          print('1')
      }
        wyb = 1;
        Stage = 95;
        doonce = 0;
      }
      if (mouseX>xTła+0.51*tłoWidth && mouseX<xTła+0.8*tłoWidth && mouseY>0.37*tłoWidth && mouseY<0.48*tłoWidth){
        if (myśli<=50){
        wynik++;
          print('2')
      }
        wyb = 2;
        Stage = 95;
        doonce = 0;
      }
    }
  
  
  if (Stage === -1) {
    let bx = xTła+0.92*tłoWidth;
    let by = 0.91*tłoHeight;
    let bw = 0.048*tłoWidth;
    let bh = 0.04*tłoHeight;
    if (mouseX > bx && mouseX < bx + bw && mouseY > by && mouseY < by + bh){
      if (imie1 && imie2 && imie3 && zaimki1 && zaimki2 && zaimki3){
        Stage++;
        nodata = 0
      } else {
        nodata = 1
      }
    }
    for (let i = 0; i < buttonPositions.length; i++) {
      let b = buttonPositions[i];

      if (mouseX > b.ona[0] && mouseX < b.ona[0]+b.ona[2] && mouseY > b.ona[1] && mouseY < b.ona[1]+b.ona[3]) {
        toggles[i].ona = true;
        toggles[i].on = false;
        toggles[i].ono = false;
        
        if (i === 0) zaimki1 = "a";
        if (i === 1) zaimki2 = "a";
        if (i === 2) zaimki3 = "a";
      }

      if (mouseX > b.on[0] && mouseX < b.on[0]+b.on[2] && mouseY > b.on[1] && mouseY < b.on[1]+b.on[3]) {
        toggles[i].ona = false;
        toggles[i].on = true;
        toggles[i].ono = false;
        
        if (i === 0) zaimki1 = "e";
        if (i === 1) zaimki2 = "e";
        if (i === 2) zaimki3 = "e";
      }

      if (mouseX > b.ono[0] && mouseX < b.ono[0]+b.ono[2] && mouseY > b.ono[1] && mouseY < b.ono[1]+b.ono[3]) {
        toggles[i].ona = false;
        toggles[i].on = false;
        toggles[i].ono = true;
        
        if (i === 0) zaimki1 = "o";
        if (i === 1) zaimki2 = "o";
        if (i === 2) zaimki3 = "o";
      }
    }
  }
  if (Stage === 34 && click ===0){
    zmianaStage++;
  }
  if (Stage === 47 || Stage === 80 || Stage===78) {
    let wyb1W = 0.278 * tłoWidth;
    let wyb1H = wyb1W * (syt2wyb1.height / syt2wyb1.width);

    let wyb2W = 0.278 * tłoWidth;
    let wyb2H = wyb2W * (syt2wyb2.height / syt2wyb2.width);

    let X1 = xTła + 0.204 * tłoWidth;
    let wybY = 0.392 * tłoWidth;

    let X2 = xTła + 0.507 * tłoWidth;

    if (
      mouseX > X1 &&
      mouseX < X1 + wyb1W &&
      mouseY > wybY &&
      mouseY < wybY + wyb1H
    ) {
      Stage++;
      if (Stage===79){
        Stage=81;
      }
      doonce = 0;
      wyb = 1;
      if (myśli<=50){
        wynik++;
      }
    }

    if (
      mouseX > X2 &&
      mouseX < X2 + wyb2W &&
      mouseY > wybY &&
      mouseY < wybY + wyb2H
    ) {
      Stage++;
      if (Stage===79){
        Stage=81;
      }
      doonce = 0;
      wyb = 2;
      if (myśli<=50){
        skalaStres-=5;
        wynik++;
      }
    }
  }
  if (Stage === 50 && mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth) {
    Stage++;
    doonce = 0;
}
  if (oddechStage===1||mysliStage===1||zmyslyStage===1||stopStage===1){
    if (mouseX>xTła+0.292*tłoWidth && mouseX<xTła+0.47*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      oddechStage = 0;
      dooddech=false;
      mysliStage = 0;
      domyśli=false;
      zmyslyStage = 0;
      dozmysły=false;
      stopStage = 0;
      dostop=false;
      doonce = 0;
      Stage=Stage-1;
      
    }
    if (mouseX>xTła+0.5*tłoWidth && mouseX<xTła+0.68*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      if (oddechStage===1){
        oddechStage++;
        doonce = 0;
      }
      if (mysliStage===1){
        mysliStage++;
        doonce = 0;
      }
      if (zmyslyStage===1){
        zmyslyStage++;
        doonce = 0;
      }
      if (stopStage===1){
        doonce = 0;
        stopStage++;
      }
    }
  }
  
  if (oddechStage===2){
    if(mouseX>xTła+0.42*tłoWidth && mouseX<xTła+0.58*tłoWidth && mouseY>0.42*tłoWidth && mouseY<0.47*tłoWidth){
      oddechStage++;
    }
  }
  if (oddechStage===4){
    oddechStage=0;
    dooddech=false;
    doonce=0;
    Stage++
  }
  if(Stage===57){
    let sratio = syt2wyb2.height / syt2wyb2.width;
    if (wyb === 1 && mouseX > xTła + 0.205 * tłoWidth && mouseX < xTła + 0.488 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.283 * tłoWidth*sratio){
      Stage++;
    }
    if (wyb === 2 && mouseX > xTła + 0.514 * tłoWidth && mouseX < xTła + 0.794 * tłoWidth && mouseY > 0.394 * tłoWidth && mouseY < 0.394 * tłoWidth + 0.283 * tłoWidth*sratio){
      Stage++;
    } 
  }
  if ((Stage===58||Stage===81) && mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
     if (Stage===81 && myśli>50 && myśli<=75){
      skalaStres+=floor(1.5*stresadded);
    }
    if (Stage===81 && myśli>75){
      skalaStres+=2*stresadded;
    }
    
    Stage++;
    wyb=0;
  }
  if (mysliStage===2 && mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
    mysliStage++;
    doonce = 0;
  }
  if (mysliStage===4){
    mysliStage=0;
    Stage++;
    domyśli=false;
    doonce=0;
  }
  if (zmyslyStage===3){
    zmyslyStage=0;
    Stage++;
    dozmysły=false;
    doonce=0;
  }
  if(zmyslyStage===2){
    if(mouseX>xTła+0.2*tłoWidth && mouseX<xTła+0.3*tłoWidth && mouseY>0.3*tłoWidth && mouseY<0.38*tłoWidth){
      wzrokdone = true;
    }
    if(mouseX>xTła+0.35*tłoWidth && mouseX<xTła+0.45*tłoWidth && mouseY>0.44*tłoWidth && mouseY<0.526*tłoWidth){
      sluchdone = true;
    }
    if(mouseX>xTła+0.5*tłoWidth && mouseX<xTła+0.6*tłoWidth && mouseY>0.28*tłoWidth && mouseY<0.373*tłoWidth){
      dotykdone = true;
    }
    if(mouseX>xTła+0.7*tłoWidth && mouseX<xTła+0.8*tłoWidth && mouseY>0.4*tłoWidth && mouseY<0.5*tłoWidth){
      zapachdone = true;
    }
  }
  if(stopStage===2){
    if (mouseX>xTła+0.355*tłoWidth && mouseX<xTła+0.644*tłoWidth && mouseY>0.33*tłoWidth && mouseY<0.413*tłoWidth){
      doonce = 0;
      stopStage++;
    }
  }
  
  if (stopStage===4 && mouseX>xTła+0.82*tłoWidth && mouseX<xTła+0.87*tłoWidth && mouseY>0.538*tłoWidth && mouseY<0.572*tłoWidth){
    if (int(ilość) === ilePomarańczowych){
      stopStage++;
      doonce = 0;
      błąd = false;
    }else{
      błąd = true;
    }
  } else if (stopStage===5){
    stopStage=0;
    Stage++;
    dostop = false;
    doonce=0;
  }
  if (doKarty){
    if (mouseX>=xTła+0.2*tłoWidth && mouseX<xTła+0.37*tłoWidth && pkt>=10) {
      Stage++;
      dooddech = true;
      doonce=0;
    }
    if (mouseX>=xTła+0.37*tłoWidth && mouseX<xTła+0.52*tłoWidth && pkt>=15) {
      Stage++;
      domyśli = true;
      doonce=0;
    }
    if (mouseX>=xTła+0.52*tłoWidth && mouseX<xTła+0.677*tłoWidth && pkt>=10) {
      Stage++;
      dozmysły = true;
      doonce=0;
    }
    if (mouseX>=xTła+0.677*tłoWidth && mouseX<xTła+0.836*tłoWidth && pkt>=25) {
      Stage++;
      dostop = true;
      doonce=0;
    }
  }
  if (click === 1) {
    Stage++;
    doonce = 0;
  } else if (Stage===54){
    if (mouseX>=xTła+0.2*tłoWidth && mouseX<xTła+0.37*tłoWidth && mouseY>=0.55*tłoWidth){
    Stage++;
    doonce=0;
    }
  }
  
  if (mouseX > pStartX && mouseX < pStartX + pStartW && mouseY > pStartY && mouseY < pStartY + pStartH && Stage===-2){
    Stage++;
    fullscreen(true);
  }
    if (Stage===11 && click===0){
    click=1;
  }
}

//opcja ponownego wejścia w fullscreen
function keyPressed() {
  if (key === 'f') {
    fullscreen(true);
  }
}

function mouseWheel(event) {
  if (scrolling === 'on'){
    scrollY += event.delta;
    scrollY = constrain(scrollY, -1000, scrollMax);
  }
  return false; 
}

// Wyświetlanie kart i umożliwienie przejścia do minigry (zmienna doKarty)
function karty(){
  if (mouseY>=0.55*tłoWidth){
    if (wybórKarty){
      doKarty=true;
    }
    if (mouseX>=xTła+0.2*tłoWidth && mouseX<xTła+0.37*tłoWidth){
      let oddechRatio=oddech.width/oddech.height;
      image(oddech,xTła+0.13*tłoWidth,0.37*tłoWidth,0.7*tłoWidth,0.7*tłoWidth/oddechRatio);
    }else if (mouseX>=xTła+0.37*tłoWidth && mouseX<xTła+0.52*tłoWidth){
      let mysliRatio=mysli.width/mysli.height;
      image(mysli,xTła+0.179*tłoWidth,0.38*tłoWidth,0.65*tłoWidth,0.65*tłoWidth/mysliRatio);
    } else if (mouseX>=xTła+0.52*tłoWidth && mouseX<xTła+0.677*tłoWidth){
      let zmyslyRatio=zmysly.width/zmysly.height;
      image(zmysly,xTła+0.179*tłoWidth,0.386*tłoWidth,0.65*tłoWidth,0.65*tłoWidth/zmyslyRatio);
    }else if (mouseX>=xTła+0.677*tłoWidth && mouseX<xTła+0.836*tłoWidth){
      let stopRatio=stop1.width/stop1.height;
      if (myśli<=75){
      image(stop1,xTła+0.13*tłoWidth,0.37*tłoWidth,0.72*tłoWidth,0.72*tłoWidth/stopRatio);
      } else {
        image(stop2,xTła+0.13*tłoWidth,0.37*tłoWidth,0.72*tłoWidth,0.72*tłoWidth/stopRatio);
      }
    }else {
      let kartyRatio=karty1.width/karty1.height;
      image(karty1,xTła+0.13*tłoWidth,0.37*tłoWidth,0.7*tłoWidth,0.7*tłoWidth/kartyRatio);
    }
  } else {
    let kartyRatio=karty1.width/karty1.height;
    if (wybórKarty)
    {
      doKarty=false
    }
    image(karty1,xTła+0.13*tłoWidth,0.37*tłoWidth,0.7*tłoWidth,0.7*tłoWidth/kartyRatio);
  }
}

// MINIGRA ODDECH
function kartaoddech(){
  if (doonce===0 && oddechStage===0){
    oddechStage=1;
    doonce1 = 0;
    click=0;
    cycleCount=0;
    animDone = false;
    doonce++;
  }
  if (oddechStage===1){
    let oratio = oddechGra1.width/oddechGra1.height;
    image(oddechGra1, xTła + tłoWidth/2 - 0.3*tłoWidth, 0.15*tłoWidth, 0.6*tłoWidth,0.6*tłoWidth/oratio);
    if (mouseX>xTła+0.292*tłoWidth && mouseX<xTła+0.47*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(wroc, xTła + 0.286*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
    }
    if (mouseX>xTła+0.5*tłoWidth && mouseX<xTła+0.68*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(uzyj, xTła + 0.5*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
  }
  }
  if (oddechStage===2){
    if (doonce===0){
      if (pierwszyraz===1){
          pkt-=10;
    } else {
      pierwszyraz=1;
    }
      doonce++
    }
    let pratio=pStart2.width/pStart2.height;
image(pStart1,xTła+0.41*tłoWidth,0.42*tłoWidth,0.18*tłoWidth,0.18*tłoWidth/pratio);
    iRatio=info4.width/info4.height;
    image(info4,xTła+0.137*tłoWidth,0.131*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("Oddychaj w rytm powiększającej się i zmniejszającej kuli.",xTła+0.234*tłoWidth,0.145*tłoWidth,0.32*tłoWidth);
    fill(76,152,192);
    circle(xTła+tłoWidth/2,0.34*tłoWidth,0.1*tłoWidth);
    fill(0);
    if (mouseX>xTła+0.41*tłoWidth && mouseX<xTła+0.59*tłoWidth && mouseY>0.42*tłoWidth && mouseY<0.476*tłoWidth){
      image(pStart2,xTła+0.41*tłoWidth,0.42*tłoWidth,0.18*tłoWidth,0.18*tłoWidth/pratio);
    }
  }
  if (oddechStage===3){
    if (doonce1===0){
    startTime = millis();
    doonce1++;
    }
    if (!animDone) {
      let elapsed = (millis() - startTime) / 1000.0;
      let cycleTime = elapsed % 12;
      cycleCount = floor(elapsed / 12);

      let minSize = 0.1 * tłoWidth;
      let maxSize = 0.4 * tłoWidth;
      let size;
      let tekst;
      if (cycleTime < 3) {
        size = map(cycleTime, 0, 3, minSize, maxSize);
        tekst = "wdech"
      }else if (cycleTime < 6) {
        size = maxSize;
        tekst = "stop"
      }else if (cycleTime < 9) {
        size = map(cycleTime, 6, 9, maxSize, minSize);
        tekst = "wydech"
      }else {
        size = minSize;
        tekst = "stop"
      }

    fill(76,152,192);
    circle(xTła+tłoWidth/2,0.34*tłoWidth, size);
    fill(255,250,238);
    textFont(Neucha);
    textSize(0.03*tłoWidth);
    textAlign(CENTER,CENTER);
    text(tekst, width/2,0.34*tłoWidth);
    textAlign(LEFT, BASELINE);
    if (cycleCount >= 3) {
      animDone = true;
      oddechStage++;
      doonce=0;
    }
    }
  }
  if (oddechStage===4){
    textAlign(CENTER,CENTER);
    textSize(0.07*tłoWidth);
    text("Gratulacje!",width/2,0.3*tłoWidth);
    textFont('Verdana');
    textSize(0.03*tłoHeight);
    text("Kliknij w ekran, żeby przejść dalej",0.5*width,0.4*tłoWidth);
    textAlign(LEFT, BASELINE);
    if (doonce===0){
      myśli-=10;
      skalaStres-=15;
      doonce++;
    }
  }
}

// MINIGRA MYŚLI
function kartaMyśli(){
  if (doonce===0 && mysliStage===0){
    mysliStage=1
    click=0;
    doonce++;
  }
  if (mysliStage===1){
    let mratio = mysliGra1.width/mysliGra1.height;
    image(mysliGra1, xTła + tłoWidth/2 - 0.3*tłoWidth, 0.15*tłoWidth, 0.6*tłoWidth,0.6*tłoWidth/mratio);
    if (mouseX>xTła+0.292*tłoWidth && mouseX<xTła+0.47*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(wroc, xTła + 0.286*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
    }
    if (mouseX>xTła+0.5*tłoWidth && mouseX<xTła+0.68*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(uzyj, xTła + 0.5*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
  }
  }
  
  if (mysliStage===2){
    let mratio=mysliGra2.width/mysliGra2.height;
image(mysliGra2,xTła + tłoWidth/2 - 0.36*tłoWidth, 0.15*tłoWidth, 0.72*tłoWidth,0.72*tłoWidth/mratio);
    if (doonce===0){
      pkt-=15;
      inputMysli.style('font-size', 0.034*height + 'px');
      inputMysli.size(0.4*width, 0.04*width);
      inputMysli.show();
      let inputX = width / 2 - inputMysli.width / 2;
      inputMysli.position(inputX, 0.222*tłoWidth);
      doonce++;
    }
    if (firstTime===1){
      let iRatio = info4.width/info4.height;
        image(info4,xTła+0.034*tłoWidth,0.558*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("Wpisz myśl, a potem wciśnij ENTER na klawiaturze",xTła+0.131*tłoWidth,0.572*tłoWidth,0.32*tłoWidth);
      }
    for (let mysl of wpisaneMysli) {
      mysl.move();
      mysl.display(alphaMysli);
    }
    if (wpisaneMysli.length > 0) {
      if (firstTime===1){
      let iRatio = info4.width/info4.height;
        image(info4,xTła+0.034*tłoWidth,0.558*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("Możesz wpisać więcej myśli lub kliknąć w strzałkę, aby przejść dalej.",xTła+0.131*tłoWidth,0.572*tłoWidth,0.32*tłoWidth);
      }
      let strzalkaRatio = strzalka.width / strzalka.height;
      image(strzalka2, xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio);
      if (mouseX > xTła + 0.808*tłoWidth && mouseX < xTła + 0.869*tłoWidth && mouseY > 0.512*tłoWidth && mouseY < 0.554*tłoWidth){
      image(strzalka, xTła + 0.808*tłoWidth, 0.512*tłoWidth, 0.061*tłoWidth, 0.061*tłoWidth/strzalkaRatio);
      }
    } 
    }    
  if (mysliStage===3){
    let mratio=mysliGra2.width/mysliGra2.height;
image(mysliGra2,xTła + tłoWidth/2 - 0.36*tłoWidth, 0.15*tłoWidth, 0.72*tłoWidth,0.72*tłoWidth/mratio);
    fill(245,234,208);
    textFont(Neucha);
    textSize(0.02*tłoHeight);
    rect(xTła+0.352*tłoWidth,0.16*tłoWidth,0.3*tłoWidth,0.03*tłoWidth);
    fill(0);
    if (wpisaneMysli.length > 1){
      let tratio=text2.width/text2.height;
    image(text2,xTła+tłoWidth/2-0.0075*tłoWidth*tratio, 0.165*tłoWidth, 0.015*tłoWidth*tratio, 0.015*tłoWidth);
    } else {
    let tratio=text1.width/text1.height;
    image(text1,xTła+tłoWidth/2-0.0075*tłoWidth*tratio, 0.165*tłoWidth, 0.015*tłoWidth*tratio, 0.015*tłoWidth);
    }
    inputMysli.hide();
    for (let mysl of wpisaneMysli) {
      mysl.move();
      mysl.display(alphaMysli);
    }
    if (doonce===0){
      czasZmianyStanu = frameCount;
      doonce++;
    }
    if (frameCount >= czasZmianyStanu + CZAS_CZEKANIA_KLATKI) {
      let postepZanikania = (frameCount -(czasZmianyStanu+CZAS_CZEKANIA_KLATKI)) / CZAS_ZANIKANIA_KLATKI;
    
    alphaMysli = 255 * (1 - postepZanikania); 

    if (postepZanikania >= 1) {
      wpisaneMysli = [];
      alphaMysli = 255;
      mysliStage++;
      doonce = 0;
    }
  }
}
  if (mysliStage===4){
    textAlign(CENTER,CENTER);
    textSize(0.07*tłoWidth);
    text("Gratulacje!",width/2,0.3*tłoWidth);
    textFont('Verdana');
    textSize(0.03*tłoHeight);
    text("Kliknij w ekran, żeby przejść dalej",0.5*width,0.4*tłoWidth);
    textAlign(LEFT, BASELINE);
    if (doonce===0){
      myśli-=20;
      skalaStres-=5;
      doonce++;
    }
  }

  
}

// Funkcja obsługująca zatwierdzenie tekstu wpisanego w input
function obsluzWprowadzenie() {
  let nowyTekst = inputMysli.value();
  if (nowyTekst.trim() !== "") { 
    wpisaneMysli.push(new Mysl(nowyTekst));
  }
  inputMysli.value('');
}

// Klasa reprezentująca pojedynczą, latającą chmurkę z myślą
class Mysl {
  constructor(tekst) {
    this.tekst = tekst;
    this.img = myslImg;
    this.w = 0.15 * tłoWidth;
    this.h = this.w * (this.img.height / this.img.width); 
    let rangeX = (MAX_X_AREA - MIN_X_AREA) * tłoWidth - this.w;
    let rangeY = (MAX_Y_AREA - MIN_Y_AREA) * tłoWidth - this.h;
    this.x = MIN_X_AREA * tłoWidth + random(rangeX);
    this.y = MIN_Y_AREA * tłoWidth + random(rangeY);
    this.vx = random(-1, 1); 
    this.vy = random(-1, 1);
  }

  // Metoda aktualizująca pozycję (animacja ruchu i odbijanie od ścian)
  move() {
    this.x += this.vx;
    this.y += this.vy;
    const minX = xTła + (MIN_X_AREA * tłoWidth);
    const maxX = xTła + (MAX_X_AREA * tłoWidth - this.w);
    const minY = MIN_Y_AREA * tłoWidth;
    const maxY = MAX_Y_AREA * tłoWidth - this.h;
    if (this.x <= minX || this.x >= maxX) {
      this.vx *= -1; 
      this.x = constrain(this.x, minX, maxX); 
    }
    if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y = constrain(this.y, minY, maxY);
    }
  }

  // Metoda rysująca myśl na ekranie
  display(i) {
    tint(255, i);
    image(this.img, this.x, this.y, this.w, this.h);
    fill(0, i);
    textFont('Verdana');
    textSize(this.h * 0.15); 
    textAlign(CENTER, CENTER);
    const paddingX = this.w * 0.1;
    const paddingY = this.h * 0.1;
    const textX = this.x + paddingX;
    const textY = this.y + paddingY;
    const textwidth = this.w - (2 * paddingX);
    const textHeight = this.h - (2 * paddingY);
    text(this.tekst, textX, textY, textwidth, textHeight);
    textAlign(LEFT, BASELINE);
    noTint();
    fill(0);
  }
}

// MINIGRA ZMYSŁY
function kartaZmysly(){
  if (doonce===0 && zmyslyStage===0){
    zmyslyStage=1
    click=0;
    doonce++;
  }
  if (zmyslyStage===1){
    let zratio = zmyslyGra1.width/zmyslyGra1.height;
    image(zmyslyGra1, xTła + tłoWidth/2 - 0.3*tłoWidth, 0.15*tłoWidth, 0.6*tłoWidth,0.6*tłoWidth/zratio);
    if (mouseX>xTła+0.292*tłoWidth && mouseX<xTła+0.47*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(wroc, xTła + 0.286*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
    }
    if (mouseX>xTła+0.5*tłoWidth && mouseX<xTła+0.68*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(uzyj, xTła + 0.5*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
  }
  }
  
  if (zmyslyStage===2){
    if (doonce===0){
      pkt-=10;
      doonce++
    }
  let mratio=mysliGra2.width/mysliGra2.height;
image(mysliGra2,xTła + tłoWidth/2 - 0.36*tłoWidth, 0.145*tłoWidth, 0.72*tłoWidth,0.08*tłoWidth);
    fill(245,234,208);
    textFont(Neucha);
    textSize(0.02*tłoHeight); rect(xTła+0.352*tłoWidth,0.17*tłoWidth,0.3*tłoWidth,0.04*tłoWidth);
    fill(0);
      let tratio=text3.width/text3.height;
    image(text3,xTła+tłoWidth/2-0.3*tłoWidth, 0.161*tłoWidth, 0.6*tłoWidth, 0.6*tłoWidth/tratio);
    let ratio = wzrok.width/wzrok.height;
    if (!wzrokdone){
    image(wzrok,xTła+0.2*tłoWidth, 0.3*tłoWidth, 0.1*tłoWidth, 0.1*tłoWidth/ratio);} 
    if (!sluchdone){
    image(sluch,xTła+0.35*tłoWidth, 0.44*tłoWidth, 0.1*tłoWidth, 0.1*tłoWidth/ratio);}
    if (!dotykdone){
    image(dotyk,xTła+0.5*tłoWidth, 0.28*tłoWidth, 0.1*tłoWidth, 0.1*tłoWidth/ratio);}
    if (!zapachdone){
    image(zapach,xTła+0.7*tłoWidth, 0.4*tłoWidth, 0.1*tłoWidth, 0.1*tłoWidth/ratio);}
    if (wzrokdone && sluchdone && dotykdone && zapachdone){
      zmyslyStage++;
    }
}
  if (zmyslyStage===3){
    textAlign(CENTER,CENTER);
    textSize(0.07*tłoWidth);
    text("Gratulacje!",width/2,0.3*tłoWidth);
    textFont('Verdana');
    textSize(0.03*tłoHeight);
    text("Kliknij w ekran, żeby przejść dalej",0.5*width,0.4*tłoWidth);
    textAlign(LEFT, BASELINE);
    if (doonce===0){
      zapachdone = false;
      wzrokdone = false;
      sluchdone = false;
      dotykdone = false;
      myśli-=15;
      skalaStres-=10;
      doonce++;
    }
  }
    }

// MINIGRA STOP

function kartaStop(){
  if (doonce===0 && stopStage===0){
    animDone = false;
    stopStage=1
    click=0;
    doonce++;
  }
  if (stopStage===1){
    let sratio = stopGra1.width/stopGra1.height;
    image(stopGra1, xTła + tłoWidth/2 - 0.3*tłoWidth, 0.15*tłoWidth, 0.6*tłoWidth,0.6*tłoWidth/sratio);
    let ratio = stop20.width/stop20.height;
    if (myśli>75){
      image(stop40, xTła+0.22*tłoWidth, 0.17*tłoWidth, 0.19*tłoWidth, 0.19*tłoWidth/ratio);
    }else{
    image(stop20, xTła+0.22*tłoWidth, 0.17*tłoWidth, 0.19*tłoWidth, 0.19*tłoWidth/ratio);
    }
    if (mouseX>xTła+0.292*tłoWidth && mouseX<xTła+0.47*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(wroc, xTła + 0.286*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
    }
    if (mouseX>xTła+0.5*tłoWidth && mouseX<xTła+0.68*tłoWidth && mouseY>0.5*tłoWidth && mouseY<0.56*tłoWidth){
      let wratio=wroc.width/wroc.height;
      image(uzyj, xTła + 0.5*tłoWidth, 0.5*tłoWidth, 0.19*tłoWidth,0.19*tłoWidth/wratio);
  }
  }
  
  if (stopStage===2){
    if (doonce===0){
      pkt-=25;
      doonce++
    }
    pratio = przyciskStop.width/przyciskStop.height;
    image(przyciskStop, width/2-0.15*tłoWidth, tłoHeight/2, 0.3*tłoWidth, 0.3*tłoWidth/pratio);
    if (mouseX>xTła+0.355*tłoWidth && mouseX<xTła+0.644*tłoWidth && mouseY>0.33*tłoWidth && mouseY<0.413*tłoWidth){
      image(przyciskStop2, width/2-0.15*tłoWidth, tłoHeight/2, 0.3*tłoWidth, 0.3*tłoWidth/pratio);
    }
    let iRatio = info4.width/info4.height;
        image(info4,xTła+0.034*tłoWidth,0.558*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("S : powiedz STOP",xTła+0.131*tłoWidth,0.57*tłoWidth,0.32*tłoWidth);
    text("Zatrzymaj natłok myśli!",xTła+0.131*tłoWidth,0.59*tłoWidth,0.32*tłoWidth);
  }
  
  if (stopStage===3){
    let iRatio = info4.width/info4.height;
        image(info4,xTła+0.034*tłoWidth,0.558*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("T : Take a breath - Weź oddech",xTła+0.131*tłoWidth,0.58*tłoWidth,0.32*tłoWidth);
    
    if (doonce===0){
    startTime = millis();
    doonce++;
    }
    if (!animDone) {
      let elapsed = (millis() - startTime) / 1000.0;
      let cycleTime = elapsed % 12;
      cycleCount = floor(elapsed / 12);

      let minSize = 0.1 * tłoWidth;
      let maxSize = 0.4 * tłoWidth;
      let size;
      let tekst;
      if (cycleTime < 3) {
        size = map(cycleTime, 0, 3, minSize, maxSize);
        tekst = "wdech"
      }else if (cycleTime < 6) {
        size = maxSize;
        tekst = "stop"
      }else if (cycleTime < 9) {
        size = map(cycleTime, 6, 9, maxSize, minSize);
        tekst = "wydech"
      }else {
        size = minSize;
        tekst = "stop"
      }
      
    fill(76,152,192);
    circle(xTła+tłoWidth/2,0.34*tłoWidth, size);
    fill(255,250,238);
    textFont(Neucha);
    textSize(0.03*tłoWidth);
    textAlign(CENTER,CENTER);
    text(tekst, width/2,0.34*tłoWidth);
    textAlign(LEFT, BASELINE);

    if (cycleCount >= 1) {
      animDone = true;
      stopStage++;
      doonce = 0;
      
    }
  }
  }
  
  if (stopStage===4){
    shapesize = 0.04*tłoWidth;
    if (doonce===0){
      kolory = [
  color(255, 235, 217),     
  color(226, 245, 255),     
  color(241, 255, 204),    
];
       for (let i = 0; i < 20; i++) {
          let s = generateNonOverlappingShape();
          shapes.push(s);
         
         if (red(s.kolor) === 255 && green(s.kolor) === 235 && blue(s.kolor) === 217) {
      ilePomarańczowych++;
        }
       }
      doonce++;
    }
    strokeWeight(3);
    rectMode(CENTER)
    for (let s of shapes) {
      fill(s.kolor);
      stroke(s.obrys);

      if (s.typ === 0) ellipse(s.x, s.y, shapesize, shapesize);
      else if (s.typ === 1) rect(s.x, s.y, shapesize, shapesize);
      else triangle(s.x, s.y - shapesize/2, s.x - shapesize/2, s.y + shapesize/2, s.x + shapesize/2, s.y + shapesize/2);
    }
    fill(0);
    noStroke();
    rectMode(CORNER)
    
    let iRatio = info4.width/info4.height;   image(info4,xTła+0.034*tłoWidth,0.558*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("O : Observe - Obserwuj",xTła+0.131*tłoWidth,0.57*tłoWidth,0.32*tłoWidth);
    text("Policz TYLKO pomarańczowe kształty na ekranie.",xTła+0.131*tłoWidth,0.6*tłoWidth);
    
    inputStop.style('font-size', 0.026*height + 'px');
    inputStop.style('padding-left', 0.026*height + 'px');
    inputStop.size(0.13*tłoWidth, 0.04*tłoWidth);
    inputStop.show();
    inputStop.position(xTła+0.65*tłoWidth, 0.534*tłoWidth);
    
    ilość = inputStop.value();
    
    if (błąd){
      textSize(0.02*tłoWidth);
      text("Policz jeszcze raz", xTła+0.66*tłoWidth, 0.62*tłoWidth);
    }
    
    sratio = strzalka.width/strzalka.height;
    if(mouseX>xTła+0.82*tłoWidth && mouseX<xTła+0.87*tłoWidth && mouseY>0.538*tłoWidth && mouseY<0.572*tłoWidth){
      image(strzalka, xTła+0.82*tłoWidth,0.538*tłoWidth,0.05*tłoWidth,0.05*tłoWidth/sratio);
  } else {
    image(strzalka2, xTła+0.82*tłoWidth,0.538*tłoWidth,0.05*tłoWidth,0.05*tłoWidth/sratio);
  }
  }
  
  if (stopStage===5){
    if (doonce===0){
      shapes = [];
      inputStop.hide();
      if (myśli>75){
        myśli-=40;
      }else{
        myśli-=20;
      }
      skalaStres-=20;
      doonce++;
    }
    textAlign(CENTER,CENTER);
    textSize(0.07*tłoWidth);
    text("Gratulacje!",width/2,0.3*tłoWidth);
    textFont('Verdana');
    textSize(0.03*tłoHeight);
    text("Kliknij w ekran, żeby przejść dalej",0.5*width,0.4*tłoWidth);
    textAlign(LEFT, BASELINE);
    let iRatio = info4.width/info4.height;   image(info4,xTła+0.034*tłoWidth,0.558*tłoWidth,0.425*tłoWidth,0.425*tłoWidth/iRatio);
    textFont('Verdana');
    textSize(0.02*tłoHeight);
    text("P : Proceed - Kontynuuj",xTła+0.131*tłoWidth,0.57*tłoWidth,0.32*tłoWidth);
  }
}

function generateNonOverlappingShape() {
  let x, y;
  let goodPos = false;
  while (!goodPos) {
    x = xTła + random(0.145 * tłoWidth, 0.83 * tłoWidth);
    y = random(0.14 * tłoWidth, 0.5 * tłoWidth);

    goodPos = true; 
    for (let s of shapes) {
      let d = dist(x, y, s.x, s.y);
      if (d < shapesize+0.01*tłoWidth) { 
        goodPos = false;
        break;
      }
    }
  }

  let fillColor = random(kolory);
  let strokeColor = strokeForColor(fillColor);

  return {
    kolor: fillColor,   
    obrys: strokeColor,   
    x,
    y,
    typ: int(random(3))
  };
}
function strokeForColor(fillColor) {
  if (red(fillColor) === 255 && green(fillColor) === 235 && blue(fillColor) === 217) {
    return color(244, 118, 0);
  }
  if (red(fillColor) === 226 && green(fillColor) === 245 && blue(fillColor) === 255) {
    return color(76, 152, 192); 
  }
  if (red(fillColor) === 241 && green(fillColor) === 255 && blue(fillColor) === 204) {
    return color(159, 192, 76); 
  }

  return color(0);
}