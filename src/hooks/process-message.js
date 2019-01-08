// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const { data } = context;

    // Throw an error if we didn't get a text
    if(!data.text) {
      throw new Error('A message must have a text');
    }
    console.log("user authen: ", context.params.user);
    // The authenticated user
    const user = context.params.user;
    // The actual message text
    const text = context.data.text.substring(0, 400);
    // Messages can't be longer than 400 characters

    // Override the original data (so that people can't submit additional stuff)
    context.data = {
      text,
      userId: user._id,
      //add the current date
      createdAt: new Date().getTime()
    };
    return context;
  };
};
