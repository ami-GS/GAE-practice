var len = 0;
function ShowLength( str ) {
    var strArray = str.split("\n");
    var parNum = getParagraphNum(strArray);
    var blankNum = getBlankNum(strArray);
    //var engNum = getEngNum(strArray);
    var lineNum = strArray.length - blankNum;
    document.getElementById("inputlength").innerHTML = str.length-blankNum-lineNum+1 + " word";
    document.getElementById("line").innerHTML = lineNum + " line";
    document.getElementById("paragraph").innerHTML = parNum + " paragraph";
}

function getEngNum(strArray){
    // ^(\n)+$
    num = 0;
    for(var i = 0; i < strArray.length; i++){
        if(strArray[i] != ""){
            num += strArray[i].split(" ").length;
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

function copyLength(){
    window.clipboardData.setData("text", len.toString());
}