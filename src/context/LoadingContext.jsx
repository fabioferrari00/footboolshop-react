import { createContext } from "react";
//creo un global context per poter attivare e disattivare la funzione di loading che deve apparire al caricamento di tutti gli elementi
const LoadingContext = createContext()

export default LoadingContext
