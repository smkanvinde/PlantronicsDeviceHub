//let $ = require('jquery')

$(document).ready(function(){
  $('#cButton').click(function(){
    $('#demo').toggle();
  });
}
//createKeyboard();
);
/*
function createKeyboard()
{
   var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   for(var i=0; i<str.length; i++)
   {
    var nextChar = str.charAt(i);
    var btn = document.createElement("BUTTON");
    btn.id = 'btn' + nextChar;
    btn.innerHTML = nextChar;
    btn.setAttribute("value", nextChar);
    btn.setAttribute("text",nextChar);
    btn.style.fontSize = "14px";
    btn.style.backgroundColor = '#4CAF50';
    document.body.appendChild(btn);
    }
};
*/