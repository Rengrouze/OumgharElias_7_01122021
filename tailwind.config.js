module.exports = {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         animation: {
            fade: "fade 0.5s ease-in-out linear",
         },

         keyframes: {
            fade: {
               "0%": {
                  opacity: 0,
               },
               "100%": {
                  opacity: 0,
               },
            },
         },
      },
   },
   plugins: [],
};
