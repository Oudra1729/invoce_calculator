function numberToWords(number: number): string {
  const units = ['', 'un', 'deux', 'trois', 'quatre', 'cinq', 'six', 'sept', 'huit', 'neuf', 'dix', 'onze', 'douze', 'treize', 'quatorze', 'quinze', 'seize', 'dix-sept', 'dix-huit', 'dix-neuf'];
  const tens = ['', '', 'vingt', 'trente', 'quarante', 'cinquante', 'soixante', 'soixante-dix', 'quatre-vingt', 'quatre-vingt-dix'];

  if (number === 0) return 'zéro';

  function convertLessThanOneThousand(n: number): string {
    if (n < 20) return units[n];
    
    const digit = n % 10;
    if (n < 100) {
      return tens[Math.floor(n / 10)] + (digit ? '-' + units[digit] : '');
    }
    
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return (hundred > 1 ? units[hundred] + ' cents ' : 'cent ') + (rest ? convertLessThanOneThousand(rest) : '');
  }

  let result = '';
  let remaining = number;

  if (remaining >= 1000000000) {
    const billions = Math.floor(remaining / 1000000000);
    result += convertLessThanOneThousand(billions) + ' milliard' + (billions > 1 ? 's ' : ' ');
    remaining %= 1000000000;
  }

  if (remaining >= 1000000) {
    const millions = Math.floor(remaining / 1000000);
    result += convertLessThanOneThousand(millions) + ' million' + (millions > 1 ? 's ' : ' ');
    remaining %= 1000000;
  }

  if (remaining >= 1000) {
    const thousands = Math.floor(remaining / 1000);
    result += convertLessThanOneThousand(thousands) + ' mille ';
    remaining %= 1000;
  }

  if (remaining > 0) {
    result += convertLessThanOneThousand(remaining);
  }

  return result.trim();
}

export function convertToWordsAndDirhams(amount: number): string {
  const wholePart = Math.floor(amount);
  const decimalPart = Math.round((amount - wholePart) * 100);

  let result = numberToWords(wholePart) + ' dirhams';
  if (decimalPart > 0) {
    result += ' et ' + numberToWords(decimalPart) + ' centimes';
  }

  return result.charAt(0).toUpperCase() + result.slice(1);
}

