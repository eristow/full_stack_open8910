import React, { useState } from 'react';
import { FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import { useHistory } from 'react-router-native';
import { useDebounce } from 'use-debounce';

import RepositoryItem from './RepositoryItem';
import useRepositories from '../../hooks/useRepositories';
import SortSelect from './SortSelect';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const renderItem = ({ item }, history) => {
  return (
    <TouchableOpacity onPress={() => history.push(`/${item.id}`)}>
      <RepositoryItem item={item} />
    </TouchableOpacity>
  );
};

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const {
      setOrderBy,
      setOrderDirection,
      searchText,
      setSearchText,
    } = this.props;

    return (
      <SortSelect
        searchText={searchText}
        setSearchText={setSearchText}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
      />
    );
  };

  render() {
    const { repositories, history, onEndReach } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={item => renderItem(item, history)}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReach}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchText, setSearchText] = useState('');
  const [debouncedText] = useDebounce(searchText, 500);
  const history = useHistory();

  const { repositories, fetchMore } = useRepositories({
    first: 8,
    searchKeyword: debouncedText,
    orderBy,
    orderDirection,
  });

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      setOrderBy={setOrderBy}
      setOrderDirection={setOrderDirection}
      searchText={searchText}
      setSearchText={setSearchText}
      history={history}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
