import { BaseConverter } from "./base-converter";
let converter: BaseConverter;

beforeAll(()=>{
  converter = new BaseConverter();
});

describe('convertFromBaseNToDecimal{}',()=>{
  describe('When give a number in a base that is less than or equal to 10', ()=>{
    test('should convert it to decimal',()=>{
      expect(converter.convertFromBaseNToDecimal('1101',2)).toEqual(13);
      expect(converter.convertFromBaseNToDecimal('11011',2)).toEqual(27);
      expect(converter.convertFromBaseNToDecimal('1210',3)).toEqual(48);
    })
  })

  describe('When give a number in a base that is greater than 10', ()=>{
    test('should convert it to decimal',()=>{
      expect(converter.convertFromBaseNToDecimal('1A1',11)).toEqual(232);
      expect(converter.convertFromBaseNToDecimal('1B1',14)).toEqual(351);
      expect(converter.convertFromBaseNToDecimal('ABC',16)).toEqual(2748);
    })
  })
})

describe('convertFromDecimalToBaseN{}',()=>{
  describe('When give a decimal number', ()=>{
    test('should convert it to a base N number',()=>{
      expect(converter.convertFromDecimalToBaseN(13,2)).toEqual('1101');
      expect(converter.convertFromDecimalToBaseN(27,2)).toEqual('11011');
      expect(converter.convertFromDecimalToBaseN(48,3)).toEqual('1210');
      expect(converter.convertFromDecimalToBaseN(232,11)).toEqual('1A1');
      expect(converter.convertFromDecimalToBaseN(351,14)).toEqual('1B1');
      expect(converter.convertFromDecimalToBaseN(2748,16)).toEqual('ABC');
    })
  })
})