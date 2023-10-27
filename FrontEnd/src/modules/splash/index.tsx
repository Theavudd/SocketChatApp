import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {SET_LOADING} from '../../utils/ActionType';

const Splash = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch({
        type: SET_LOADING,
        payload: {isLoading: false},
      });
    }, 1000);
  }, []);
  return (
    <View>
      <Text>{'Splash Screen'}</Text>
    </View>
  );
};

export default Splash;
