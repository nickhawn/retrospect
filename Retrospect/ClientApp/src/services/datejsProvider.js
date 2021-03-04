import dayjs from 'dayjs'
var utc = require('dayjs/plugin/utc')

dayjs.extend(utc)

export default dayjs