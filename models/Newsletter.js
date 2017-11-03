var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Newsletter Model
 * =============
 */

var Newsletter = new keystone.List('Newsletter');

Newsletter.add({
    subscribeDate: { type: Types.Date, index: true },
    email: { type: keystone.Field.Types.Email, unique: true },
    name: { type: keystone.Field.Types.Name },
});

Newsletter.defaultColumns = 'email, subscribeDate';

Newsletter.register();