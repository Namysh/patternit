
const History = {
  UNDO: 'undo',
  REDO: 'redo'
}

const useHistory = () => {
  let history = [];
  let cursor = 0;
  let lastActions = null;

  const reset = () => {
    history = [];
    cursor = 0;
    lastActions = null;
  }

  const previous = () => {
    if (cursor === 0) return [];
    return history[--cursor];
  };

  const next = () => {
    if (cursor === history.length) return [];
    return history[cursor++];
  };

  const peekNext = () => {
    if (cursor + 1 >= history.length) return [];
    return history[cursor + 1];
  }

  const peekCurrent = () => {
    return history[cursor] || [];
  };

  const peekPrevious = () => {
    if (cursor - 1 < 0) return [];
    return history[cursor - 1];
  }

  const startRegistering = () => lastActions = [];

  const register = entry => {
    if (cursor < history.length)
      history = history.slice(0, cursor);

    if (lastActions) lastActions.push(entry);
    else {
      history[cursor++] = [entry];
    }
  };

  const stopRegistering = () => {
    if (lastActions && lastActions.length !== 0) {
      history[cursor++] = lastActions;
      lastActions = null;
    }
  };

  const getHistory = () => history;

  return {
    previous,
    next,

    peekNext,
    peekCurrent,
    peekPrevious,

    startRegistering,
    register,
    stopRegistering,

    getHistory,
    reset
  };
};

export default useHistory;
export {
  History
}
