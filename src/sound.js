/* globals Audio */

class Sound {
  playStruck () {
    this.play('struck')
  }

  playShipsbell () {
    this.play('shipsbell')
  }

  play (name) {
    new Audio('./sounds/' + name + '.wav').play()
  }
}

export { Sound }
