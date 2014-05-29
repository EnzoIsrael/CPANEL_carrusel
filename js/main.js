$( document ).ready(function() {

	var theCanvas = document.getElementById('canvas');
	var context   = theCanvas.getContext('2d');
	var img = new Image();

	var windowX = 0;
	var windowY = 0;
	var currentScale = 1;
	var minScale = .2;
	var maxScale = 3;
	var scaleInc = .1;

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
			context.fillRect(0, 0, 500, 500);
			context.drawImage(img
				, windowX, windowY
				, img.width, img.height
				, 0, 0
				, img.width*currentScale, img.height*currentScale);
		}

		document.onkeydown = function(e){
			e = e?e:window.event;

			switch(e.keyCode){

				case 109:
					//-
					currentScale-=scaleInc;
					if(currentScale<minScale){
						currentScale = minScale;
					}
					break;
				case 107:
					//+
					currentScale+=scaleInc;
					if(currentScale>maxScale){
						currentScale = maxScale
					}
			}
		}
});







