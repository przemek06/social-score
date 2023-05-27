const call = async (callback, res) => {
  try {
    await callback();
  }
  catch(e) {
    console.log(e);

    res.status(500).send(e);
  }
}

module.exports = {
  call
}