const blobURLToFile = async (blobURL, filename) => {
  let blob = await fetch(blobURL).then(r => r.blob());
  var file = new File([blob], filename, {
    type: blob.type,
    lastModified: Date.now()
  });
  return file;
};

export default blobURLToFile;
