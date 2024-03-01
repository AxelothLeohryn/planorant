/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        valorant: ["Valorant", "system-ui"],
        DIN: ["DIN", "system-ui"],
      },
    },
  },
  plugins: [
    require("rippleui")({
      // defaultStyle: false,
      removeThemes: [""],
      themes: [
        {
          themeName: "dark",
          
          colors: {
            primary: "#e74a39",
          },
        },
        {
          themeName: "light",
          
          colors: {
            primary: "#e74a39",
          },
        },
        // {
        //   themeName: "custom",
        //   colorScheme: "light",
        //   prefersColorScheme: true,
        //   colors: {
        //     primary: "#ffb800",
        //     backgroundPrimary: "#583533",
        //   },
        // },
      ],
    }),
  ],
};
