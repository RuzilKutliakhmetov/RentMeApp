export const filtersDefaultState = {
	price_from: 0,
	price_to: 0,
	category: null,
	sorted: null,
	obtainMethod: null,
}

export const sortDefaultState = [
	{ key: 'chip', value: 'Самые дешевые', focused: false },
	{ key: 'rich', value: 'Самые дорогие', focused: false },
	{ key: 'new', value: 'Самые новые', focused: false },
]

export const obtainMethodsDefaultState = [
	{ key: 'delivery', value: 'Доставка', focused: false },
	{ key: 'pickup', value: 'Самовывоз', focused: false },
]
