import { lighten, darken } from 'polished'
export default (() => {
  const styles = {
    color: {
      primary: '#252423',
      secondary: '#FDF1BF',
      get secondaryL1 () {
        return lighten(0.4, this.secondary)
      },
      get secondaryL2 () {
        return lighten(0.6, this.secondary)
      },
      alt: '#2A3035',
      get altL1 () {
        return lighten(0.08, this.alt)
      },
      get altL2 () {
        return lighten(0.5, this.alt)
      },
      get altD1 () {
        return darken(0.04, this.alt)
      },
      get altD2 () {
        return darken(0.08, this.alt)
      },
      green: '#1FEA77',
      altDark: '#1D2329',
      light: '#FFFFFF',
      darkYellow: '#A38945',
      discordPurple: '#7289da',
      get active () {
        return this.darkYellow
      }
    },
    container: 1200,
    breakpoint: {
      sm: 500,
      md: 768,
      lg: 1100
    },
    fontSize: {
      basePx: 16,
      get basePxTablet () {
        return this.basePx - 2
      },
      get basePxMobile () {
        return this.basePx - 4
      },
      baseRem: 1,
      small: 0.8,
      nav: 0.875,
      huge: 3,
      h1: 2.6,
      h2: 2,
      h3: 1.6,
      h4: 1.2,
      h5: 0.9,
      h6: 0.5
    },
    fontWeight: {
      base: 400,
      bold: 800
    },
    spacing: {
      base: 10,
      form: 20,
      get baseRem () {
        return this.base / styles.fontSize.basePx
      }
    },
    button: {
      spacing: 25
    },
    radius: {
      base: 100
    },
    transition: {
      base: `0.3s ease-in-out`
    }
  }
  return styles
})()
