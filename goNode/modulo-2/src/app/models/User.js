module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    avatar: DataTypes.STRING,
    password_hars: DataTypes.STRING,
    provider: DataTypes.BOOLEAN
  })

  return User
}
