var len = 0;
function ShowLength( str ) {
    document.getElementById("inputlength").innerHTML = str.length + "文字";
//    document.getElementById("length").value = str.length + "文字";
    len = str.length
}

function copyLength(){
    window.clipboardData.setData("text", len.toString());
}