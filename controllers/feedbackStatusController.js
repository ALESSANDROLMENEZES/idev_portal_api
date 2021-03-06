const { FeedbackStatus } = require('../models');
const { validationResult } = require('express-validator');

module.exports = {

    store: async (req, res) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let { description } = req.body;

            const alreadyExistis = await FeedbackStatus.findOne({ where: { description } });
            if (alreadyExistis) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'Já existe um status com essa descrição'});
            }
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();
            
            const result = await FeedbackStatus.create({ description });
            await transaction.commit();
            return res.status(200).json({ result }); 
            
        } catch (error) {
            await transaction.rollback();
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },
 

    destroy: async (req, res) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let { id } = req.params;

            let statusExists = await FeedbackStatus.findByPk(id);

            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status já foi excluido'});
            }

            let result = await statusExists.destroy();
            
            await transaction.commit();
            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    index: async (req, res) => {
        try {
            let { limit = 7 } = req.query;
            let result = await FeedbackStatus.findAll({ limit });
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },


    show: async (req, res) => {
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            let { id } = req.params;

            let result = await FeedbackStatus.findByPk(id);
            return res.status(200).json({ result });
        } catch (error) {
            console.log(error);
            return res.status(422).json({ error: true, msg:error.message});
        }
    },

    
    update: async (req, res) => {
        const transaction = await FeedbackStatus.sequelize.transaction();
        try {
            
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                await transaction.rollback();
                return res.status(400).json({ errors: errors.array() });
            }

            let { id } = req.params;
            let { description } = req.body;
            
            description = description[0].toUpperCase() + description.slice(1, description.length).toLowerCase();

            let statusExists = await FeedbackStatus.findByPk(id);
            
            if (!statusExists) {
                await transaction.rollback();
                return res.status(422).json({ error: true, msg:'O status não existe'});
                
            }

            statusExists.description = description;
            let result = await statusExists.save();

            await transaction.commit();

            return res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            await transaction.rollback();
            return res.status(422).json({ error: true, msg:error.message});

        }
    }

};