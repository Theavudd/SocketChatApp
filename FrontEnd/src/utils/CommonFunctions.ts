import {Platform, UIManager, LayoutAnimation} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';

const linearAnimation = () => {
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
};

/**
 * shows snackbar
 * @param title title to show on snackbar
 * @param _
 */
const showSnackbar = (title: string, duration: number = 2000) => {
  if (title !== '' && title !== undefined && title !== null) {
    Snackbar.show({
      text: title,
      duration,
      numberOfLines: 3,
      // textColor: Colors.black,
      // backgroundColor: Colors.blue,
      // fontFamily: fontFamily.HelveticaBold,
      action: {
        text: 'Close',
        // textColor: Colors.white,
        onPress: () => {
          Snackbar.dismiss();
        },
      },
    });
  }
};

const getDeviceDetail = () => {
  const deviceId = getUniqueId();
  const d = deviceId;
  return d;
};

export default {
  linearAnimation,
  getDeviceDetail,
  showSnackbar,
};
