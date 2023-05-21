
//yerel degiskenler tanımlandı
let sonuç = 0
let vurusPozisyonu
let simidikiZaman = 30
let zamanlayiciId = null

//sabitler tanımlandı
const kareler = document.querySelectorAll('.kare')
const kalanSure = document.querySelector('#kalanSure')
const köstebek = document.querySelector('.köstebek')
const puan = document.querySelector('#puan')


function rastgeleKare() {
  kareler.forEach(kare => {
    kare.classList.remove('köstebek')
  })

  let rastgeleKare = kareler[Math.floor(Math.random() * 9)] //random olarak karelerin seçilmesi
  rastgeleKare.classList.add('köstebek')

  vurusPozisyonu = rastgeleKare.id
}

//her mouse vurusunu skor olarak sayma
kareler.forEach(kare => {
  kare.addEventListener('mousedown', () => {
    if (kare.id == vurusPozisyonu) {
      sonuç++
      puan.textContent = sonuç
      vurusPozisyonu = null
    }
  })
})

function hareketköstebek() {
  zamanlayiciId = setInterval(rastgeleKare, 500) //köstebegin kareler arası gecis hızı
}

hareketköstebek()

function sayici() {
 simidikiZaman--
 kalanSure.textContent = simidikiZaman

 if (simidikiZaman == 0) {
   clearInterval(sayicizamanlayiciId)
   clearInterval(zamanlayiciId)
   alert('Oyun Bitti :) Skorunuz: ' + sonuç)
 }

}

let sayicizamanlayiciId = setInterval(sayici, 1000) //sürenin ölçeklendirlmesi


const refresh = document.querySelector(".refresh img"); //köstebegin resminin yenilenmesi
refresh.addEventListener("click", function () {

    location.reload();
  });


//Müzik ve Sesler 
var muzik, susturbtn, sesAyarı;
function ses(){
	muzik = new Audio();
	muzik.src = "../musics/game-music-5.mp3";
	muzik.loop = true;
    muzik.volume = 0.1;
	muzik.play();
	
	
	susturbtn = document.getElementById("susturbtn");
    img = document.getElementById("img");
	sesAyarCubugu = document.getElementById("sesayari");
	
	
	susturbtn.addEventListener("click", sustur);
	sesAyarCubugu.addEventListener("mousemove", sesAyarla);
	
	//müzigi susturma
	function sustur(){
		if(muzik.muted){
		    muzik.muted = false;
		    img.src="../images/unmute3.png";
	    } else {
		    muzik.muted = true;
		    img.src="../images/mute3.png";
	    }
	}
  // müzigin sesini ayarlama
	function sesAyarla(){
	    muzik.volume = sesAyarCubugu.value / 100;
    }
}
window.addEventListener("load", ses);

