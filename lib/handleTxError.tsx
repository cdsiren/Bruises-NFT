import { toast } from "react-toastify";

// would appreciate if anyone who forks this repo contributes new error messages back to the main branch so that we can best enable plain english messages for all error types
const errorMessages = [
  {
    error: "gas required exceeds allowance",
    solution: "Insufficient balance. Add more funds to your wallet.",
  },
  {
    error: "err: insufficient funds for gas",
    solution: "Insufficient balance. Add more funds to your wallet.",
  },
  {
    error: "A wallet request of type eth_accounts was made to a disconnected wallet",
    solution: "Please switch network to Ethereum Mainnet.",
  },
  {
    error: "underlying network changed (event=",
    solution: "Please refresh the page.",
  },
];

const handleTxError = (error:any) => {
  const primaryError = error?.data?.message;
  const nestedError = error?.error?.message;
  const fallbackError = error.message;
  let customToastMessage;
  for (let i = 0; i < errorMessages.length; i++) {
    if (primaryError?.toLowerCase().trim().includes(errorMessages[i].error.toLowerCase().trim())) {
      customToastMessage = errorMessages[i].solution;
    } else if (nestedError?.toLowerCase().trim().includes(errorMessages[i].error.toLowerCase().trim())) {
      customToastMessage = errorMessages[i].solution;
    } else if (fallbackError?.toLowerCase().trim().includes(errorMessages[i].error.toLowerCase().trim())) {
      customToastMessage = errorMessages[i].solution;
    } else {
      customToastMessage = primaryError || nestedError || fallbackError;
    }
  }
  toast.error(customToastMessage);
};

export default handleTxError;