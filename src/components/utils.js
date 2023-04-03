//redondea resultado a 4 decimales y elimina los ceros seguidos por el final de la cadena y los reemplaza por cadena vacía
export function roundAndStripZeros(number) {
  const rounded = Math.abs(number).toFixed(4);
  return rounded.replace(/\.?0+$/, '');
}
