const transformFormData = (formData: FormData, fields: string[]) => {
  const data: Record<string, FormDataEntryValue> = {};

  const formDataObject = Object.fromEntries(formData.entries());
  for (let field in formDataObject) {
    if (fields.includes(field)) {
      data[field] = formDataObject[field];
    }
  }

  return data;
};

export default transformFormData;
