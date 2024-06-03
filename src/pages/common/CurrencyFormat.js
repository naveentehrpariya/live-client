import React from 'react'

export default function CurrencyFormat() {
   const formatCurrency = (amount, locale = 'en-US', currency = 'USD') => {
      return new Intl.NumberFormat(locale, {
         style: 'currency',
         currency: currency,
      }).format(amount);
   };
 
   return formatCurrency
}
