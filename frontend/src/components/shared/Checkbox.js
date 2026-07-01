import React from 'react';

function Checkbox({ children, ...props }) {
  return (
    <label className="flex items-center">
      <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1" {...props} />
      <span className="ml-2">{children}</span>
    </label>
  );
}

export default Checkbox;
