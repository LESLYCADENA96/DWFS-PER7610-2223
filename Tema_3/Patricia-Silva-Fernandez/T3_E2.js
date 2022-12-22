/**
 * En estos ejercicios es obligatorio uso de funciones de primer orden y callbacks sobre estructuras de datos
 * Sera necesario utilizar estructuras de datos diferentes a arrays (tambien arrays)
 * No se permite el uso de bucles for(;;) ni while, se debe usar funciones de primer orden (forEach, filter, map, reduce...)
 */

/**
 * Funcion 1
 * 
 * Duplicador
 * 
 * Se pide: Mediante funciones de primer orden, crear una funcion duplicador que recibe como argumento un array de numeros y devuelve otro array duplicando aquellos que sean pares
 * El tamaño del array resultado, por tanto, podra ser distinto del tamaño del array original
 * 
 * Ejemplo: duplicador([1,2,3,4]) -> [4,8]
 */
const duplicador= numeros=>{
    let result = []
    let i = 0;
    let pares = numeros.filter(element => element%2 == 0);
    
    return pares.map(element => element*2);
}
console.log(duplicador([1,2,3,4]));

/**
 * Funcion 2
 * 
 * Media
 * 
 * Se pide: Mediante funciones de primer orden, crear una funcion media que recibe como argumento un array de numeros y devuelve la media de sus elementos
 * 
 * Ejemplo: media([1,2,3,4]) -> 2.5
 */
const media= numeros=>{
    const reducer = (acumulator, currentValue) => acumulator + currentValue;
    let suma = numeros.reduce(reducer);
    return suma/numeros.length;
}
console.log(media([1,2,3,4]));

/**
 * Funcion 3
 * 
 * Eliminar duplicados
 * 
 * Se pide: Mediante funciones de primer orden, crear una funcion eliminarDuplicados que recibe como argumento un array de numeros con duplicados y devuelve otro cuyos elementos son unicos
 * Se valoraran especialmente soluciones donde sea necesario recorrer el array pasado como argumento una unica vez (de una pasada)
 * 
 * Ejemplo: eliminarDuplicados([5,1,2,1,3,3,4,5]) -> [2,4]
 */
const eliminarDuplicados= numeros=>{
    let nVeces = {};
    numeros.forEach(numero => {
        if(nVeces[numero] == undefined) nVeces[numero] = 1;
        else nVeces[numero] += 1;
      });

    let keys = Object.keys(nVeces);
    return keys.filter(element => nVeces[element] == 1 );
}
console.log(eliminarDuplicados([5,1,2,1,3,3,4,5]));

/**
 * Funcion 4
 * 
 * Caracteres consecutivos
 * 
 * Se pide: Mediante funciones de primer orden, crear una funcion nCharConsec que recibe 3 argumentos:
 * - El caracter por el que se quiere buscar
 * - El numero de repeticiones consecutivas que se desea buscar
 * - La cadena (string) donde buscar
 * Devuelve 'true' si hay N repeticiones del caracter especificado en la cadena, 'false' en caso contrario.
 * Se valoraran especialmente soluciones donde sea necesario recorrer la cadena pasada como argumento una unica vez (de una pasada) sin bucles anidados
 * 
 * Ejemplo: nCharConsec(*, 4, "Est* *** es un ejemplo") -> false (tenemos en cuenta los espacios)
 * Ejemplo: nCharConsec(*, 4, "Est**** es un ejemplo") -> true 
 * Ejemplo: nCharConsec(*, 4, "Est** e* un ej**plo") -> false
 * 
 */
const nCharConsec= (caracter, nRep, cadena) =>{
    let cadenaArr = cadena.split("");
    let array = [];
    let cadenaComparar = caracter.repeat(nRep-1);
    cadenaArr.forEach((element, index) => {
        if(element == caracter && cadena.substring(index+1, index+nRep) == cadenaComparar) array.push(element);
      });
    return array.length != 0;
}
console.log(nCharConsec("*", 4, "Est* *** es un ejemplo"));
console.log(nCharConsec("*", 4, "Est**** es un ejemplo"));
console.log(nCharConsec("*", 4, "Est** e* un ej**plo"));

/**
 * Funcion 5
 * 
 * Generador de numeros aleatorios
 * 
 * Se pide: Mediante funciones de primer orden, crear una funcion generador que recibe 1 argumento:
 * - N: El tamaño del mapa a devolver
 * 
 * Este metodo creara en primer lugar un array de numeros aleatorios no repetidos, de tamaño N.
 * Despues filtrara el array para eliminar los 0 y los duplicados, si hay alguno.
 * Despues, creara un mapa donde: 
 * - Las claves seran los valores de cada una de las coordenadas del array creado
 * - Los valores seran la media de todos los elementos del array filtrado previos anteriores a cada componente del array filtrado, incluyendo el valor del componente actual del array filtrado que se esta utilizando
 * 
 * Ejemplo: generador(6) -> Map()
 * Genera un array aleatorio de numeros, supongamos [2,2,6,7,1,0]
 * Se filtra el array -> [2,6,7,1]
 * Genera y devuelve un mapa conforme a la especificacion, con las siguientes entradas:
 * [2, 2] (2 /2 = 1)
 * [6, 4] (2+6 /2 = 4)
 * [7, 5] (2+6+7 /3 = 5)
 * [1, 4] (2+6+7+1 /4 = 4)
 */
const generador= numero =>{
    let numerosAl = Array.from({length: numero}, () => Math.floor(Math.random() * 10));
    console.log("Array inicial: " + numerosAl);
    
    let noRep = [...new Set(numerosAl)];
    let filtrados = noRep.filter(element => element != 0 );
    console.log("Array filtrado: " + filtrados);

    let map = new Map();
    let suma = 0;
    filtrados.forEach((element, index) => {
        suma += element;
        map.set(element, suma/(index+1));
    })

    return map;
}
console.log(generador(6));
