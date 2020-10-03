import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    display: 'flex',
    padding: 10,
  },
  header: {},
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const shortenNumber = num => {
  if (num >= 1000) {
    return String((num / 1000).toFixed(1)) + ' k';
  }
  return num;
};

const itemHeaderStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  avatarContainer: {
    flexGrow: 0,
    paddingRight: 15,
  },
  infoContainer: {
    flexGrow: 1,
  },
  languageContainer: {
    marginTop: 5,
    padding: 5,
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  language: {
    color: theme.colors.white,
  },
});

const ItemHeader = ({ avatarUrl, repoName, description, language }) => {
  return (
    <View style={itemHeaderStyles.container}>
      <View style={itemHeaderStyles.avatarContainer}>
        <Image style={itemHeaderStyles.avatar} source={{ uri: avatarUrl }} />
      </View>
      <View style={itemHeaderStyles.infoContainer}>
        <Text fontWeight="bold" fontSize="subheading">
          {repoName}
        </Text>
        <Text color="textSecondary">{description}</Text>
        <View style={itemHeaderStyles.languageContainer}>
          <Text style={itemHeaderStyles.language}>{language}</Text>
        </View>
      </View>
    </View>
  );
};

const itemFooterStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexGrow: 1,
    justifyContent: 'space-around',
    marginTop: 10,
  },
  blockContainer: {
    flexGrow: 0,
    alignItems: 'center',
  },
  actionText: {},
});

const ItemFooterBlock = ({ content, ...props }) => {
  return (
    <View style={itemFooterStyles.blockContainer} {...props}>
      <Text
        color="textSecondary"
        fontWeight="bold"
        style={itemFooterStyles.actionText}
      >
        {content.text}
      </Text>
      <Text>{content.title}</Text>
    </View>
  );
};

const ItemFooter = ({ content }) => {
  return (
    <View style={itemFooterStyles.container}>
      {content.map(c => (
        <ItemFooterBlock key={`${c.title} ${c.text}`} content={c} />
      ))}
    </View>
  );
};

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <ItemHeader
        avatarUrl={item.ownerAvatarUrl}
        repoName={item.fullName}
        description={item.description}
        language={item.language}
      />
      <ItemFooter
        content={[
          { text: shortenNumber(item.stargazersCount), title: 'Stars' },
          { text: shortenNumber(item.forksCount), title: 'Forks' },
          { text: shortenNumber(item.reviewCount), title: 'Reviews' },
          { text: shortenNumber(item.ratingAverage), title: 'Rating' },
        ]}
      />
    </View>
  );
};

export default RepositoryItem;
