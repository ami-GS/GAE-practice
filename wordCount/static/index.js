var len = 0;
function ShowLength( str ) {
    var strArray = str.split("\n");
    var parNum = getParagraphNum(strArray);
    var lineNum = getLineNum(strArray);
    document.getElementById("inputlength").innerHTML = str.length-lineNum + " word";
    document.getElementById("line").innerHTML = lineNum + " line";
    document.getElementById("paragraph").innerHTML = parNum + " paragraph";
    len = str.length
}

function getLineNum(strArray){
    strArray.sort();
    var i = 0;
    while(strArray[i] == ""){i++;console.log(strArray[i]);}
    return strArray.length - 1 - i;
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