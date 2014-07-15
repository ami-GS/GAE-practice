var len = 0;
var type = "jp";
var token = document.getElementById("token").value;
var channel = new goog.appengine.Channel(token);
var socket = channel.open();
var xhr = new XMLHttpRequest();

socket.onopen = function(){
    console.log("opened");
};

function ShowLength( str ) {
    var strArray = str.split("\n");
    var parNum = getParagraphNum(strArray);
    var blankNum = getBlankNum(strArray);
    //var engNum = getEngNum(strArray);
    var lineNum = strArray.length - blankNum;
    var words = 0;
    if(type == "jp"){words = str.length-blankNum-lineNum+1;}
    else if(type == "en"){words = getEngNum(strArray);}
    document.getElementById("inputlength").innerHTML = words + " word";
    document.getElementById("line").innerHTML = lineNum + " line";
    document.getElementById("paragraph").innerHTML = parNum + " paragraph";
}

function getEngNum(strArray){
    // ^(\n)+$
    var num = 0;
    for(var i = 0; i < strArray.length; i++){
        if(strArray[i] != ""){
            var splitted = strArray[i].split(" ");
            num += splitted.length-(splitted.sort().lastIndexOf("")+1);
        }
    }
    return num;
}

function getBlankNum(strArray){
    if(strArray.length == 0 && strArray[0] == ""){return 0;}
    strArray.sort();
    var i = 0;
    while(strArray[i] == ""){i++;}
    return i;
}

function getParagraphNum(strArray){
    var i = 0;
    var ans = 1;
    if(strArray[0] == ""){ans--;}
    while(i < strArray.length-1){
        if(strArray[i] == "" && strArray[i+1] != ""){
            ans++;
        }
        i++;
    }
    return ans
}

function chmod(lang){
    if(lang == "Japanese"){
        type = "jp";
    }
    else if(lang == "English"){
        type = "en";
    }
    ShowLength(document.getElementById("text").value);
}

function copyLength(){
    window.clipboardData.setData("text", len.toString());
}