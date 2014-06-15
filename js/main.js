$( document ).ready(function() {

	var theCanvas = document.getElementById('canvas');
	var context   = theCanvas.getContext('2d');
	var img = new Image();


	document.getElementById("save").onclick=function(){
		var oCanvas = document.getElementById("canvas"); 
		var strDataURI = oCanvas.toDataURL();
		alert(strDataURI);
	};
	



	var windowX = 0;
	var windowY = 0;
	var currentScale = 1;
	var minScale = .2;
	var maxScale = 3;
	var scaleInc = .05;

	setInterval(eventImgLoaded,100);

	document.getElementById('files')
	.addEventListener('change', handleFileSelect, false);

	img.addEventListener('load', eventImgLoaded, false);

	    function handleFileSelect(e) {
		    var files = e.target.files; 

		    for (var i = 0, f; f = files[i]; i++) {
		      if (!f.type.match('image.*')) {
		        continue;
		      }

		      var reader = new FileReader();

		      reader.onload = (function(theFile) {
		        return function(e) {
		        img.src = e.target.result;
		        };
		      })(f);

		      reader.readAsDataURL(f);
		    }
	    }

		function eventImgLoaded(){
			context.fillStyle = "#cccccc";
			context.fillRect(0, 0, 970, 400);
			context.drawImage(img
				, windowX, windowY
				, img.width, img.height
				, 0, 0
				, img.width*currentScale, img.height*currentScale);
		}

		document.onkeydown = function(e){
			e = e?e:window.event;

			switch(e.keyCode){

				case 38:
					//arriba
					windowY-=10;
					if(windowY<0)
						windowY = 0;
					break;

				case 40:
					//abajo
					windowY+=10;
					if(windowY>img.height - 500)
						windowY = img.height - 500;
					break;

				case 37:
					//izquierda
					windowX-=10;
					if(windowX<0)
						windowX=0;
					break;

				case 39:
					//derecha
					windowX+=10;
					if(windowX>img.width - 500)
						windowX = img.width - 500
					break;	

				case 109:
					//-
					currentScale-=scaleInc;
					if(currentScale<minScale)
						currentScale = minScale;
					break;
				case 107:
					//+
					currentScale+=scaleInc;
					if(currentScale>maxScale)
						currentScale = maxScale
			}
		}
});







