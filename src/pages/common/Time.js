export default function Time() {
   const customdate = (date) =>{
      return new Date(date).toLocaleDateString('en-US', {
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric'
       });
   }

  return customdate
}
