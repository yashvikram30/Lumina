module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./hooks/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    "bg-yellow-300",
    "bg-pink-200",
    "bg-blue-200",
    "bg-green-200",
    "bg-purple-200",
    "shadow-[8px_8px_0_0_#ec4899]",
    "shadow-[8px_8px_0_0_#6366f1]",
    "shadow-[8px_8px_0_0_#22c55e]",
    "shadow-[8px_8px_0_0_#a21caf]",
    "shadow-[8px_8px_0_0_#000]",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}; 