module.exports = {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         screens: {
            xs: "425px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
         },
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
