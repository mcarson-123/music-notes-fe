import React from 'react';
import { Text, ScrollView, SafeAreaView } from 'react-native';

class SideMenu extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Settings'
  }

  render() {
    return (
      <ScrollView>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
          <Text>This is within the menu</Text>
        </SafeAreaView>
      </ScrollView>
    );
  }
}

export default SideMenu;
