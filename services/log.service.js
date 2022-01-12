import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = msg => {
	console.log(chalk.bgRed(' ERROR '), ' ', msg)
}

const printSuccess = msg => {
	console.log(chalk.bgGreen(' SUCCESS '), ' ', msg)
}

const printHelp = msg => {
	console.log(
		dedent`
			${chalk.bgCyan(' HELP ')}
			Без параметров - вывод погоды
			-s [CITY] для установки города
			-h помощь
			-t [API_KEY] для установки токена
		`,
	)
}

const printForecast = ({ name, weather, main: { temp, feels_like } }) => {
	let messages = []
	if (!name) {
		throw new Error('Что-то пошло не так, мы не нашли город(')
	}

	messages.push(`В городе ${name}`)

	const descr = weather[0].description
	if (descr) {
		messages.push(`Сегодня ${descr}`)
	}

	if (temp) {
		messages.push(`Температура ${temp}`)
	}

	if (feels_like) {
		messages.push(`Ощущается как ${feels_like}`)
	}

	const res = messages.map(msg => `${chalk.black.bgWhite(' Погода: ')} ${msg}`).join('\n')

	console.log(dedent(res))
}

export { printError, printSuccess, printHelp, printForecast }
