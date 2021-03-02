import { useState, useCallback } from 'react';
import CreditcardForm from './components/CreditcardForm';
import CreditCardPreview from './components/CreditCardPreview';
import Payment from 'payment';
import { formatCreditCardNumber, formatCVC } from './components/CreditCardPreview/cardUtils';
import './App.css';

const defaultCardDetails = {
  cardNumber: "################",
  carHolderName: "",
  expirationMonth: "",
  expirationYear: "",
  cvv: "",
  focusedElement: "",
  cardType:"visa"
}
function App() {

  const [cardDetails, setcardDetails] = useState(defaultCardDetails);

  const handleChange = useCallback((e) => {
    e.stopPropagation();
    const id = e.target.name;
    let value = e.target.value;
    if (id === "cvv") {
      value = formatCVC(value)
    }
    setcardDetails({
      ...cardDetails,
      [id]: value,
      focusedElement: id,
      cardType: Payment.fns.cardType(cardDetails.cardNumber) || "visa"
    });
  }, [cardDetails])



  return (
    <>
      <CreditCardPreview cardDetails={cardDetails} />
      <CreditcardForm cardDetails={cardDetails} handleChange={handleChange} />
    </>
  );
}

export default App;
