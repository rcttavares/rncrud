import React from 'react';
import {Alert, FlatList, View} from 'react-native';
import {Avatar, Button, Icon, ListItem} from 'react-native-elements';
import Users from '../data/Users';

export default props => {
  function confirmUserDeletion(user) {
    Alert.alert('Excluir Usuário', 'Deseja excluir o usuário?', [
      {
        text: 'Sim',
        onPress() {
          console.warn(user.name + ' foi excluido.');
        },
      },
      {
        text: 'Não',
      },
    ]);
  }

  function getActions(user) {
    return (
      <>
        <Button
          onPress={() => props.navigation.navigate('UserForm', user)}
          type="clear"
          icon={<Icon name="edit" size={25} color="blue" />}
        />
        <Button
          onPress={() => confirmUserDeletion(user)}
          type="clear"
          icon={<Icon name="delete" size={25} color="red" />}
        />
      </>
    );
  }

  function getUserItem({item: user}) {
    return (
      <ListItem
        key={user.id}
        bottomDivider
        onPress={() => props.navigation.navigate('UserForm')}>
        <Avatar rounded title={user.name[0]} source={{uri: user.avatarUrl}} />
        <ListItem.Content>
          <ListItem.Title>{user.name}</ListItem.Title>
          <ListItem.Subtitle>{user.email}</ListItem.Subtitle>
        </ListItem.Content>
        {getActions(user)}
      </ListItem>
    );
  }

  return (
    <View>
      <FlatList
        data={Users}
        keyExtractor={user => user.id.toString()}
        renderItem={getUserItem}
      />
    </View>
  );
};
