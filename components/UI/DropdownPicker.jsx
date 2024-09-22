import React, { useEffect, useState } from 'react'
import DropDownPicker from 'react-native-dropdown-picker'

const DropdownPicker = ({
	title,
	data,
	value,
	onValueChange,
	otherStyles,
	...props
}) => {
	const [open, setOpen] = useState(false)
	const [selectedValue, setSelectedValue] = useState(value || null)
	const [items, setItems] = useState(data)

	useEffect(() => {
		onValueChange(selectedValue)
	}, [selectedValue])

	return (
		<DropDownPicker
			open={open}
			value={value}
			items={items}
			setOpen={setOpen}
			setValue={setSelectedValue}
			setItems={setItems}
			placeholder={title}
			{...props}
		/>
	)
}

export default DropdownPicker
