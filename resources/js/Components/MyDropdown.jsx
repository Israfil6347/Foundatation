import { useEffect, useState } from 'react';

const MyDropdown = ({
  id,
  name,
  label,
  value = '', // Provide a default value to avoid undefined
  defaultValue,
  error,
  required,
  disabled,
  fullWidth = true,
  isView,
  leftIcon,
  dropDownData,
  onChange,
}) => {
  const [selected, setSelected] = useState(value || defaultValue || ''); // Ensure selected value is initialized

  useEffect(() => {
    if (dropDownData && dropDownData.length === 1) {
      setSelected(dropDownData[0].value);
    }
  }, [dropDownData]);

  useEffect(() => {
    // Update selected state if the passed `value` changes
    if (value !== undefined) {
      setSelected(value);
    }
  }, [value]);

  return (
    <div className={`${fullWidth ? 'block w-full' : 'inline'} text-onSurface`}>
      <div className="relative">
        <select
          name={name}
          disabled={
            isView
              ? true
              : dropDownData && dropDownData.length === 1
              ? true
              : disabled
          }
          value={selected} // Controlled input
          className={`peer ${
            isView ? 'border-none' : ' border-onBorder'
          } rounded border-onBorder bg-surface
          ${
            fullWidth ? 'w-full' : 'w-64'
          } transition-colors focus:border-primary 
          ${
            leftIcon && 'pl-10'
          } disabled:bg-onDisabled disabled:font-semibold disabled:text-gray-500 ${
            error
              ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
              : 'focus:border-primary'
          }`}
          onChange={(event) => {
            setSelected(event.target.value);
            onChange(event); // Call the parent-provided onChange handler
          }}
        >
          <option key={-1} value="">
            None
          </option>
          {dropDownData?.map((item, index) => (
            <option key={index} value={item.value} id={`${id}_${index}`}>
              {item.label}
            </option>
          ))}
        </select>

        <label
          htmlFor={id}
          id={id}
          className={`absolute left-0  mx-3 cursor-text rounded  bg-surface peer-focus:ml-3
          ${
            (selected || defaultValue) && leftIcon
              ? leftIcon
                ? '-top-2 ml-3 text-xs'
                : ''
              : selected || defaultValue
              ? '-top-2 ml-3 text-xs'
              : leftIcon
              ? 'top-2.5 ml-10'
              : 'top-2.5 ml-3'
          } 
      px-1 transition-all duration-200 peer-focus:-top-2 peer-focus:bg-surface
      ${(disabled || isView) && 'bg-onDisabled text-primary'}
      peer-focus:text-xs peer-focus:text-primary`}
        >
          {label}
          <span className="text-xs text-error">{required ? ' *' : ''}</span>
        </label>

        {leftIcon && (
          <span className="absolute left-0 top-0 flex h-full w-12 flex-col items-center justify-center">
            {leftIcon}
          </span>
        )}
      </div>
      <div className="text-error">
        {error ? (
          <span className="text-xs text-error" id={`error_${id}`}>
            {error}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default MyDropdown;
