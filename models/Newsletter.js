var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Enquiry Model
 * =============
 */

var Newsletter = new keystone.List('Newsletter', {
    nocreate: true,
    noedit: true,
});

Newsletter.add({
    name: { type: Types.Name, required: true },
    email: { type: Types.Email, required: true },
    subscribedAt: { type: Date, default: Date.now },
});

Newsletter.schema.pre('save', function (next) {
    this.wasNew = this.isNew;
    next();
});

Newsletter.schema.post('save', function () {
    if (this.wasNew) {
        this.sendNotificationEmail();
    }
});

Newsletter.schema.methods.sendNotificationEmail = function (callback) {
    if (typeof callback !== 'function') {
        callback = function (err) {
            if (err) {
                console.error('There was an error sending the notification email:', err);
            }
        };
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
        console.log('Unable to send email - no mailgun credentials provided');
        return callback(new Error('could not find mailgun credentials'));
    }

    var letter = this;
    var brand = keystone.get('brand');

    keystone.list('User').model.find().where('isAdmin', true).exec(function (err, admins) {
        if (err) return callback(err);
        new keystone.Email({
            templateName: 'newsletter-notification',
            transport: 'mailgun',
        }).send({
            to: admins,
            from: {
                name: 'CyberGaming Online',
                email: 'noreply@cgopen.org',
            },
            subject: 'Thank you for subscribing to your news letter!',
            letter: letter,
            brand: brand,
        }, callback);
    });
};

Newsletter.defaultSort = '-createdAt';
Newsletter.defaultColumns = 'name, email, subscribedAt';
Newsletter.register();
