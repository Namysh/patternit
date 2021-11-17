const useSerializer = () => {
  const serialize = (...values) => {
    return values.join(';');
  };

  const deserialize = (keys, value) => {
    const data = value.split(';');

    return keys.reduce((acc, key, index) => ({
      ...acc,
      ...(key.includes('...') ? { [key.slice(3)]: data.slice(index) } : { [key]: data[index] })
    }
    ), {})
  }

  return {
    serialize,
    deserialize,
  };
};

export default useSerializer;
