class Countdown
  wedding: 1413086400

  constructor: ->
    @render()
    setInterval(@render, 1000)

  render: =>
    time = @formatTimeout @getTimeout()
    $('p.countdown').html time

  getTimeout: =>
    now = moment().unix()
    seconds = @wedding - now

    # years = Math.floor(seconds / 31536000)
    # seconds -= years * 31536000
    months = Math.floor(seconds / 2628000)
    seconds -= months * 2628000
    days = Math.floor(seconds / 86400)
    seconds -= days * 86400
    hours = Math.floor(seconds / 3600)
    seconds -= hours * 3600
    minutes = Math.floor(seconds / 60)
    seconds -= minutes * 60

    {
      # years
      months
      days
      hours
      minutes
      seconds
    }

  formatTimeout: (timeout) =>
    times = [
        # @formatTime('year', timeout.years)
        @formatTime('month', timeout.months)
        @formatTime('day', timeout.days)
        @formatTime('hour', timeout.hours)
        @formatTime('minute', timeout.minutes)
        @formatTime('second', timeout.seconds)
    ]

    return times.join(', ')

  formatTime: (frame, val) ->
    time = "#{val} #{frame}"
    if val > 1 or val is 0
        time += 's'

    return time


module.exports = Countdown