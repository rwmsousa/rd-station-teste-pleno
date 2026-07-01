import React from 'react';

function SubmitButton({ text, disabled }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="w-full rounded-lg bg-brand-600 px-4 py-2.5 font-semibold text-white shadow-sm transition-colors hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
    >
      {text}
    </button>
  );
}

export default SubmitButton;
