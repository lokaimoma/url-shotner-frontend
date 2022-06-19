module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        clr_primary: "#5754FE",
      },
      fontFamily: {
        "logo-font": ["Proza Libre"],
      },
      keyframes: {
        slide_in: {
          from: { transform: "translateY(-300px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        slide_out: {
          from: { transform: "translateY(0)", opacity: "1" },
          to: { transform: "translateY(-300px)", opacity: "0" },
        },
      },
      animation: {
        slide_in: "slide_in 500ms ease-in-out forwards",
        slide_out: "slide_out 250ms ease-in-out forwards",
      },
    },
  },
  plugins: [],
};
