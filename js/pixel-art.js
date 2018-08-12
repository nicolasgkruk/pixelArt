var mouseDown = false;

document.addEventListener("mousedown",function() {
  mouseDown = true;

});
document.addEventListener("mouseup", function() {
  mouseDown = false;

});

var nombreColores = ['White', 'LightYellow',
  'LemonChiffon', 'LightGoldenrodYellow', 'PapayaWhip', 'Moccasin', 'PeachPuff', 'PaleGoldenrod', 'Bisque', 'NavajoWhite', 'Wheat', 'BurlyWood', 'Tan',
  'Khaki', 'Yellow', 'Gold', 'Orange', 'DarkOrange', 'OrangeRed', 'Tomato', 'Coral', 'DarkSalmon', 'LightSalmon', 'LightCoral', 'Salmon', 'PaleVioletRed',
  'Pink', 'LightPink', 'HotPink', 'DeepPink', 'MediumVioletRed', 'Crimson', 'Red', 'FireBrick', 'DarkRed', 'Maroon',
  'Brown', 'Sienna', 'SaddleBrown', 'IndianRed', 'RosyBrown',
  'SandyBrown', 'Goldenrod', 'DarkGoldenrod', 'Peru',
  'Chocolate', 'DarkKhaki', 'DarkSeaGreen', 'MediumAquaMarine',
  'MediumSeaGreen', 'SeaGreen', 'ForestGreen', 'Green', 'DarkGreen', 'OliveDrab', 'Olive', 'DarkOliveGreen', 'YellowGreen', 'LawnGreen',
  'Chartreuse', 'GreenYellow', 'Lime', 'SpringGreen', 'LimeGreen',
  'LightGreen', 'PaleGreen', 'PaleTurquoise',
  'AquaMarine', 'Cyan', 'Turquoise', 'MediumTurquoise', 'DarkTurquoise', 'DeepSkyBlue',
  'LightSeaGreen', 'CadetBlue', 'DarkCyan', 'Teal', 'Steelblue', 'LightSteelBlue', 'Honeydew', 'LightCyan',
  'PowderBlue', 'LightBlue', 'SkyBlue', 'LightSkyBlue',
  'DodgerBlue', 'CornflowerBlue', 'RoyalBlue', 'SlateBlue',
  'MediumSlateBlue', 'DarkSlateBlue', 'Indigo', 'Purple', 'DarkMagenta', 'Blue',
  'MediumBlue', 'DarkBlue', 'Navy', 'Thistle',
  'Plum', 'Violet', 'Orchid', 'DarkOrchid', 'Fuchsia', 'Magenta', 'MediumOrchid',
  'BlueViolet', 'DarkViolet', 'DarkOrchid',
  'MediumPurple', 'Lavender', 'Gainsboro', 'LightGray', 'Silver', 'DarkGray', 'Gray',
  'DimGray', 'LightSlateGray', 'DarkSlateGray', 'Black'
];

var colorSeleccionado = document.getElementById("indicador-de-color");

(function palette() {

  var palette = document.getElementById("paleta");

  for (i=0; i < nombreColores.length; i++) {
    var newChild = document.createElement("div");
    newChild.style.backgroundColor = nombreColores[i];
    newChild.classList.add("color-paleta");
    palette.appendChild(newChild);
    };

  palette.addEventListener("click", function (event) {
   colorSeleccionado.style.backgroundColor = event.target.style.backgroundColor;
  });
})();

(function grid() {

  var grillaPixeles = document.getElementById("grilla-pixeles");

  for (i=0; i < 1750; i++) {
    var newPixel = document.createElement("div");
    newPixel.classList.add("pixel");
    grillaPixeles.appendChild(newPixel);
  }

  grillaPixeles.addEventListener("click", function(event) {
    event.target.style.backgroundColor = colorSeleccionado.style.backgroundColor;
  });

  grillaPixeles.addEventListener("mouseover", function(event) {
    if (mouseDown) {
      event.target.style.backgroundColor = colorSeleccionado.style.backgroundColor;
  }});
})();

// Variable para guardar el elemento 'color-personalizado'
// Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');

colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    colorSeleccionado.style.backgroundColor = colorActual;
  })
);

function cargarSuperheroe(superheroe) {
  var $pixeles = $("#grilla-pixeles div");
  for (var i = 0; i < superheroe.length; i++) {
    $pixeles[i].style.backgroundColor = superheroe[i];
  }
}

function guardarPixelArt() {
  html2canvas($("#grilla-pixeles") , {
    onrendered: function(canvas) {
      theCanvas = canvas;
      canvas.toBlob(function(blob) {
        saveAs(blob, "pixel-art.png");
      });
    }
  });
}

$(document).ready(function() {
  var $divsGrilla = $("#grilla-pixeles").children("div.pixel");
  $("#borrar").click(function() {
    $divsGrilla.animate({backgroundColor: 'white'}, 'slow');
  });

  var $superHeroes = $('.imgs').find('img');
  $superHeroes.click(function(event){
    cargarSuperheroe(eval(event.target.id)); 
    })

  $("#guardar").click(function() {
    guardarPixelArt();
  })
});

/* (function todosLosColores() {

  for (i=0; i < nombreColores.length; i++) {
    var newChild = document.createElement("div");
    newChild.style.backgroundColor = nombreColores[i];
    newChild.classList.add("color-paleta");
    newChild.addEventListener("click", indicarColor(i));
    paleta.appendChild(newChild);
    }

  function indicarColor(i){
    return function() {
    colorSeleccionado.style.backgroundColor = nombreColores[i];
    }
  };
  
})();

(function populateGrid() {
  for (i=0; i < 1750; i++) {
    var newChild = document.createElement("div");
    newChild.classList.add("grilla");
    newChild.addEventListener("click", indicarColor(i));
    newChild.addEventListener("mouseover", pintarEnMovimiento(i));
    grillaPixeles.appendChild(newChild);
  }

  var arrayGrilla = document.getElementsByClassName("grilla");

  function indicarColor(i) {
    return function() {
      var seleccionActual = colorSeleccionado.style.backgroundColor;
      arrayGrilla[i].style.backgroundColor = seleccionActual;
    }
  }

  function pintarEnMovimiento(i) {
    return function() {
      if (mouseDown) {
        var seleccionActual = colorSeleccionado.style.backgroundColor;
        arrayGrilla[i].style.backgroundColor = seleccionActual;
      }
    }
  }
})(); */