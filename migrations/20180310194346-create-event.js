'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('events', {
        id: {
            allowNull: false,
            primaryKey: true,
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.literal('uuid_generate_v4()'),
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        },
        time_start: {
          allowNull: false,
          type: Sequelize.DATE
        },
        time_end: {
          allowNull: false,
          type: Sequelize.DATE
        },
        when: {
          allowNull: false,
          type: Sequelize.STRING
        },
        image: Sequelize.STRING,
        social_image: Sequelize.STRING,
        venue_id: {
            type: Sequelize.UUID,
            references: {
                model: 'venues',
                key: 'id'
            },
        },
        admission_fee: Sequelize.STRING,
        address: Sequelize.STRING,
        organizers: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
            defaultValue: []
        },
        map_link: Sequelize.STRING,
        brief_description: Sequelize.STRING,
        description: Sequelize.TEXT,
        links: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
            defaultValue: []
        },
        website_link: Sequelize.TEXT,
        ticket_link: Sequelize.STRING,
        fb_event_link: Sequelize.STRING,
        eventbrite_link: Sequelize.STRING,
        bitly_link: Sequelize.STRING,
        tags: {
            type: Sequelize.ARRAY(Sequelize.STRING),
            allowNull: true,
            defaultValue: []
        },
        verified: {
            allowNull: false,
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('now()')
        },
        updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal('now()')
        }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('events');
  }
};