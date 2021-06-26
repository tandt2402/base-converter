<script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="tandt2402" data-color="#40DCA5" data-emoji="" data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#ffffff" data-coffee-color="#FFDD00" ></script>

![badge](https://github.com/tandt2402/computer-converter/actions/workflows/deployment.yaml/badge.svg)

# Base Converter

Base converter is a NPM Package useful for converting numbers from one base to another

## Installtion

If you are using yarn:

```bash
yarn add computer-converter
```

If you are using npm:

```bash
npm install computer-converter
```

## Usage

```javascript
import { BaseConverter } from 'computer-converter';

const converter = new BaseConverter();
```

### API

**`convertFromBaseNToDecimal(numberToConvert:string, fromBase: number): number`**

Converts a number in base `N` to a decimal number. `numberToConvert` needs to be a string because when `N` is greater than or equal to `10`, we need to use letters.

```javascript
converter.convertFromBaseNToDecimal('101', 2); // return 5
converter.convertFromBaseNToDecimal('ABC', 16); // return 2748
converter.convertFromBaseNToDecimal('101.11', 2); // return 5.75
```

**`convertFromDecimalToBaseN(numberToConvert: number, toBase: number, precision: number = 2)`**

Converts a decimal number to a number in base `N`.

```javascript
converter.convertFromDecimalToBaseN(173, 16); // return 'AD'
converter.convertFromDecimalToBaseN(17.6, 3); // return '122.12'
```

**`convert(numberToConvert: string, convertOptions: object)`**

Converts a number from base `N` to a number in base `M`, The `convertOptions` contains the following properties:

```javascript
convertOptions = {
    fromBase: number;
    toBase: number;
    precision: number = 2;
}
```

```javascript
converter.convert('78', { fromBase: 11, toBase: 6 }); // return '221'
converter.convert('45.5', { fromBase: 14, toBase: 2 }); // return '111101.01'
```

## Contributing

Pull requests are wellcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit)
