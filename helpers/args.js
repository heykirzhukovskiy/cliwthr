const getArgs = args => {
	const res = {}
	const [exec, file, ...rest] = args
	rest.forEach((arg, i, arr) => {
		if (arg === undefined) {
			return
		}

		if (arg.charAt(0) === '-') {
			if (i === arr.length - 1) {
				res[arg.charAt(1)] = true
			} else if (arr[i + 1] && arr[i + 1].charAt(0) !== '-') {
				res[arg.charAt(1)] = arr[i + 1]
			} else {
				res[arg.charAt(1)] = true
			}
		}
	})

	return res
}

export { getArgs }
