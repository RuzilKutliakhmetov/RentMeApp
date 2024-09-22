import {
	obtainMethodsDefaultState,
	sortDefaultState,
} from '../constants/defaultState'

export const updateFilterListData = (filterType, filterValue) => {
	const defaultState =
		filterType === 'obtainMethod' ? obtainMethodsDefaultState : sortDefaultState
	return defaultState.reduce((acc, item) => {
		if (item.key === filterValue) {
			return [...acc, { ...item, focused: true }]
		}
		return [...acc, item]
	}, [])
}

export const handleFilterPress = (
	listData,
	listSetter,
	filterKey,
	item,
	index,
	setFilterForm
) => {
	if (listData[index].focused) {
		listSetter(prevListData =>
			prevListData.map((prevItem, i) => ({
				...prevItem,
				focused: i === index ? false : prevItem.focused,
			}))
		)
		setFilterForm(prevFilterForm => ({
			...prevFilterForm,
			[filterKey]: null,
		}))
	} else {
		listSetter(prevListData =>
			prevListData.map((prevItem, i) => ({
				...prevItem,
				focused: i === index,
			}))
		)
		setFilterForm(prevFilterForm => ({
			...prevFilterForm,
			[filterKey]: item.key,
		}))
	}
}
