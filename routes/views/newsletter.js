var keystone = require('keystone');
var Newsletter = keystone.list('Newsletter');

exports = module.exports = function (req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    // Set locals
    locals.section = 'newsletter';
    locals.newsLetter = Newsletter.fields;
    locals.formData = req.body || {};
    locals.validationErrors = {};
    locals.subscribRequested = false;

    // On POST requests, add the Enquiry item to the database
    view.on('post', { action: 'newsletter' }, function (next) {

        var newSubscriber = new Newsletter.model();
        var updater = newSubscriber.getUpdateHandler(req);

        updater.process(req.body, {
            flashErrors: true,
            fields: 'name, email',
            errorMessage: 'There was a problem submitting your data to our mailing list.',
        }, function (err) {
            if (err) {
                locals.validationErrors = err.errors;
            } else {
                locals.enquirySubmitted = true;
            }
            next();
        });
    });

    view.render('newsletter');
};
