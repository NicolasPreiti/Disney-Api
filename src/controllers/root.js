const rootController = (req, res) => {
  res.render('main', {
    title: 'Inicio',
  });
};

module.exports = {
  rootController,
};
