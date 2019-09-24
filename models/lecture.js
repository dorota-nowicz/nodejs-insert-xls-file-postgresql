/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lecture', {
		contador: {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'contador'
		},
		fecha: {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'fecha'
		},
		consumo: {
			type: DataTypes.DOUBLE,
			allowNull: true,
			field: 'consumo'
		},
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
			field: 'id'
		},
		fk_pump: {
			type: DataTypes.INTEGER,
			allowNull: true,
			references: {
				model: 'pump',
				key: 'idbombeo'
			},
			field: 'fk_pump'
		}
	}, {
		timestamps: false,
		tableName: 'lecture',
		name : { singular : 'lecture',
				plural : 'lecture',			
				}
	});
	
	lecture.associate = function(models) {
	   lecture.belongsTo(models.pump,{foreignKey: 'fk_pump',  foreignKeyConstraint: true, targetKey: 'idpump'});
	  }; 
	  
	  
};
