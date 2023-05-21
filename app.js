//Müzik ve Ses
var muzik, susturbtn, sesAyarı;
function ses(){
	muzik = new Audio();
	muzik.src = "./musics/main-menu.mp3";
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