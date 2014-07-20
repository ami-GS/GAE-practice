var len = 0;
var type = "jp";
var token = document.getElementById("token").value;
var channel = new goog.appengine.Channel(token);
var socket = channel.open();
var textArea = document.getElementById("text");
var bef = "";
var start = true;

window.onload = function () {
    setTimeout("checker()", 2000);
};

function checker(){
    var af = textArea.value;
    var splitted = af.split(bef);
    var len = splitted.length;
    if(bef != af){
        var sentMessage = "";
        if(len == 1 && bef != ""){
            delSplitted = bef.split(af);
            sentMessage += delSplitted[1];
            for(var i = 2; i < len; i++){
                sentMessage += bef+splitted[i];
            }
            sendMessage(location.href, sentMessage+1); //1 means that the text are newly deleted
        }
        else if(len >= 2){
            sentMessage += splitted[1];
                for(var i = 2; i < len; i++){
                    sentMessage += bef+splitted[i];
                }
                sendMessage(location.href, sentMessage+2); //2 means that the text are newly appended
        }
    }
    bef = af;
    setTimeout("checker()", 1000);
}


function sendMessage(path, data){
    path += 'echo';
    var xhr = new XMLHttpRequest();
    xhr.open("POST", path, true);
    xhr.send(data);
}

socket.onopen = function(){
    console.log("opened");
};

socket.onmessage = function(message){ //initialize if server has cache
    text = message["data"];
    document.getElementById("text").value = text;
    bef = text;
    start = false;
    ShowLength(text);
};

function ShowLength( str ) {
    if(start){sendMessage(location.href, str[0]+2); start=false;}
    //if(str[str.length-1] == "\n"){console.log('enter');}
    //else if(/\s/g.test(str[str.length-1])){console.log("space");}

    //sendMessage(location.href, str);
    var strSplitLine = str.split(/\n/g);
    var parNum = getParagraphNum(strSplitLine);
    var blankNum = getBlankNum(strSplitLine);
    //var engNum = getEngNum(strArray);
    var lineNum = strSplitLine.length - blankNum;
    var words = 0;
    if(type == "jp"){words = str.length-blankNum-lineNum+1;}
    else if(type == "en"){words = getEngNum(strSplitLine);}
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