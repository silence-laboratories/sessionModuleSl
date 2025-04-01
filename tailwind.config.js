// tailwind.config.js
module.exports = {
    // ...
    theme: {
      extend: {
        animation: {
          floatOrb1: 'floatOrb1 8s ease-in-out infinite',
          floatOrb2: 'floatOrb2 8s ease-in-out infinite',
          fadeInUp: 'fadeInUp 0.5s ease-out forwards',
          scaleIn: 'scaleIn 0.3s ease forwards',
          gradientBG: 'gradientBG 8s ease infinite',
        },
        keyframes: {
          floatOrb1: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(20px, 20px)' },
          },
          floatOrb2: {
            '0%, 100%': { transform: 'translate(0, 0)' },
            '50%': { transform: 'translate(-20px, -20px)' },
          },
          fadeInUp: {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          scaleIn: {
            '0%': { opacity: 0, transform: 'scale(0.9)' },
            '100%': { opacity: 1, transform: 'scale(1)' },
          },
          gradientBG: {
            '0%, 100%': {
              'background-position': '0% 50%',
            },
            '50%': {
              'background-position': '100% 50%',
            },
          },
        },
      },
    },
    // ...
  };
  