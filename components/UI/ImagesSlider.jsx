import React from 'react'
import { Image, Text, View } from 'react-native'

const ImagesSlider = ({ images }) => {
	return (
		<View className='w-full h-full'>
			{images.length > 0 ? (
				<View className='w-full h-full'>
					<Image
						source={{ uri: images[0].url }}
						className='w-full h-full'
						resizeMode='contain'
					/>
				</View>
			) : (
				<Text>Empty</Text>
			)}
		</View>
	)
}

export default ImagesSlider
