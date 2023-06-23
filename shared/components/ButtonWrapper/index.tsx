import * as React from 'react';
import { Button } from '@fridayfood/ui-toolkit';

const ButtonWrapper = ({ label }: any) => {
  const [name, setName] = React.useState('');
  return (
    <div className="primary">
      <Button btnLabel={label} onClick={() => setName('Shared Component')} />
      <h1>{name}</h1>
    </div>
  );
};

export default ButtonWrapper;
