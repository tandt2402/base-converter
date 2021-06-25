import { lettersToNumbersMap } from "./constants/letter-to-numbers-map";
import { ConvertOptions } from "./interfaces/convert-options";
import { inverseObject } from "./utils/inverse-object";
import { isInteger } from "./utils/is-integer";

export class BaseConverter {

  private numberToLettersMap;
  private delimiter = '.';

  constructor(){
    this.numberToLettersMap = inverseObject(lettersToNumbersMap);
  }

  private validateNumberInBaseN(numberToConvert: string, baseFrom:number):void{
    if( typeof numberToConvert !== 'string'){
      throw new Error('Number to convert must be a string');
    }

    if(!isInteger(baseFrom)){
      throw new Error('Base from needs to be a number');
    }

    const splitterdNumberByDelimiter = numberToConvert.split(this.delimiter);
    if(splitterdNumberByDelimiter.length < 1 || splitterdNumberByDelimiter.length > 2){
      throw new Error('Number contains more than one delimiter');
    }

    const digits = Array.from(numberToConvert).filter(digit => digit !== this.delimiter);
    for (const digit of digits) {
      const digitAsNumber = this.getDigitAsNumber(digit);
      if(typeof digitAsNumber === "undefined" || digitAsNumber >= baseFrom){
        throw new Error('Invalid number');
      }
    }
  }

  convertFromBaseNToDecimal(numberToConvert: string,baseFrom: number):number{
    this.validateNumberInBaseN(numberToConvert,baseFrom);
    const digitsArray = Array.from(numberToConvert).filter(digit => digit !== this.delimiter);
    let position = numberToConvert.split(this.delimiter)[0].length - 1;
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

  private convertIntegerPart(integerPart: number, baseTo:number){
    const remainders = [];
    while(true){
      const quotient = Math.floor(integerPart / baseTo);
      const remainder = integerPart % baseTo;
      remainders.push(remainder >=10 ? this.numberToLettersMap[remainder]: remainder.toString());
      integerPart = quotient;
      if(integerPart <  baseTo){
        break;
      }
    }

    remainders.reverse();
    let result = integerPart >= 10 ? this.numberToLettersMap[integerPart] as string : integerPart.toString();

    remainders.forEach(remainder=>{
      result += remainder;
    });

    while(result[0] === '0' && result.length !== 1){
      result = result.slice(1);
    }

    return result; 
  }

  private convertDecimalPart(decimalPart: number, baseTo:number,precision: number){
    let result = '';
    let decimalPartCopy = decimalPart;

    for (let index = 0; index < precision; index++) {
      decimalPartCopy *= baseTo;
      const integerPart = Math.floor(decimalPartCopy);
      result += decimalPartCopy >= 10 ? this.numberToLettersMap[integerPart]: integerPart.toString();
      decimalPartCopy %= 1;
    }

    return result;
  }

  private validateDecimalNumber(numberToConvert: number, baseTo: number, precision:number){
    if(!isInteger(baseTo)){
      throw new Error('Base needs to be an integer');
    }

    if(!isInteger(precision)){
      throw new Error('Precision needs to be an integer');
    }

    if(typeof numberToConvert !== "number"){
      throw new Error('Number to convert needs to be a number');
    }
  }

  convertFromDecimalToBaseN(numberToConvert: number,baseTo: number, precision = 2): string {
    this.validateDecimalNumber(numberToConvert,baseTo,precision);
    const numberToConvertCopy = numberToConvert;
    const decimalPart = numberToConvertCopy % 1;
    const integerPart = Math.floor(numberToConvertCopy);
    const convertedIntegerPart = this.convertIntegerPart(integerPart, baseTo);

    if(decimalPart){
      const convertedDecimalPart = this.convertDecimalPart(decimalPart, baseTo, precision);
      return `${convertedIntegerPart}.${convertedDecimalPart}`;
    }
    return convertedIntegerPart;
  }
  /**
   * This function allows you to convert a number in base `N` to a number in base `M`
   * @param numberToConvert The number in base `N` we want to convert
   * @param convertOptions An object with the options for the convert method to work
   * @returns The number in base `N` converted to base `M`
   */
  convert(numberToConvert:string, {fromBase, toBase, precision = 2}: ConvertOptions):string{
    const decimalNumber = this.convertFromBaseNToDecimal(numberToConvert,fromBase);
    return this.convertFromDecimalToBaseN(decimalNumber, toBase, precision);
  }
}