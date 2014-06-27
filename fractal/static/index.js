var canvas = document.getElementById("canvas");

window.onload = function(){
	var b = document.body;
	var d = document.documentElement;
	canvas.width = Math.max(b.clientWidth , b.scrollWidth, d.scrollWidth, d.clientWidth);
	canvas.height = Math.max(b.clientHeight , b.scrollHeight, d.scrollHeight, d.clientHeight);

	drawFractal();
}

function setPixelColor(imageData, x, y, zReal, zImag, cReal, cImag) {
        for(var i = 0; i < 100; i++) {
            if(zReal * zReal + zImag * zImag >= 4) {
                imageData.data[(y * imageData.width + x) * 4 + 0] = i * 10 % 256;
                imageData.data[(y * imageData.width + x) * 4 + 1] = i * 20 % 256;
                imageData.data[(y * imageData.width + x) * 4 + 2] = i * 30 % 256;
                imageData.data[(y * imageData.width + x) * 4 + 3] = 0xFF;
                return;
            }

			var real = zReal * zReal -  zImag * zImag + cReal;
			var imga = 2 * zReal * zImag + cImag;
            zReal = real;
            zImag = imga;
        }
 
        imageData.data[(y * imageData.width + x) * 4 + 0] = 0x00;
        imageData.data[(y * imageData.width + x) * 4 + 1] = 0x00;
        imageData.data[(y * imageData.width + x) * 4 + 2] = 0x00;
        imageData.data[(y * imageData.width + x) * 4 + 3] = 0xFF;
}

function drawMandelbrotSet(imageData) {
    var minReal = -2.0;
    var maxReal = +1.0;
    var minImag = -1.5;
    var maxImag = +1.5;
	
    for(var y = 0; y < imageData.height; y++) {
        for(var x = 0; x < imageData.width; x++) {
            var zReal = 0.0;
            var zImag = 0.0;
            var cReal = (maxReal - minReal) / imageData.width * x + minReal;
            var cImag = (maxImag - minImag) / imageData.height * y + minImag;
            setPixelColor(imageData, x, y, zReal, zImag, cReal, cImag);
        }
    }
}


function drawFractal(){
	var context = canvas.getContext("2d");
	var imageData = context.getImageData(0, 0, canvas.width, canvas.height);

	drawMandelbrotSet(imageData);
	context.putImageData(imageData, 0, 0);
}
