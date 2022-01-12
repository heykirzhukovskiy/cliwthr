#!/usr/bin/env node
import { TOKEN_DICTIONARY } from './constants/index.js'
import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printError, printForecast, printHelp, printSuccess } from './services/log.service.js'
import { getKeyValue, saveKeyValue } from './services/storage.service.js'

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

const saveCity = async city => {
	if (!city.length) {
		printError('Вы забыли указать город')
		return
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city)
		printSuccess('Город сохранен')
	} catch (error) {
		printError(error.message)
	}
}

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
		const weather = await getWeather(city)
		printForecast(weather)
	} catch (e) {
		if (e?.response?.status === 404) {
			printError('Неверно указан город')
		} else if (e?.response?.status === 401) {
			printError('Неверно указан токен')
		} else {
			printError(e.message)
		}
	}
}

const initCLI = async () => {
	const args = getArgs(process.argv)

	if (args.h) {
		//  Вывод помощи
		return printHelp()
	}

	if (args.s?.length > 0) {
		//  Сохранение города
		const checkCity = await getWeather(args.s)
		return checkCity.name && (await saveCity(args.s))
	}

	if (args.t) {
		//  Сохранение токена
		return saveToken(args.t)
	}

	//  Вывод погоды
	getForecast()
}

initCLI()
