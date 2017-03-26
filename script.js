
var table = document.getElementById('table');
  var h1 = document.getElementsByTagName('h1')[0];

  HTMLAudioElement.prototype.stop = function() {
    this.pause();
    this.currentTime = 0.0;
  };

  window.onload = addClass();



  function addClass() {
    //***********RANDOM*********
    var arr = [];
    var arru = [];
    for (var i = 1; i < 16; i++) {
      arr.push(i);
    };

    for (;arru.length < 15;) {
      a = Math.floor(Math.random() * 15); // generate 14 max
      
      if (arr[a])  {
        arru.push(arr[a]);
        delete arr[a];
      }
    };
    //*********************************

    var elements = document.getElementsByTagName('td');
   
    for (var i = 0; i < elements.length; i++) {

    	if ( elements[i].innerHTML > 0) {
    		elements[i].classList.add('td');
        elements[i].innerHTML = arru[i];
   	  }
    }
  }



document.onmousedown = function(e) {
	var td = e.target;
  var tr = td.parentNode;
	if (td.nodeName !== 'TD') {
      return;
  }

  var TdCoords = getCoords(td);
  var tableCoords = getCoords(table);
  
  var shiftX = e.pageX - TdCoords.left;
  var shiftY = e.pageY - TdCoords.top;

  var currentX = parseInt (td.style.left);
  var currentY = parseInt (td.style.top);
  

  var trNum = tr.sectionRowIndex;
  var tdNum = td.cellIndex;
  if (tdNum !== 0) { 
    var tdEmptyLeft = table.rows[trNum].cells[tdNum - 1]; 
  }
  if (tdNum !== tr.cells.length - 1) { 
    var tdEmptyRirht = table.rows[trNum].cells[tdNum + 1];
  }

  if (trNum !== 0) { 
    var tdEmptyUp = table.rows[trNum - 1].cells[tdNum]; 
  }
  
  if (trNum !== table.rows.length - 1) { 
    var tdEmptyDown = table.rows[trNum + 1].cells[tdNum]; 
  }

  document.onmousemove = function(e) {

      var x = 0;
      var y = 0;
      if (currentX) x = currentX;
      if (currentY) y = currentY;

      // LEFT RIGHT ***************************************
      var newLeft = e.pageX - shiftX - TdCoords.left + x; //- 1*td.offsetWidth
 

      if (e.pageX - shiftX < TdCoords.left - td.offsetWidth ) {
        newLeft =  -td.offsetWidth; 
      }

      if (e.pageX + td.offsetWidth - shiftX > TdCoords.left + 2*td.offsetWidth) {
        newLeft =  td.offsetWidth;;
      }

        
      if (tdEmptyRirht && tdEmptyRirht.innerHTML == 0) {
        if (newLeft < 0 ) newLeft = 0 ;
        td.style.left =  newLeft + 'px';
      }
      
      if (tdEmptyLeft && tdEmptyLeft.innerHTML == 0) {
        if (newLeft > 0 ) newLeft = 0 ;
        td.style.left =  newLeft + 'px';
      }
      
      //********************************************************
      // UP DOWN ***********************
      var newTop = e.pageY - shiftY - TdCoords.top + y;

      if (e.pageY - shiftY < TdCoords.top - td.offsetHeight) {
        newTop =  -td.offsetHeight; 
      }

      if (e.pageY + td.offsetHeight - shiftY > TdCoords.top + 2*td.offsetHeight) {
        newTop =  td.offsetHeight;
      }

      
      if (tdEmptyUp && tdEmptyUp.innerHTML == 0) {
        if (newTop > 0 ) newTop = 0;
        td.style.top =  newTop + 'px';
      }

      if (tdEmptyDown && tdEmptyDown.innerHTML == 0) {
        if (newTop < 0 ) newTop = 0 ;
        td.style.top =  newTop + 'px';
      }  
         // *************************************************************
  };


  document.onmouseup = function(e) {
    move(e);
    document.onmousemove = document.onmouseup = null;
  };


function move(event) { 

  if (td.nodeName == 'TD') {

    if (tdEmptyRirht && tdEmptyRirht.innerHTML == 0) {
      swap(tdEmptyRirht);
    }

    if (tdEmptyLeft && tdEmptyLeft.innerHTML == 0) { 
      swap(tdEmptyLeft);
    }


    if (tdEmptyUp && tdEmptyUp.innerHTML == 0) { 
      swap(tdEmptyUp);
    }

    if (tdEmptyDown && tdEmptyDown.innerHTML == 0) { 
      swap(tdEmptyDown);
    }
  };

  function swap(Empty) {

    var audio = document.getElementById('audio');
    audio.play();


    Empty.innerHTML = td.innerHTML;
    td.innerHTML = null;

    Empty.classList.add('td');
    td.classList.remove('td');
    td.style.top = 0 + 'px';
    td.style.left =  0 + 'px';

    finish();
  };
  
};
  
return false; 


function finish() {
  var arrF = [];
  var firstTd = table.rows[0].cells[0].innerHTML;
  if (firstTd != 1) return;

  for (var i = 0; i < table.rows.length; i++) {
    
    var tR = table.rows[i];
      for (let o = 0; o < tR.cells.length; o++) { 
        arrF.push(+tR.cells[o].innerHTML);    
      }
  }

  
  var result = 1;

  for (var i = 0; i < arrF.length-3; i++) {
    if (arrF[arrF.length-2] != 15) result = 2; 
    if (arrF[i] > arrF[i+1]) result = 2;  
  }

  var finish = document.getElementById('finish');
  finish.stop();

  if (result == 1) finish.play();
};


};



function getCoords(elem) { // кроме IE8-
      var box = elem.getBoundingClientRect();

      return {
        top: box.top + pageYOffset,
        bottom: box.bottom + pageYOffset,
        left: box.left + pageXOffset,
        right: box.right + pageXOffset
      };
  };