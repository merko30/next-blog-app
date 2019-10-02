const paginate = async (
  model,
  conditions = {},
  { page, perPage },
  sort = null,
  populate = []
) => {
  const skip = page * perPage - perPage;
  const limit = skip + perPage;

  const nameOfCollection = model.collection.collectionName;

  const data = await model
    .find(conditions)
    .populate(...populate)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  const countAll = await model.countDocuments(conditions);

  return {
    [nameOfCollection]: data,
    perPage,
    currentPage: page,
    numberOfPages: Math.ceil(countAll / perPage)
  };
};

module.exports = paginate;
