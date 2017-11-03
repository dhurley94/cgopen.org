var keystone = require('keystone');
var Steam = new keystone.List('Steam');

Steam.add({
    displayName: { type: String },
    email: { type: keystone.Field.Types.Email, unique: true },
    password: { type: keystone.Field.Types.Password },
});

Steam.schema.virtual('cannotAccessKeystone').get(function () {
    return true;
});

Steam.register();