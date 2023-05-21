const bloklar = document.querySelectorAll(".blok");
const oyuncuMetni = document.getElementById("oyuncu");
const hataMetni = document.getElementById("hata");
let oyuncu = "X";
let oyunBitti = false;
let kazanan;

function oyunuBaslat() {
    oyuncuMetni.textContent = `Sıradaki Oyuncu ${oyuncu}` 
    
    bloklar.forEach(blok => blok.addEventListener("click", () => blokSec(blok)))
    
}

function blokSec(blok) {
    if(blok.textContent === "") { //Boş bir bloğa tıklandığında yaz ve sıradaki oyuncuyu değiştir.
        blok.textContent = oyuncu;  
        if(oyuncu === "O") {
            blok.style.color = "red"
        }
        oyuncununSirasi();
    }
    else{                         //Dolu bir bloğa tıklandığında hata mesajı göster.
        hataMetni.textContent = "Lütfen Boş Bir Yere Tıklayınız!"
        blok.style.border = "2px solid red"
        setTimeout(() => {
            hataMetni.textContent = "";
            blok.style.border = "1px solid black"
        },2500)
    }
    
    //Oyun sonu kontrolleri
    kazananKontrol();     
    beraberlikKontrol();

    if(oyunBitti) {
        if(kazanan === "O")
        oyuncuMetni.style.color = "red"
        
        oyuncuMetni.textContent = `Oyun sona erdi, KAZANAN |${kazanan}|`;
       
        bloklar.forEach(blok => blok.style.pointerEvents = 'none')
    }    
}

//Oyuncunun sırasını belirle
function oyuncununSirasi() { 
    if(oyuncu === "X"){
        oyuncu = "O";
        oyuncuMetni.style.color = "red"
        oyuncuMetni.textContent = `Sıradaki Oyuncu |${oyuncu}|`
        return;
    }
    else if(oyuncu === "O"){
        oyuncu = "X";
        oyuncuMetni.style.color = "black"
        oyuncuMetni.textContent = `Sıradaki Oyuncu |${oyuncu}|`
    }
}

//Kazanma koşulları kontrol
function kazananKontrol() { 
    satiriKontrolEt()
    sutunuKontrolEt()
    caprazKontrelEt()
}

//Blokların hepsi dolu ise beraberlik
function beraberlikKontrol() {
    const values = [];
    bloklar.forEach(blok => values.push(blok.textContent))
    if(!values.includes("")){
        oyuncuMetni.textContent = "Berabere!";
        bloklar.forEach(blok => blok.style.pointerEvents = 'none')
    }
}

//Satırdaki blokların içeriği aynıysa kazanma
function satiriKontrolEt() {
    let satir1 = bloklar[0].textContent == bloklar[1].textContent &&
        bloklar[0].textContent == bloklar[2].textContent &&  
        bloklar[0].textContent !== ""

    let satir2 = bloklar[3].textContent == bloklar[4].textContent && 
        bloklar[3].textContent == bloklar[5].textContent && 
        bloklar[3].textContent !== ""

    let satir3 = bloklar[6].textContent == bloklar[7].textContent && 
        bloklar[6].textContent == bloklar[8].textContent &&  
        bloklar[6].textContent !== ""
    
    
    if(satir1 || satir2 || satir3){
        oyunBitti = true
    }

    if (satir1) return kazanan = bloklar[0].textContent
    if (satir2) return kazanan = bloklar[3].textContent
    if (satir3) return kazanan = bloklar[6].textContent

}

//Sütundaki blokların içeriği aynıysa kazanma
function sutunuKontrolEt() {
    let sutun1 = bloklar[0].textContent == bloklar[3].textContent &&
        bloklar[0].textContent == bloklar[6].textContent &&  
        bloklar[0].textContent !== ""

    let sutun2 = bloklar[1].textContent == bloklar[4].textContent && 
        bloklar[1].textContent == bloklar[7].textContent && 
        bloklar[1].textContent !== ""

    let sutun3 = bloklar[2].textContent == bloklar[5].textContent && 
        bloklar[2].textContent == bloklar[8].textContent &&  
        bloklar[2].textContent !== ""
    
    
    if(sutun1 || sutun2 || sutun3){
        oyunBitti = true
    }

    if (sutun1) return kazanan = bloklar[0].textContent
    if (sutun2) return kazanan = bloklar[1].textContent
    if (sutun3) return kazanan = bloklar[2].textContent

}

//Çaprazdaki blokların içeriği aynıysa kazanma
function caprazKontrelEt() {
    let capraz1 = bloklar[0].textContent == bloklar[4].textContent &&
        bloklar[0].textContent == bloklar[8].textContent &&  
        bloklar[0].textContent !== ""

    let capraz2 = bloklar[2].textContent == bloklar[4].textContent && 
        bloklar[2].textContent == bloklar[6].textContent && 
        bloklar[2].textContent !== ""
    
    
    if(capraz1 || capraz2 ){
        oyunBitti = true
    }

    if (capraz1) return kazanan = bloklar[0].textContent
    if (capraz2) return kazanan = bloklar[2].textContent
    

}
// Yenile butonu
const yenile = document.querySelector(".yenile img");
yenile.addEventListener("click", function () {

    location.reload();
  });

oyunuBaslat()

//Müzik ve Ses
var muzik, susturbtn, sesAyarı;
function Ses(){
	muzik = new Audio();
	muzik.src = "../musics/game-music-1.mp3";
	muzik.loop = true;
    muzik.volume = 0.08;
	muzik.play();
	
	
	susturbtn = document.getElementById("susturbtn");
    img = document.getElementById("img");
	sesAyarCubugu = document.getElementById("sesayari");
	
	//click ve mousemove eventleri
	susturbtn.addEventListener("click", sustur);
	sesAyarCubugu.addEventListener("mousemove", sesAyarla);
	
	//Sustur butonu ve resimlerini ayarla
	function sustur(){
		if(muzik.muted){
		    muzik.muted = false;
		    img.src="../images/unmute3.png";
	    } else {
		    muzik.muted = true;
		    img.src="../images/mute3.png";
	    }
	}
	function sesAyarla(){ //Ses düzeyini ayarla
	    muzik.volume = sesAyarCubugu.value / 100;
    }
}
window.addEventListener("load", Ses);