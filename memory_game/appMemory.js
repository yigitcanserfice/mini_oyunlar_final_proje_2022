const kartlar = document.querySelectorAll(".hafiza-kartı");
const yenile = document.querySelector(".yenile img");
const final = document.querySelector(".final");
const tebrikler = document.querySelector("#tebriklerSection");
const dakika = document.querySelector(".dakika");
const saniye = document.querySelector(".saniye");
const yeniden = document.querySelector(".yeniden");
const toplamSure = document.querySelector("#toplamSure");

let kartıCevir = false;
let ilkKart, ikinciKart;
let tahtayiKitle = false; //ard arda 2 den fazla tıklanmasını engellemek için
let toplamSaniye = 0;
let interval;
let sonSure;
let tik = -1;

function kartiAc() {
  if (tahtayiKitle) return;
  if (this === ilkKart) return;
  this.classList.add("cevir");

  if (!kartıCevir) {
    // ilk tıklama
    kartıCevir = true;
    ilkKart = this;
    sureyiBaslat();
    return;
  }
  // ikinci tıklama
  ikinciKart = this;
  eslesmeKontrol();
}

function eslesmeKontrol() {
  let isMatch = ilkKart.dataset.id === ikinciKart.dataset.id;
  isMatch ? tıklamayıKapat() : kartlarıKapat();
}

function tıklamayıKapat() {
  //eşleştiğinde tıklamayı engelle
  ilkKart.removeEventListener("click", kartiAc);
  ikinciKart.removeEventListener("click", kartiAc);
  tahtayıYenile();
  oyunBitti();
}

function kartlarıKapat() {
  tahtayiKitle = true;
  //Eşleşme olmadığında kartları kapat
  setTimeout(() => {
    ilkKart.classList.remove("cevir");
    ikinciKart.classList.remove("cevir");
    tahtayıYenile();
  }, 700);
}

function tahtayıYenile() {
  // kart döndüğünde tekrar tıklayabilmemizi sağlar
  [kartıCevir, tahtayiKitle] = [false, false];
  [ilkKart, ikinciKart] = [null, null];
}

//yenile butonuna basıldığında
yenile.addEventListener("click", function () {
  location.reload();
});

//zaman göstergesi
function sureyiBaslat() {
  if (tik === -1) {
    interval = setInterval(function () {
      //interval belirli aralıklarla sürekli çlışmasını sağlar.
      final.innerHTML = "Tamamlama süreniz " + sonSure;
      sonSure = dakika.innerHTML + ":" + saniye.innerHTML;
      toplamSaniye++;
      saniye.innerHTML = pad(toplamSaniye % 60);
      dakika.innerHTML = pad(parseInt(toplamSaniye / 60));
    }, 1000);
  }
  tik = 1;
}

function pad(val) {
  // 00:00 şeklinde ilerlesin zaman.
  const valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

//game won
function oyunBitti() {
  if (tik < 1) {
    // clickler saniyenin durması için. Oyun bitse dahi saniye devam etmesini engeller.
    ilkKart = e.target;
  }

  if (document.getElementsByClassName("cevir").length === 12) {
    tebriklerSection.classList.replace("hidden", "show");
    clearInterval(interval);
    sonSure = dakika.innerHTML + ":" + saniye.innerHTML;
    final.innerHTML = "Tamamlama süreniz " + sonSure;
    toplamSure.innerHTML = sonSure;
  }
  tik = 0;
}

//tebrikler section'da yeniden butonu
yeniden.addEventListener("click", function () {
  tebriklerSection.classList.replace("show", "hidden");
  location.reload();
});

(function karistir() {
  kartlar.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

kartlar.forEach((card) => card.addEventListener("click", kartiAc));

//Müzik ve Ses
var muzik, susturbtn, sesAyarı;
function Ses(){
	muzik = new Audio();
	muzik.src = "../musics/game-music-2.mp3";
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
	function sesAyarla(){
	    muzik.volume = sesAyarCubugu.value / 100;
    }
}
window.addEventListener("load", Ses);
