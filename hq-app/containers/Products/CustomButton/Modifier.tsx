export const ModifierButton = (
  modifies: Array<{
    name: string;
    productModifierValues: Array<{ name: string }>;
  }>,
) => {
  const count = modifies?.length - 1;
  const rating =
    modifies[0]?.name ?? modifies[0]?.productModifierValues[0]?.name ?? '-';
  const style = {
    mainContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      width: '100%',
    },

    container: {
      justifyContent: 'space-between',
      alignItems: 'center',
      display: 'flex',
    },
    childContainer: {
      margin: 2,
      background: 'rgb(241 241 241)',
      fontSize: '10px',
      fontWeight: '600',
      padding: '3px',
      borderRadius: '3px',
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
      maxHeight: '25px',
    },
  };

  return (
    <div style={style.mainContainer}>
      <div style={style.container}>
        <div style={style.childContainer}>
          <button>{rating}</button>
        </div>
      </div>
      {count > 1 && (
        <div style={style.container}>
          <div style={style.childContainer}>
            <button>+{count}</button>
          </div>
        </div>
      )}
    </div>
  );
};
