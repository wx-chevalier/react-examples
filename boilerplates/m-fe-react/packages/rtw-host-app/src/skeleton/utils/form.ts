import { Form } from 'antd';

export const createFormFields = <T extends {}>(values?: T) => {
  if (!values) {
    return;
  }

  return Object.entries(values).reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [key]: Form.createFormField({
          value,
        }),
      }),
    {},
  );
};
