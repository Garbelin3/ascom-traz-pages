
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
				ascom: {
					50: 'var(--ascom-50)',
					100: 'var(--ascom-100)',
					200: 'var(--ascom-200)',
					300: 'var(--ascom-300)',
					400: 'var(--ascom-400)',
					500: 'var(--ascom-500)',
					600: 'var(--ascom-600)',
					700: 'var(--ascom-700)',
					800: 'var(--ascom-800)',
					900: 'var(--ascom-900)',
					DEFAULT: 'var(--ascom-500)',
					light: 'var(--ascom-400)',
					dark: 'var(--ascom-600)',
					contrastText: '#FFFFFF'
				},
				success: {
					50: 'var(--success-50)',
					500: 'var(--success-500)',
					600: 'var(--success-600)',
					DEFAULT: 'var(--success-500)'
				},
				warning: {
					50: 'var(--warning-50)',
					500: 'var(--warning-500)',
					600: 'var(--warning-600)',
					DEFAULT: 'var(--warning-500)'
				},
				error: {
					50: 'var(--error-50)',
					500: 'var(--error-500)',
					600: 'var(--error-600)',
					DEFAULT: 'var(--error-500)'
				},
				gray: {
					50: 'var(--gray-50)',
					100: 'var(--gray-100)',
					200: 'var(--gray-200)',
					300: 'var(--gray-300)',
					400: 'var(--gray-400)',
					500: 'var(--gray-500)',
					600: 'var(--gray-600)',
					700: 'var(--gray-700)',
					800: 'var(--gray-800)',
					900: 'var(--gray-900)'
				}
			},
			fontFamily: {
				inter: ["'Inter'", "sans-serif"],
				nunito: ["'Nunito Sans'", "sans-serif"]
			},
			fontSize: {
				xs: 'var(--text-xs)',
				sm: 'var(--text-sm)',
				base: 'var(--text-base)',
				lg: 'var(--text-lg)',
				xl: 'var(--text-xl)',
				'2xl': 'var(--text-2xl)',
				'3xl': 'var(--text-3xl)',
				'4xl': 'var(--text-4xl)',
				'5xl': 'var(--text-5xl)',
				'6xl': 'var(--text-6xl)'
			},
			spacing: {
				'0': 'var(--space-0)',
				'1': 'var(--space-1)',
				'2': 'var(--space-2)',
				'3': 'var(--space-3)',
				'4': 'var(--space-4)',
				'5': 'var(--space-5)',
				'6': 'var(--space-6)',
				'8': 'var(--space-8)',
				'10': 'var(--space-10)',
				'12': 'var(--space-12)',
				'16': 'var(--space-16)',
				'20': 'var(--space-20)',
				'24': 'var(--space-24)',
				'32': 'var(--space-32)'
			},
			borderRadius: {
				none: 'var(--radius-none)',
				sm: 'var(--radius-sm)',
				base: 'var(--radius-base)',
				md: 'var(--radius-md)',
				lg: 'var(--radius-lg)',
				xl: 'var(--radius-xl)',
				'2xl': 'var(--radius-2xl)',
				'3xl': 'var(--radius-3xl)',
				full: 'var(--radius-full)'
			},
			boxShadow: {
				sm: 'var(--shadow-sm)',
				base: 'var(--shadow-base)',
				md: 'var(--shadow-md)',
				lg: 'var(--shadow-lg)',
				xl: 'var(--shadow-xl)',
				'2xl': 'var(--shadow-2xl)'
			},
			transitionDuration: {
				75: 'var(--duration-75)',
				100: 'var(--duration-100)',
				150: 'var(--duration-150)',
				200: 'var(--duration-200)',
				300: 'var(--duration-300)',
				500: 'var(--duration-500)',
				700: 'var(--duration-700)',
				1000: 'var(--duration-1000)'
			},
			transitionTimingFunction: {
				'ease-back': 'var(--ease-back)',
				'ease-elastic': 'var(--ease-elastic)'
			},
			zIndex: {
				0: 'var(--z-0)',
				10: 'var(--z-10)',
				20: 'var(--z-20)',
				30: 'var(--z-30)',
				40: 'var(--z-40)',
				50: 'var(--z-50)',
				modal: 'var(--z-modal)',
				overlay: 'var(--z-overlay)',
				dropdown: 'var(--z-dropdown)',
				toast: 'var(--z-toast)',
				tooltip: 'var(--z-tooltip)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-right': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-out-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'bounce-subtle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-in-right': 'slide-in-right 0.3s ease-out',
				'slide-out-right': 'slide-out-right 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'shimmer': 'shimmer 1.5s infinite',
				'float': 'float 3s ease-in-out infinite',
				'bounce-subtle': 'bounce-subtle 2s infinite',
				'pulse-slow': 'pulse 3s ease-in-out infinite'
			},
			backdropBlur: {
				xs: '2px',
				sm: '4px',
				md: '8px',
				lg: '12px',
				xl: '16px',
				'2xl': '24px',
				'3xl': '32px'
			},
			screens: {
				xs: '320px',
				'2xl': '1536px'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
