export function capitalize(string) {
	if (typeof string !== 'string' || !string.length) return '';
	const downcase = string.toLowerCase();
	return [downcase[0].toUpperCase(), ...downcase.substr(1)];
}

export function monetize(number) {
	if (!parseFloat(number)) return null;
	return `$${number}`;
}
