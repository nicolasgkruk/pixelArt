// Variable de color seleccionado, se utiliza en más de una función, por eso se declara globalmente.
var colorSeleccionado = document.getElementById("indicador-de-color");
// Variable para guardar el elemento 'color-personalizado'. Es decir, el que se elige con la rueda de color.
var colorPersonalizado = document.getElementById('color-personalizado');
// Variable mouseDown que comienza en falso.
var mouseDown = false;
// Listener de mouseDown que cambia la variable a True.
document.addEventListener("mousedown",function() {
  mouseDown = true;
});
// Listener de mouseUp que cambia la variable a False.
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

//Listener del color personalizado de la rueda de colores. Cuando cambia el personalizado, modificar el background del colorSeleccionado (el que está arriba del personalizado, o sea, el que pinta).
colorPersonalizado.addEventListener('change', 
  (function() {
    // Se guarda el color de la rueda en colorActual
    colorActual = colorPersonalizado.value;
    // Completar para que cambie el indicador-de-color al colorActual
    colorSeleccionado.style.backgroundColor = colorActual;
  })
);

// Función creadora de cada color de la paleta y listener de evento click que modifica el background color de colorSeleccionado de acuerdo a donde se haga click.
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

// Función creadora de la grilla con los dos listener de pintado: click y mouseOver.
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

// Bloque jquery. Listeners de click de los siguientes elementos:
$(document).ready(function() {
  // 1.- borrar: click anima de forma lenta a fondo blanco de los pixeles de la grilla.
  var $divsGrilla = $("#grilla-pixeles").children("div.pixel");
  $("#borrar").click(function() {
    $divsGrilla.animate({backgroundColor: 'white'}, 'slow');
  });
  // 2.- super héroes: puebla la grilla de pixeles con el superhéroe correspondiente.
  var $superHeroes = $('.imgs').find('img');
  $superHeroes.click(function(event){
    cargarSuperheroe(eval(event.target.id)); 
    })
  // 3.- guardar: crea el png y lo descarga.
  $("#guardar").click(function() {
    guardarPixelArt();
  })
  // 4.- función añadida: click en el botón "visión de rayos x" invierte los colores de esos selectores. 
  // Vale aclarar que no funciona al "Guardar", es solo efecto de ponerse unas gafas. La realidad en png
  // sale en colores "normales"
  $("#invertir").click(function() {
    $(".button, #color-personalizado, .input-color, #grilla-pixeles, .imgs, #paleta").toggleClass("inverted");
    // por alguna razón la inversión me ponía negro el "pincel", pero no "rueda de colores"
    // y si ponía en el listener "#indicador-de-color" en vez de ".input-color", entonces nunca 
    // sacaba la barra inicial que significa "sin color elegido" al iniciar la visión invertida... 
    // misterios del css.
    $("#indicador-de-color-mensaje").toggleClass("inverted");
  });
});