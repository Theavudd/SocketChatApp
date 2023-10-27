import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ScreenNames from '../utils/ScreenNames';
import Login from '../modules/auth/login';
import VerifyOTP from '../modules/auth/verifyOTP';
import Splash from '../modules/splash';
import {InteractionManager} from 'react-native';
import CommonFunctions from '../utils/CommonFunctions';
import {useSelector} from 'react-redux';
import {ReducersModal} from '../utils/Modal';
import ChatRoom from '../modules/chat/chatRoom';

const Stack = createNativeStackNavigator();
// let token = '';
// let isLoading = false;
const Routes = () => {
  const {token, isLoading} = useSelector((store: ReducersModal) => ({
    token: store.AuthReducer.token,
    isLoading: store.SplashReducer.isLoading,
  }));

  // const token = useSelector((store: ReducersModal) => store.AuthReducer.token);
  // const isLoading = useSelector(
  //   (store: ReducersModal) => store.SplashReducer.isLoading,
  // );

  InteractionManager.runAfterInteractions(() => {
    CommonFunctions.linearAnimation();
  });

  if (isLoading) return <Splash />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        {!token ? (
          <Stack.Group>
            <Stack.Screen name={ScreenNames.Login} component={Login} />
            <Stack.Screen name={ScreenNames.VerifyOTP} component={VerifyOTP} />
          </Stack.Group>
        ) : (
          <Stack.Screen name={ScreenNames.ChatRoom} component={ChatRoom} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
