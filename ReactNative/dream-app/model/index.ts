// import {Database} from '@nozbe/watermelondb';
// import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

// import schema from './schema';
// import migrations from './migrations';
// import Product from './product';
// import Categories from './categories';

// const adapter = new SQLiteAdapter({
//   dbName: 'YourDBName',
//   schema,
//   migrations,
//   jsi: true /* Platform.OS === 'ios' */,
//   onSetUpError: error => {
//     console.log(error);
//   },
// });

// export const database = new Database({
//   adapter,
//   modelClasses: [
//     Product,
//     Categories,
//     // and so on
//   ],
// });