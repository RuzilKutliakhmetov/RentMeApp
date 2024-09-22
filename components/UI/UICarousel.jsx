import * as React from 'react'
import { Dimensions, Image, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'

const width = Dimensions.get('window').width

const UICarousel = ({ data }) => {
	const ref = null
	const progress = 0

	const onPressPagination = index => {
		ref.current?.scrollTo({
			count: index - progress.value,
			animated: true,
		})
	}

	return (
		<View style={{ flex: 1 }}>
			<Carousel
				ref={ref}
				width={width}
				height={width / 2}
				data={data}
				onProgressChange={progress}
				renderItem={({ item }) => (
					<View
						style={{
							flex: 1,
							borderWidth: 1,
							justifyContent: 'center',
						}}
					>
						<Image
							source={{ uri: item.url }}
							style={{ width: width, height: width / 2 }}
						/>
					</View>
				)}
			/>
		</View>
	)
}

export default UICarousel
