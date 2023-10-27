import React, {useCallback, useState} from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import Services from '../../../utils/Services';
import Endpoints from '../../../utils/Endpoints';
import axios, {AxiosError, AxiosResponse} from 'axios';

const Login = () => {
  const [mobileNumber, setMobile] = useState('');

  const onChangeMobile = useCallback(
    (text: string) => {
      setMobile(text);
    },
    [mobileNumber],
  );

  const onSubmitPress = () => {
    if (mobileNumber.length === 10) {
      axios
        .get('https://jsonplaceholder.typicode.com/todos')
        .then(res => console.log(res))
        .catch(err => console.log(err));
      //   Services.postApiCall(
      //     Endpoints.login,
      //     {mobileNumber},
      //     (res: AxiosResponse) => {
      //       console.log('res', res);
      //     },
      //     (err: AxiosError) => {
      //       console.log('error', err);
      //     },
      //   );
    }
  };

  return (
    <View>
      <Text>{'Login Screen'}</Text>
      <TextInput
        value={mobileNumber}
        placeholder="Enter Mobile Number"
        onChangeText={onChangeMobile}
        keyboardType="number-pad"
      />
      <Button title="Submit" onPress={onSubmitPress} />
    </View>
  );
};

export default Login;
