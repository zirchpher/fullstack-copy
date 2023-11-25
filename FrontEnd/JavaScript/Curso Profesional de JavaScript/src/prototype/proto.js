// Crear un objeto común y corriente
const goku = {
  nombre: "Son Goku",
};
goku.saludar = function () {
  console.log(`Hola soy ${this.nombre}`);
};
goku.saludar();

// ---

const vegeta = {
  nombre: "Vegeta",
};
vegeta.saludar = function () {
  console.log(`Hola soy ${this.nombre}`);
};
vegeta.saludar();

// --

const radix = {
  nombre: "Radix",
  objetivo: "Planeta Tierra",
};
radix.saludar = function () {
  console.log(`Hola soy ${this.nombre}`);
};
radix.destruir = function () {
  console.log(`El objetivo de ${this.nombre} es destruir el ${this.objetivo}`);
};
radix.saludar();
radix.destruir();

// Explicación:
// Si queremos crear otro personaje similar, tenemos que repetir el proceso, esto es tedioso e ineficiente. La única ventaja es que cada objeto al ser independiente, puede tener diferente estado y comportamiento

// Aplicar eficiencia al declarar una función que construya el objeto y lo retorne para poder invocarlo
function Personajes(nombre_personaje) {
  const guerrero = {
    nombre: nombre_personaje,
  };

  guerrero.saludar = function () {
    console.log(`Hola mi nombre es ${this.nombre}`);
  };

  return guerrero;
}

const kakaroto = Personajes("Kakaroto");
const veyita = Personajes("Veyita");
const napa = Personajes("Napa");

kakaroto.saludar();
veyita.saludar();
napa.saludar();

// Explicación
// Ahora todos nuestros objetos construidos al invocar la función tienen el mismo comportamiento. Sin embargo, la función asignada al método saludar es creada por cada Personaje instanciado

// Evitar crear la función(es) cada vez que se instancia un objeto.
const MethodsCollection = {
  saludar: function () {
    console.log(`Paisano soy ${this.nombre}`);
  },
};

function Characters(nombre_personaje) {
  const guerrero = {
    nombre: nombre_personaje,
  };
  // Punto clave
  guerrero.saludar = MethodsCollection.saludar;

  return guerrero;
}

const ranma = Characters("Ranma");
const kuno = Characters("Kuno Tatehuaki");
const rioga = Characters("Rioga");

ranma.saludar();
kuno.saludar();
rioga.saludar();

// Explicación
// Al guardar la referencia a la función y posteriormente asociarla en alguno de los metodos de nuestro objeto, nos trae mucha eficiencia de cómputo. Puesto que no se crea la función por cada instancia (caso anterior), sino que se hace referencia a la misma localización de memoria

// Object.create( )
// Esta función lo que hace es recibir un objeto como parámetro y retorna un nuevo objeto con las caracteristicas del anterior.

// Es importante destacar que el objeto devuelto esta vacío {}, sin embargo las caracteristicas heredadas se encuentran contenidas en la propiedad __proto__ (es decir se tiene acceso a ellas por herencia prototipal)

// Esto se hace para generar copias de un objeto y posteriormente extenderlas con otras caracteristicas
function Hero(nombre, categoria) {
  const luchador = Object.create(MethodsCollection);

  luchador.nombre = nombre;

  luchador.categoria = categoria;

  luchador.ki = function () {
    console.log(`Nivel de Ki aceptado en la categoría ${this.categoria}`);
  };

  return luchador;
}

const parka = Hero("La Parka", "AAA");
const octagon = Hero("Sr. Octagón", "AAA");
const mascarita = Hero("Mascarita Sagrada Jr.", "Asenso");

parka.saludar();
octagon.saludar();
mascarita.saludar();

parka.ki();
octagon.ki();
mascarita.ki();

// Explicación
// Creamos una copia del objeto que contiene todos los metodos (funciones) y posteriormente lo extendemos con algunas propiedades. Finalmente lo retornamos para poder interactuar con el objeto desde el exterior

// Prototype:
// Los métodos del objeto dentro del prototipo (__proto__) del objeto Prototipal
function Deportista(nombre, tecnica) {
  // 2. Creamos un objeto vacío, que internamente en su prototipo tiene declarada la función saludar (heredada)
  const atleta = Object.create(Deportista.prototype);
  // 3. Extendemos ese objeto
  atleta.nombre = nombre;
  atleta.tecnica = tecnica;

  return atleta;
}

// 1. Punto clave (añadir metodos al prototipo del objeto)
Deportista.prototype.saludar = function () {
  console.log(`Mi nombre es ${this.nombre} y soy un deportista`);
};

Deportista.prototype.mostrarTecnica = function () {
  console.log(`${this.nombre} tiene técnica de ${this.tecnica}`);
};

const oliver = Deportista("Oliver Atom", "Tiro con chanfle");
const tom = Deportista("Tom Izagui", "Tiro de Escuadra");

oliver.saludar();
tom.saludar();
oliver.mostrarTecnica();
tom.mostrarTecnica();

// new es un atajo (azúcar sintáctica) al caso anterior
// Su función es llevar Object.prototype al objeto de forma implícita, es decir, no tenemos que usar Object.create() ni return del objeto
function Pokemon(nombre, habilidad) {
  // 1. No hay necesidad de hacer Object.create (ya que por defecto el objeto es this)
  // 2. Se emplea el objeto this para añadir propiedades
  this.nombre = nombre;
  this.habilidad = habilidad;
  // 3. No hay necesidad de retornar el objeto this
}

// IMPORTANTE: Los prototipos se escriben sin arrow function, ya que el hacerlo cambiariamos por completo el contexto de this, ahora sería window
Pokemon.prototype.saludar = function () {
  console.log(`Taraamm, mi nombre es ${this.nombre}`);
};

Pokemon.prototype.mostrarHabilidad = function () {
  console.log(`${this.nombre} tiene la habilidad de ${this.habilidad}`);
};

// 4. La palabra clave new, pasa implicitamente el Pokemon.create(Pokemon.prototype) dentro del objeto prototipal. También retorna implicitamente el obejeto this
const pikachu = new Pokemon("Pikachú", "Rayos y Centellas");
const melindron = new Pokemon("Mélindron", "Genear Polvo");

pikachu.saludar();
melindron.saludar();
pikachu.mostrarHabilidad();
melindron.mostrarHabilidad();

// La keyword new crea un nuevo objeto que “hereda” todas las propiedades del prototype de otro objeto. No confundir prototype con __proto__, este último es sólo una propiedad en cada instancía que apunta al prototipo del que hereda.

// Como se puede observar, podemos hacer lo mismo sin hacer uso del keyword 'new', sin embargo este nos facilita muchas cosas.

// Tambien existen otros keywords como 'class' que nos ayudan a ahorrar muchas lineas de código y que éste tenga una sintaxis clara. Sin embargo, no hay que perder de vista que solo es un wrapper a los prototype...

// Esta es la evolución de JS
