import { lettersToNumbersMap } from "./constants/letter-to-numbers-map";
import { inverseObject } from "./utils/inverse-object";

export class BaseConverter {

  private numberToLettersMap;

  constructor(){
    this.numberToLettersMap = inverseObject(lettersToNumbersMap);
  }

  convertFromBaseNToDecimal(numberToConvert: string,baseFrom: number):number{
    const digitsArray = Array.from(numberToConvert);
    let position = digitsArray.length - 1;
    let result = 0;
    for (const digit of digitsArray) {
      result += Math.pow(baseFrom, position) * this.getDigitAsNumber(digit);
      position--;
    }
    return result;
  }

  private getDigitAsNumber(digit:string){
    let result = parseInt(digit);
    if(isNaN(result)){
      result = lettersToNumbersMap[digit];
    }
    return result;
  }

  convertFromDecimalToBaseN(numberToConvert: number,baseTo: number): string {
    let numberToConvertCopy = numberToConvert;
    const remainders = [];
    while(true){
      const quotient = Math.floor(numberToConvertCopy / baseTo);
      const remainder = numberToConvertCopy % baseTo;
      remainders.push(remainder >=10 ? this.numberToLettersMap[remainder]: remainder.toString());
      numberToConvertCopy = quotient;
      if(numberToConvertCopy <  baseTo){
        break;
      }
    }

    remainders.reverse();
    let result = numberToConvertCopy >= 10 ? this.numberToLettersMap[numberToConvertCopy] as string : numberToConvertCopy.toString();

    remainders.forEach(remainder=>{
      result += remainder;
    })

    return result;
  }
}