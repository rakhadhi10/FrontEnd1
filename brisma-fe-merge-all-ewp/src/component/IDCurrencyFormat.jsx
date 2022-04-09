import CurrencyFormat from "react-currency-format";

export default function IDCurrencyFormat(props){
  return (
    <CurrencyFormat
      displayType="text"
      prefix="Rp. "
      suffix=",-"
      thousandSeparator="."
      decimalSeparator=","
      {...props}
    />
  )
}