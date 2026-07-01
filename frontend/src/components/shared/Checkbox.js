import React from 'react';

function Checkbox({ children, className = '', type = 'checkbox', ...props }) {
  const shapeClassName = type === 'radio' ? 'form-radio rounded-full' : 'form-checkbox rounded';

  return (
    <label className="group -mx-2 flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 transition-colors hover:bg-brand-50">
      <input
        type={type}
        className={`h-5 w-5 border-gray-300 text-brand-600 focus:ring-2 focus:ring-brand-500 focus:ring-offset-1 ${shapeClassName} ${className}`}
        {...props}
      />
      <span className="text-sm text-gray-700 group-hover:text-gray-900">{children}</span>
    </label>
  );
}

export default Checkbox;
