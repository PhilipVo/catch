import keys from '../keys';
import { RNS3 } from 'react-native-aws3';

class s3 {
  constructor() {
    this.options = {
      accessKey: 'AKIAJOIHLQGNIRG3VZQA',
      bucket: 'ronincatch',
      region: 'us-west-1',
      secretKey: keys.secretKey
    };
  }

  put(file, keyPrefix) {
    return RNS3.put(file, { ...this.options, keyPrefix: keyPrefix })
      .then(response => {
        if (response.status !== 201)
          return Promise.reject('Failed to upload media.');
      });
  }
}

export default new s3();