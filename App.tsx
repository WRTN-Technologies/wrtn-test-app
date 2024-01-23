import { Button, StyleSheet, View } from 'react-native';

import { RNEventSource } from './backend/libs/RNEventSource';
import ApiService from './backend/services/api.service';

export default function App() {
  return (
    <View style={styles.container}>
      <Button
        title="인사하기"
        onPress={() => {
          ApiService.createMessage('안녕하세요').then((result) => {
            ApiService.getMessages().then((result) => {
              console.log('result', result);
            });

            const es = new RNEventSource(result.id);

            es.addEventListener('open', () => {
              console.log('open');
            });

            es.addEventListener('message', (data) => {
              console.log('message', data);
              if (data === '[DONE]') {
                //
              }
            });
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
