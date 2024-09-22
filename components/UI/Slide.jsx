import { useState } from 'react'
import { FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import * as Animatable from 'react-native-animatable'

const zoomIn = {
	0: {
		scale: 0.9,
	},
	1: {
		scale: 1,
	},
}

const zoomOut = {
	0: {
		scale: 1,
	},
	1: {
		scale: 0.9,
	},
}

const TrendingItem = ({ activeItem, item }) => {
	return (
		<Animatable.View
			className='mx-5'
			animation={activeItem === item.$id ? zoomIn : zoomOut}
			duration={500}
		>
			<TouchableOpacity
				className='relative flex justify-center items-center'
				activeOpacity={0.7}
			>
				<ImageBackground
					source={{
						uri: item.url,
					}}
					className='w-72 h-72 rounded-[33px] my-5 overflow-hidden shadow-lg shadow-black/40'
					resizeMode='cover'
				/>
			</TouchableOpacity>
		</Animatable.View>
	)
}

const Slide = ({ data }) => {
	const [activeItem, setActiveItem] = useState(
		data !== undefined ? data[0] : []
	)

	const viewableItemsChanged = ({ viewableItems }) => {
		if (viewableItems.length > 0) {
			setActiveItem(viewableItems[0].key)
		}
	}
	return (
		<FlatList
			data={data}
			horizontal
			keyExtractor={item => item.$id}
			renderItem={({ item }) => (
				<TrendingItem activeItem={activeItem} item={item} />
			)}
			onViewableItemsChanged={viewableItemsChanged}
			viewabilityConfig={{
				itemVisiblePercentThreshold: 70,
			}}
			contentOffset={{ x: 170 }}
		/>
	)
}

export default Slide
