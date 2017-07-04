import keys from '../keys';
import { RNS3 } from 'react-native-aws3';

class s3 {
  constructor() {
    this.options = {
      accessKey: 'AKIAJOIHLQGNIRG3VZQA',
      bucket: 'ronin.catch',
      region: 'us-west-1',
      secretKey: keys.secretKey
    };
  }

  put(file, keyPrefix) {
    const test = {
      ...this.options,
      keyPrefix: keyPrefix
    }
    console.log('test is', test)
    return RNS3.put(file, { ...this.options, keyPrefix: keyPrefix })
      .then(response => {
        if (response.status !== 201)
          throw 'Failed to upload media.';
        console.log(response.body);
      });
  }
}

export default new s3();