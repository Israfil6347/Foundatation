import React from 'react';

const MyTextInput = ({
  id,
  inputRef,
  fullWidth = true,
  label,
  placeholder,
  leftIcon,
  name,
  value,
  inputType,
  required,
  isView,
  error,
  disabled,
  autoFocus,
  onChangeHandler,
}) => {
  return (
    <div
      className={`${
        fullWidth ? 'block w-full' : 'inline-block'
      } text-onSurface `}
    >
      <div className="relative">
        <input
          name={name}
          id={id}
          size={4}
          placeholder={placeholder}
          type={inputType}
          ref={inputRef}
          disabled={isView ? true : disabled}
          value={value}
          className={`peer form-input rounded border ${
            isView ? 'border-none' : 'border-onBorder'
          } bg-surface ${
            leftIcon && 'pl-10'
          } transition-colors disabled:bg-onDisabled 
          ${
            fullWidth ? 'w-full' : 'w-64'
          } disabled:font-semibold disabled:text-primary ${
            error
              ? 'border-error focus:border-error focus:ring-1 focus:ring-error'
              : 'focus:border-primary'
          }`}
          autoFocus={autoFocus}
          onChange={(event) => {
            onChangeHandler(event);
          }}
        />

        <label
          htmlFor={id}
          className={`absolute left-0 mx-3 cursor-text rounded bg-surface  
          ${
            error
              ? 'text-error peer-focus:text-error'
              : 'text-primary peer-focus:text-primary'
          }
          peer-focus:-top-2 peer-focus:ml-3 peer-focus:text-xs
          ${
            value && leftIcon
              ? leftIcon
                ? '-top-2 ml-3 text-xs'
                : ''
              : value
              ? '-top-2 ml-3 text-xs'
              : leftIcon
              ? 'top-2.5 ml-10'
              : 'top-2.5 ml-3'
          } 
          px-1 transition-all duration-200`}
        >
          {label}
          <span className="font-medium text-error">{required ? ' *' : ''}</span>
        </label>

        {leftIcon && (
          <div className="absolute left-0 top-0 flex h-full w-12 flex-col items-center justify-center">
            {leftIcon}
          </div>
        )}
      </div>

      {error ? <span className="text-xs text-error">{error}</span> : null}
    </div>
  );
};

export default MyTextInput;
