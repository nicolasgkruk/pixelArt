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
      console.log("event target was:" + event.target);
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

  $("#invertir").click(function() {
    console.log("entra a la callback");
    $(".button").toggleClass("inverted");
    $(".input-color").toggleClass("inverted");
    $("#grilla-pixeles").toggleClass("inverted");
    $(".imgs").toggleClass("inverted");
    $("#paleta").toggleClass("inverted");
  });

  
});