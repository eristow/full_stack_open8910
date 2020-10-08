import React, { useState } from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Menu, Divider, Searchbar } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

import Text from '../Text';

const styles = StyleSheet.create({
  textContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  menuContainer: {
    flexDirection: 'column',
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
  },
});

const Anchor = ({ searchText, setSearchText, openMenu, currentSort }) => {
  return (
    <View style={styles.container}>
      <Searchbar
        placeholder=""
        onChangeText={setSearchText}
        value={searchText}
      />
      <TouchableWithoutFeedback onPress={openMenu}>
        <View style={styles.textContainer}>
          <Text fontWeight="bold" fontSize="subheading">
            {currentSort}
          </Text>
          <AntDesign name="caretdown" size={24} color="black" />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const SortSelect = ({
  searchText,
  setSearchText,
  setOrderBy,
  setOrderDirection,
}) => {
  const [currentSort, setCurrentSort] = useState('Latest repositories');
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const latestReposText = 'Latest repositories';
  const highestRatedReposText = 'Highest rated repositories';
  const lowestRatedReposText = 'Lowest rated repositories';

  const onPressLatestRepos = () => {
    setOrderBy('CREATED_AT');
    setOrderDirection('DESC');
    setCurrentSort(latestReposText);
    closeMenu();
  };

  const onPressHighestRatedRepos = () => {
    setOrderBy('RATING_AVERAGE');
    setOrderDirection('DESC');
    setCurrentSort(highestRatedReposText);
    closeMenu();
  };

  const onPressLowestRatedRepos = () => {
    setOrderBy('RATING_AVERAGE');
    setOrderDirection('ASC');
    setCurrentSort(lowestRatedReposText);
    closeMenu();
  };

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      anchor={
        <Anchor
          searchText={searchText}
          setSearchText={setSearchText}
          openMenu={openMenu}
          currentSort={currentSort}
        />
      }
    >
      <View style={styles.menuContainer}>
        <Menu.Item title="Select an item..." disabled />
        <Divider />
        <Menu.Item onPress={onPressLatestRepos} title={latestReposText} />
        <Menu.Item
          onPress={onPressHighestRatedRepos}
          title={highestRatedReposText}
        />
        <Menu.Item
          onPress={onPressLowestRatedRepos}
          title={lowestRatedReposText}
        />
      </View>
    </Menu>
  );
};

export default SortSelect;
