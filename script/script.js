function buttonremovehyphenclick(){
  document.getElementById("in").value=document.getElementById("in").value.replace(/-/gi," ");
  alert("Removed");
}

function isVowel(x) {
    var result;
    x=x.toUpperCase();
    result = x == "A" || x == "E" || x == "I" || x == "O" || x == "U";
    return result;
}

function Validate(s) {
       //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
       var regex = /^[A-Za-z0-9 ]+$/
       //Validate TextBox value against the Regex.
       s = xoa_dau(s);
       var ss=(s.substring(0,s.length-1));
       var isValid = regex.test(ss);
       return isValid;
   }

   function Validated(s) {
          //Regex for Valid Characters i.e. Alphabets, Numbers and Space.
          var regex = /^[A-Za-z0-9 ]+$/
          //Validate TextBox value against the Regex.
          s = xoa_dau(s);
          var ss=(s);
          var isValid = regex.test(ss);
          return isValid;
      }

   function xoa_dau(str) {
     str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
     str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
     str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
     str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
     str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
     str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
     str = str.replace(/đ/g, "d");
     str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
     str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
     str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
     str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
     str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
     str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
     str = str.replace(/Đ/g, "D");
     return str;
 }

function checkBoxResult(id){
  return document.getElementById(id).checked
}

function onChangeInput(){
  document.getElementById("out").value=inputToOutput(document.getElementById("in").value,checkBoxResult("wikiCheck"),checkBoxResult("VowelsCheck"),checkBoxResult("CapitalizeCheck"));
}


function onChangeOutput(){
  document.getElementById("in").value=outputToInput(document.getElementById("out").value,checkBoxResult("wikiCheck"));
}

function inputToOutput(s,wiki,vowel,capitalize){
  s = s.replace(/\s\s+/g, ' ');
  $slist=s.split(" ");
  $Latin="";

  for (var i=0;i<$slist.length;i++){
    if(($slist[i]).length>2&&Validate($slist[i])){
    $firstChar="";
    if (vowel != 1)
    $firstChar=($slist[i])[0];
    var firstChars=($slist[i])[0];
    if (vowel == 1){
    var therestofchars=($slist[i]).split("");
    for(var j=0;j<=therestofchars.length-1;j++){
      if (isVowel(therestofchars[j]))
      if(j>0)
        break;
      $firstChar+=therestofchars[j];
    }
  }

    var therestofchar=($slist[i]).substring($firstChar.length,($slist[i]).length);
    if(capitalize==1)
    if(firstChars == firstChars.toUpperCase())
    therestofchar = therestofchar.charAt(0).toUpperCase() + therestofchar.substring(1);
    $Latin+=therestofchar;
    if(wiki==1)$Latin+="-";
    $Latin+=$firstChar+"erb"+" ";
  }
  else $Latin+=$slist[i]+" ";
  }
  return $Latin;
}

function outputToInput(s,wiki){
  s = s.replace(/\s\s+/g, ' ');
  $slist=s.split(" ");
  $Latin="";
  for (var i=0;i<$slist.length;i++){
    $symbol="";
    if(($slist[i]).length>0){
      var checks=($slist[i]).substring(($slist[i]).length-3);
      $check=checks;
   if(!Validated($check.charAt(2))){
     $symbol=$check.charAt(2);
     checks=($slist[i]).substring(0,($slist[i]).length-1);
     $check=checks.substring(checks.length-3);
   }
    if($check == ("erb")){
    if($symbol=="")
    $therestofchar=($slist[i]).substring(0,($slist[i]).length-3);
    else
    $therestofchar=($slist[i]).substring(0,($slist[i]).length-4);
    $firstChar=($therestofchar).substring($therestofchar.length-1);
    $therestofchar=($therestofchar).substring(0,$therestofchar.length-1);
    $Latin+=$firstChar+$therestofchar;
    if(wiki==1)
      $Latin=$Latin.substring(0,$Latin.length-1)+$symbol+" ";//ou-yerb
      else {
          $Latin=$Latin.substring(0,$Latin.length)+" ";
      }
   }
   else {
     $Latin+=($slist[i])+" ";
   }
  }
  }
  return $Latin;
}
