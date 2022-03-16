const { app } = require('./app');
const { sequelize } = require('./utils/database');
const { initModels } = require('./utils/initModels');
sequelize
  .authenticate()
  .then(() => console.log('Database conected'))
  .catch((err) => console.log(err));

initModels();

sequelize
  .sync()
  .then(() => {
    console.log('Database Sync');
  })
  .catch((err) => console.log(err));

app.listen(4000, () => {
  console.log('Server Runing');
});
