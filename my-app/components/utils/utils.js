import { Alert, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export const requestMediaLibraryPermission = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert(
      'Permission Denied',
      'Permission to access the media library is required!'
    );
  }
};
