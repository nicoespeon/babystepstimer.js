const BACKGROUND_COLOR_NEUTRAL = '#ffffff'
const BACKGROUND_COLOR_FAILED = '#ffcccc'
const BACKGROUND_COLOR_PASSED = '#ccffcc'

class BodyBackground {
  isNeutral () {
    return this.color === BACKGROUND_COLOR_NEUTRAL
  }

  setNeutral () {
    this.color = BACKGROUND_COLOR_NEUTRAL
  }

  setPassed () {
    this.color = BACKGROUND_COLOR_PASSED
  }

  setFailed () {
    this.color = BACKGROUND_COLOR_FAILED
  }
}

export { BodyBackground }
