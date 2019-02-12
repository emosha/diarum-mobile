import React from 'react';
import PropTypes from 'prop-types';
import { View, Dimensions, ImageBackground } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Button } from 'react-native-elements';

import SlideImage from '../../components/SlideImage/SlideImage';
import styles from './styles';
import AppStyles from '../../App.styles';

const dimensions = Dimensions.get('window');
const imageWidth = dimensions.width;

export default class WelcomeScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  state = {
    activeSlide: 0,
    entries: [
      { imageSrc: require('../../assets/images/diarum-welcome-screen-one.png') },
      { imageSrc: require('../../assets/images/diarum-welcome-screen-two.png') },
      { imageSrc: require('../../assets/images/diarum-welcome-screen-three.png') },
    ],
  }

  /**
   * Renders each image slide component
   *
   * @param {object} image item object
   */
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

  /**
   * handles snap to item
   *
   * @param {number} index
   *
   * @returns {void}
   */
  handleSnapToItem = index => this.setState({ activeSlide: index });


  /**
   * navigates to signup page
   *
   * @returns {void}
   */
  navigateToSignup = () => this.props.navigation.navigate('Signup');

  render() {
    return (
      <ImageBackground source={require('../../assets/images/diarum-welcome.png')} style={styles.imageBackground}>
        <View style={styles.container}>
          <View style={AppStyles.authTop}>
            <Carousel
              data={this.state.entries}
              renderItem={this.renderSlideImage}
              onSnapToItem={this.handleSnapToItem}
              sliderWidth={imageWidth}
              itemWidth={imageWidth}
            />
            {this.pagination}
          </View>
          <View style={AppStyles.authBottom}>
            <Button
              raised
              title="GET STARTED"
              buttonStyle={AppStyles.buttonStyle}
              containerStyle={AppStyles.buttonContainerStyle}
              titleStyle={AppStyles.buttonTitleStyle}
              onPress={this.navigateToSignup}
            />
          </View>
        </View>
      </ImageBackground>
    );
  }
}
