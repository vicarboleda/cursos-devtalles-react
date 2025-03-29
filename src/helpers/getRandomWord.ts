const words: string[] = [
  'COMPUTADORA',
  'AGUACATE',
  'PAPAYA',
  'MANZANA',
  'PERA',
  'VEHICULO',
  'ANIMAL',
  'VETERINARIO',
  'CELULAR',
  'TELEFONO'
];

export function getRandomWord() {

  const randomIndex = Math.floor(Math.random() * words.length);

  return words[randomIndex];

}