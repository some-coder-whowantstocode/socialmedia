/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      height: {
        'logbox':'430px',
        'logboxp':'400px',
        'ibox':'35px',
        'con':'400px',
        'conp':'420px'
      },
      width: {
        'logbox': '350px',
        'logboxp':'300px',
        'ibox':"250px",
        'msg':"400px",
        'rest':"calc(100vw - 350px)",
        'con':"600px",
        'conp':"300px"
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
      transitionDuration:{
        '2s':'2s',
        '1s':'1s'
      },
      animation: {
        'spin-slow': 'spin 4s linear infinite',
      },
      boxShadow: {
        'navshadow': ' 0px -2px 5px 0px rgba(0,0,0,0.75)',
      }
    },

  },
  plugins: [],
}
