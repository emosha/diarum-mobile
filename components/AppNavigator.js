import { createBottomTabNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen/HomeScreen';
import SignupScreen from '../screens/SignupScreen/SignupScreen';
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen/AuthLoadingScreen';

const AppStack = createBottomTabNavigator(
  {
    Home: HomeScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(createSwitchNavigator(
  {
    App: AppStack,
    Signup: SignupScreen,
    Welcome: WelcomeScreen,
    AuthLoading: AuthLoadingScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
));
