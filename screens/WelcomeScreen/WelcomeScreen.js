import React from 'react';
import { View, Dimensions, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Button } from 'react-native-elements';

import SlideImage from '../../components/SlideImage/SlideImage';
import styles from './styles';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default class WelcomeScreen extends React.Component {
  state = {
    activeSlide: 0,
    entries: [
      { imageSrc: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1549017022/diarum/diarum-welcome-screen-one.png' },
      { imageSrc: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1549017268/diarum/diarum-welcome-screen-two.png' },
      { imageSrc: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1549017022/diarum/diarum-welcome-screen-three.png' },
    ],
  }

  renderSlideImage({ item }) {
    return <SlideImage imageSrc={item.imageSrc}/>;
  }

  get pagination() {
    const { entries, activeSlide } = this.state;
    return (
        <Pagination
          dotsLength={entries.length}
          activeDotIndex={activeSlide}
          containerStyle={styles.pagination}
          dotStyle={styles.paginationDotStyle}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
  }

  render() {
    return (
      <ImageBackground source={{ uri: 'https://res.cloudinary.com/iverenshaguy/image/upload/v1549014861/diarum/diarum-welcome.png' }} style={{ width: '100%', height: '100%' }}>
      <View style={styles.container}>
        <View style={styles.top}>
          <Carousel
            data={this.state.entries}
            renderItem={this.renderSlideImage}
            onSnapToItem={index => this.setState({ activeSlide: index }) }
            sliderWidth={imageWidth}
            itemWidth={imageWidth}
          />
          { this.pagination }
        </View>
        <View style={styles.bottom}>
          <Button
            title="GET STARTED"
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.buttonContainerStyle}
            titleStyle={styles.buttonTitleStyle}
            raised
          />
        </View>
      </View>
      </ImageBackground>
    );
  }
}
