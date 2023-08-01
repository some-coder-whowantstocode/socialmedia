/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'logbox':'430px',
        'ibox':'35px'
      },
      width: {
        'logbox': '350px',
        'ibox':"250px",
        'msg':"400px"
      },
      minWidth: {
        '10': '30px',
      },
      maxWidth:{
        '10':"30px"
      },
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
}
