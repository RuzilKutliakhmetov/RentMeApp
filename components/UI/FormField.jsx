import React, { useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'

import { icons } from '../../constants'

const FormField = ({
	title,
	value,
	placeholder,
	handleChangeText,
	otherStyles,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false)
	return (
		<View className={`space-y-2 ${otherStyles}`}>
			{title | (title !== '') ? (
				<Text className='text-base text-fourth font-pmedium'>{title}</Text>
			) : (
				<></>
			)}

			<View className='w-full h-16 px-4 bg-slate-100 rounded-2xl border-2 border-slate-200 focus:border-slate-200 flex flex-row items-center'>
				<TextInput
					className='flex-1 text-third-100 font-psemibold text-base'
					value={value}
					placeholder={placeholder}
					placeholderTextColor='#7B7B8B'
					onChangeText={handleChangeText}
					secureTextEntry={title === 'Пароль' && !showPassword}
					{...props}
				/>
				{title === 'Пароль' && (
					<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
						<Image
							source={!showPassword ? icons.eye : icons.eyeHide}
							className='w-6 h-6'
							resizeMode='contain'
						/>
					</TouchableOpacity>
				)}
			</View>
		</View>
	)
}

export default FormField
