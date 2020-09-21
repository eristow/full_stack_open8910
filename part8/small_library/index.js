require('dotenv').config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub,
} = require('apollo-server');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const DataLoader = require('dataloader');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const JWT_SECRET = process.env.JWT_SECRET;
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.set('useFindAndModify', false);
console.log('connecting to', MONGODB_URI);
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message);
  });

const pubsub = new PubSub();

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    _id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    _id: ID!
  }

  type Author {
    name: String!
    _id: ID!
    born: Int
    bookCount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    //TODO: LATER fix allBooks query with author param
    allBooks: (root, args) => {
      // if (args.author) {
      //   return books.filter(b => b.author === args.author);
      // }

      if (args.genre) {
        return Book.find({ genres: { $in: [args.genre] } });
      }

      return Book.find({});
    },

    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser;
    },
  },

  Author: {
    bookCount: async (root, args, { loaders }) =>
      await loaders.bookCount.load(root._id),
  },

  Book: {
    author: async root => {
      const author = await Author.findOne({ _id: root.author });
      return author;
    },
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author = await Author.findOne({ name: args.author });
      if (!author) {
        const newAuthor = new Author({
          name: args.author,
        });
        try {
          await newAuthor.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      author = await Author.findOne({ name: args.author });
      const book = new Book({ ...args });
      book.author = author;
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      pubsub.publish('BOOK_ADDED', { bookAdded: book });
      return book;
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const author = await Author.findOne({ name: args.name });
      if (!author) {
        return null;
      }
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return author;
    },

    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return user;
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== 'secred') {
        throw new UserInputError('wrong credentials');
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED']),
    },
  },
};

const batchBookCount = async keys => {
  const books = await Book.find({ author: { $in: keys } });
  return keys.map(
    key => books.filter(b => String(b.author) === String(key)).length,
  );
};

const bookCountLoader = new DataLoader(keys => batchBookCount(keys));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return {
        currentUser,
        loaders: {
          bookCount: bookCountLoader,
        },
      };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
