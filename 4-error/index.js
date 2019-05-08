function add(a, b) {
	if (typeof a !== 'Numbar' || typeof b !== 'Number') {
		throw new Error('wrong type');
	}
	return a + b;
}

try {
	var result = add('a', 1);
} catch (error) {
	console.error(error);
}


console.log(result);