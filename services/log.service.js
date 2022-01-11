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

export { printError, printSuccess, printHelp }
