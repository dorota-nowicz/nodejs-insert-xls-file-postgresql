/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	
	var pump = sequelize.define('pump', {
		idbomba: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		contador: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'contador'
		},

	},
	{
		timestamps: false,
		tableName: 'pump',
		name : { singular : 'pump',
				plural : 'pump',			
				}
	});
	
	pump.associate = function(models) {
	   pump.hasMany(models.lacture,{foreignKey: 'fk_pump', foreignKeyConstraint: true});
      };
	  
	 return pump
	  
		

};
