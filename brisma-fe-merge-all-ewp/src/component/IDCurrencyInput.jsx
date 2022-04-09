import CurrencyFormat from "react-currency-format";

export default function IDCurrencyInput({ onChange, ...props}){
  return (
    <CurrencyFormat
      displayType="input"
      thousandSeparator="."
      decimalSeparator=","
      {...props}
      onValueChange={({ value }) => onChange(value)}
    />
  )
}