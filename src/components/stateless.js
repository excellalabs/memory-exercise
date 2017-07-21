
import React from 'react';

export default (props) => {
  return (
    <div>
      {props.greeting}, {props.children}
    </div>
  );
};
