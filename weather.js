#!/usr/bin/env node
import { TOKEN_DICTIONARY } from './constants/index.js'
import { getArgs } from './helpers/args.js'
import { printError, printHelp, printSuccess } from './services/log.service.js'
import { getKeyValue, saveKeyValue } from './services/storage.service.js'
import { getWeather } from './services/api.service.js'

const saveToken = async token => {
	if (!token.length) {
		printError('Токен не передан')
		return
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token)
		printSuccess('Токен сохранен')
	} catch (error) {
		printError(error.message)
	}
}

const initCLI = async () => {
	const args = getArgs(process.argv)

	if (args.h) {
		//  Вывод помощи
		printHelp()
	}
	if (args.s) {
		//  Сохранение города
		saveKeyValue(TOKEN_DICTIONARY.city, args.s)
	}
	if (args.t) {
		//  Сохранение токена
		return saveToken(args.t)
	}
	//  Вывод погоды
	getWeather('Moscow')
}

initCLI()
