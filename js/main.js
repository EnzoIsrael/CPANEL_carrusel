$( document ).ready(function() {

	var theCanvas = document.getElementById('canvas');
	var context   = theCanvas.getContext('2d');

	document.getElementById('files')
	.addEventListener('change', handleFileSelect, false);

	var img = new Image();
	img.addEventListener('load', eventImgLoaded, false);

	    function handleFileSelect(evt) {
		    var files = evt.target.files; 

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
			context.drawImage(img,0,0, img.width, img.height);
		}
		

});







