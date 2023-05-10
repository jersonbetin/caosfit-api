const strings = {
  find_all: 'Find all %c successful!',
  find_one: 'The %c was find successful!',
  create_resource: 'The %c was create successful!',
  update_resource: 'The %c was update successful!',
  delete_resource: 'The %c was delete successful!',
  login_success: 'The user was login successful!',
};

interface ReplaceInterface {
  value: string;
  oldValue: string;
  newValue: string;
}

const replaceValue = ({
  value,
  oldValue,
  newValue,
}: ReplaceInterface): string => {
  if (value.replaceAll) return value.replaceAll(oldValue, newValue);

  return value;
};

const applyOptions = <T extends string, K>(
  value: T,
  options?: STGInterface<K>,
): string => {
  const { replace } = options;
  let vTemp: string = value;

  if (replace) {
    Object.keys(replace).forEach((key) => {
      vTemp = replaceValue({
        value: vTemp,
        oldValue: key,
        newValue: `${replace[key]}`,
      });
    });
  }

  return vTemp;
};

interface STGInterface<T> {
  replace: {
    [k: string]: T;
  };
}

export const stg = <T extends keyof typeof strings, K>(
  key: T,
  options?: STGInterface<K>,
): string => {
  if (options) {
    return applyOptions(strings[key], options);
  }

  return strings[key];
};
