// cubuk değişkenleri
var solCubuk = document.getElementById('solCubuk');
var sagCubuk = document.getElementById('sagCubuk');
// top değişkenleri
var oyunTopu = document.getElementById('oyunTopu');

// puan değişkenleri
var solPuan = 0;
var sagPuan = 0;

solCubuk.style.top = window.innerHeight/2 + 'px';
sagCubuk.style.top = window.innerHeight/2 + 'px';
oyunTopu.style.top = window.innerHeight/2 + 'px';
oyunTopu.style.left = (window.innerWidth/2) - (16/2) + 'px';

var topUst = 0;
var topSol = 0; 
var oyunHizi = 10;

function pxEkle(sayi){
	return sayi + 'px';
}

// oyuncuların yönlendireceği çubuklar
document.onkeydown = function(e){
	switch(e.keyCode){
		// sol çubuk
		case 87:
			if(parseInt(solCubuk.style.top) <= 0){
				solCubuk.style.top = solCubuk.style.top;
			}else{
				solCubuk.style.top = pxEkle(parseInt(solCubuk.style.top) - 30);
			}
			break;
		case 83:
			if(parseInt(solCubuk.style.top) + 85 >= window.innerHeight){
				solCubuk.style.top = solCubuk.style.top;
			}else{
				solCubuk.style.top = pxEkle(parseInt(solCubuk.style.top) + 30);
			}
			break;
		case 38:
			if(parseInt(sagCubuk.style.top) <= 0){
				sagCubuk.style.top = sagCubuk.style.top;
			}else{
				sagCubuk.style.top = pxEkle(parseInt(sagCubuk.style.top) - 30);
			}
			break;
		case 40:
			if(parseInt(sagCubuk.style.top) + 85 >= window.innerHeight){
				sagCubuk.style.top = sagCubuk.style.top;
			}else{
				sagCubuk.style.top = pxEkle(parseInt(sagCubuk.style.top) + 30);
			}
			break;
		default: 
	}
}
gameChain();

// oyunun sürekli devam etmesi için gerekli yapı
function oyunDongusu(){
	// topun alacağı değerler
	oyunTopu.style.top = pxEkle(parseInt(oyunTopu.style.top) + topUst);
	oyunTopu.style.left = pxEkle(parseInt(oyunTopu.style.left) + topSol);

 	// top üst ve alt bloklara çarparsa, X ekseninde geri seksin
	if(parseInt(oyunTopu.style.top) <= 0 || parseInt(oyunTopu.style.top) + 16 >= window.innerHeight){
		topUst *= -1;
	}

	// top sağ ve sol çubuklara çarparsa, Y ekseninde geri seksin
	if(parseInt(oyunTopu.style.left) <= 0 + 16 && parseInt(oyunTopu.style.top)  >= parseInt(solCubuk.style.top) && parseInt(oyunTopu.style.top) <= parseInt(solCubuk.style.top) + 85){
		topSol *= -1;
	}else if(parseInt(oyunTopu.style.left) + 16 >= window.innerWidth - 12 && parseInt(oyunTopu.style.top) >= parseInt(sagCubuk.style.top) && parseInt(oyunTopu.style.top) <= parseInt(sagCubuk.style.top) + 85){
		topSol *= -1;		
	}

	if(parseInt(oyunTopu.style.left) <= 0){
		if(++sagPuan === 5){
			alert('2. oyuncu kazandı.');
			sagPuan = 0;
			solPuan = 0;
			document.getElementById('solPuan').innerHTML = solPuan;
		}
		document.getElementById('sagPuan').innerHTML = sagPuan;
		gameChain();
	}

	if(parseInt(oyunTopu.style.left) + 16 >= window.innerWidth){
		if(++solPuan === 5){
			alert('1. oyuncu kazandı.');
			sagPuan = 0;
			solPuan = 0;
			document.getElementById('sagPuan').innerHTML = sagPuan;
		}
		document.getElementById('solPuan').innerHTML = solPuan;
		gameChain();
	}
}

function gameChain(){
	oyunTopu.style.top =  window.innerHeight/2 + 'px';
	oyunTopu.style.left = (window.innerWidth/2) - (16/2) + 'px';
 	
	var rnd = Math.random()*3+2;

	if(Math.random()*1 > 0.5){
		rnd *= -1;		
	}

	topSol = rnd;
	topUst = rnd;
}

setInterval(oyunDongusu, oyunHizi);

//Müzik ve Ses
var muzik, susturbtn, sesAyarı;
function ses(){
	muzik = new Audio();
	muzik.src = "../musics/game-music-6.mp3";
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
		    img.src="./images/unmute3.png";
	    } else {
		    muzik.muted = true;
		    img.src="./images/mute3.png";
	    }
	}
	function sesAyarla(){
	    muzik.volume = sesAyarCubugu.value / 100;
    }
}
window.addEventListener("load", ses);