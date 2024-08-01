const createDropdownOptions = (rawOptions: any) => {
  const options = [];

  for (const optionValue in rawOptions) {
    options.push({
      label: rawOptions[optionValue],
      value: optionValue,
    });
  }

  return options;
};

export default createDropdownOptions;
