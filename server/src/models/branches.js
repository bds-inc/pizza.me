module.exports = (sequelize, DataTypes) => {
  return sequelize.define('branches', {
    data: {
      type: DataTypes.JSONB
    }
  })
}
