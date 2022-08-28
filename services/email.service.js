const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const {configs} = require("../configs");
const emailTemplates = require('../email-templates');
const CustomError = require('../errors/CustomError');
const {Position} = require("../dataBase");
const aplService = require('./applicant.service');

module.exports = {
    sendMail: (userEmail = '', emailAction = "", locals = {}) => {
        const transporter = nodemailer.createTransport({
            from: 'No reply',
            auth: {
                user: configs.NO_REPLY_EMAIL,
                pass: configs.NO_REPLY_EMAIL_PASSWORD
            },
            service: 'gmail'
        });

        const hbsOptions = {
            viewEngine: {
                extname: '.hbs',
                defaultLayout: 'main',
                layoutsDir: path.join(process.cwd(), 'email-templates', 'layouts'),
            },
            viewPath: path.join(process.cwd(), 'email-templates', 'views'),
            extName: '.hbs'
        };

        transporter.use('compile', hbs(hbsOptions));

        const templateInfo = emailTemplates[emailAction];
        if (!templateInfo) {
            throw new CustomError('Wrong email action', 500);
        }

        return transporter.sendMail({
                to: userEmail,
                subject: templateInfo.subject,
                template: templateInfo.template,
                context: locals
            }
        )
    },
    createSearchLink: async (frontendAddress, applicant) => {
        const searchInfo = [];
        let text = '';
        await Promise.all(applicant.categories.map(async (category) => {
            if (applicant.japaneseKnowledge === true) {
                if (await Position.count({category: category, level: applicant.level})) {
                    searchInfo.push({
                        category: category,
                        link: `${frontendAddress}positions/?level=${applicant.level}&category=${category}`
                    });
                }
            } else {
                if (await Position.count({category: category, level: applicant.level, japaneseRequired: false})) {
                    searchInfo.push({
                        category: category,
                        link: `${frontendAddress}positions/?level=${applicant.level}&category=${category}&japaneseRequired=${applicant.japaneseKnowledge}`
                    });
                }
            }
        }));
        searchInfo.map(info => {
            text += ` <a href=${info.link}> ${info.category}</a> `;
        })
        return text;
    },
    searchApplicant: (category, level, japaneseRequired) => {
        if (japaneseRequired === true) {
            return aplService.findAll({categories: category, level: level, japaneseKnowledge: true})
        }
        if (japaneseRequired === false) {
            return aplService.findAll({categories: category, level: level})
        }

    }

}
