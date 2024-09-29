import React from 'react';

const MyTextarea = ({
  label,
  name,
  rows,
  cols,
  value,
  error,
  required,
  onChange,
  disabled,
}) => {
  return (
    <>
      <div className="relative  w-full text-onSurface ">
        <textarea
          name={name}
          rows={rows}
          cols={cols}
          disabled={disabled}
          value={value}
          className={`peer w-full rounded bg-surface transition-colors focus:border-primary disabled:bg-onDisabled disabled:font-semibold disabled:text-primary  ${
            error ? 'ring-error' : 'ring-success'
          } `}
          onChange={onChange}
        ></textarea>

        <label
          htmlFor={name}
          className={`text absolute left-0 mx-3 cursor-text rounded bg-surface px-1 transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-primary ${
            value
              ? value.length > 0
                ? ' -top-2 text-xs text-primary'
                : 'top-2'
              : 'top-2'
          }`}
        >
          {label}
          <span className="font-medium text-error">{required ? ' *' : ''}</span>
        </label>

        {error ? <span className="text-xs text-error">{error}</span> : null}
      </div>
    </>
  );
};

export default MyTextarea;
