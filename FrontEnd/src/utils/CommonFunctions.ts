import {Platform, UIManager, LayoutAnimation} from 'react-native';

const linearAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
};

export default {
  linearAnimation,
};
