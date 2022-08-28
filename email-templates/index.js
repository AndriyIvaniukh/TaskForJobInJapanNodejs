const {emailActionEnum} = require('../enums');

module.exports = {
    [emailActionEnum.ADD_NEW_APPLICANT]: {
        subject: 'Welcome on our platform',
        template: 'openPositions'
    },
    [emailActionEnum.ADD_NEW_APPLICANT_NO_POSITION]: {
        subject: 'Welcome on our platform',
        template: 'noOpenPositions'
    },
    [emailActionEnum.ADD_NEW_POSITION]: {
        subject: 'We have new position for you',
        template: 'newPosition'
    },
    [emailActionEnum.DELETED_POSITION]: {
        subject: 'We have new position for you',
        template: 'deletedPosition'
    },
}