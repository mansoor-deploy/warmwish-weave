
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Template-specific color schemes
				cozy: {
					beige: '#F5F0E6',
					gold: '#D4AF37',
					charcoal: '#36454F'
				},
				vintage: {
					terracotta: '#E2725B',
					cream: '#F8F4E3',
					brass: '#C9A959'
				},
				urban: {
					gray: '#8A898C',
					emerald: '#046307',
					gold: '#D4AF37'
				},
				tropical: {
					green: '#7D9B76',
					pink: '#F8C8DC',
					wood: '#A67C52'
				},
				royal: {
					blue: '#002366',
					burgundy: '#800020',
					gold: '#FFD700'
				}
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Playfair Display', 'serif'],
				cursive: ['Dancing Script', 'cursive'],
				handwritten: ['Caveat', 'cursive'],
				elegant: ['Cormorant Garamond', 'serif'],
				modern: ['Montserrat', 'sans-serif'],
				display: ['Oswald', 'sans-serif']
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'door-open': {
					'0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
					'100%': { transform: 'scaleX(1)', transformOrigin: 'left' }
				},
				'scroll-reveal': {
					'0%': { transform: 'translateY(100%)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'curtain-open': {
					'0%': { transform: 'scaleX(0)', opacity: '0' },
					'100%': { transform: 'scaleX(1)', opacity: '1' }
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.6' }
				},
				'rotate-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-out': 'fade-out 0.6s ease-out',
				'scale-in': 'scale-in 0.5s ease-out',
				'door-open': 'door-open 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
				'scroll-reveal': 'scroll-reveal 1s cubic-bezier(0.16, 1, 0.3, 1)',
				'slide-in-right': 'slide-in-right 0.7s ease-out',
				'shimmer': 'shimmer 3s infinite linear',
				'float': 'float 6s ease-in-out infinite',
				'curtain-open': 'curtain-open 1.5s cubic-bezier(0.16, 1, 0.3, 1)',
				'pulse-soft': 'pulse-soft 3s ease-in-out infinite',
				'rotate-slow': 'rotate-slow 20s linear infinite'
			},
			backgroundImage: {
				'shimmer-gold': 'linear-gradient(90deg, rgba(212,175,55,0.1) 0%, rgba(212,175,55,0.3) 50%, rgba(212,175,55,0.1) 100%)',
				'curtain': 'linear-gradient(to bottom, #002366, #001133)',
				'vintage-paper': 'url("/backgrounds/vintage-paper.webp")',
				'cozy-interior': 'url("/backgrounds/cozy-interior.webp")',
				'urban-loft': 'url("/backgrounds/urban-loft.webp")',
				'tropical-leaves': 'url("/backgrounds/tropical-leaves.webp")',
				'royal-pattern': 'url("/backgrounds/royal-pattern.webp")'
			},
			boxShadow: {
				'elegant': '0 10px 30px -5px rgba(0, 0, 0, 0.1)',
				'gold': '0 5px 20px rgba(212, 175, 55, 0.4)'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
