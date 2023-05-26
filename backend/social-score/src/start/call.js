const call = async (callback, res) => {
  try {
    await callback();
  }
  catch(e) {
    console.error(e);

    res.status(500).send(`${additionalContext}`);
  }
}

module.exports = {
  call
}