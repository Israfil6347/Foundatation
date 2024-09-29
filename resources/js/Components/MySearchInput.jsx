import React from 'react';

const MySearchInput = ({
  id,
  inputRef,
  fullWidth = true,
  label,
  placeholder,
  leftIcon,
  name,
  value,
  defaultValue,
  required,
  isView,
  error,
  disabled,
  searchButton,
  autoFocus,
  onChangeHandler,
  onSubmit,
  onResetClick,
}) => {
  return (
    <form className={`text-onSurface`} onSubmit={onSubmit}>
      <div
        className={`${fullWidth ? 'block w-full' : 'inline-block'} relative`}
      >
        <input
          name={name}
          id={id}
          placeholder={placeholder}
          type="text"
          autoComplete="off"
          ref={inputRef}
          disabled={isView ? true : disabled}
          value={value}
          defaultValue={defaultValue}
          className={`peer form-input w-full  rounded border ${
            isView ? 'border-none' : ' border-onBorder'
          } bg-surface ${
            leftIcon && 'pl-10'
          } transition-colors focus:border-primary disabled:bg-onDisabled disabled:font-semibold disabled:text-primary ${
            error ? 'border-error' : ''
          }`}
          autoFocus={autoFocus}
          onChange={onChangeHandler}
        />

        <label
          htmlFor={id}
          className={`absolute left-0 mx-3 ${
            leftIcon && 'ml-10'
          } cursor-text rounded bg-surface
          
          ${error ? 'text-error' : 'text-primary'}
          px-1 transition-all duration-200 peer-focus:-top-2  peer-focus:text-xs peer-focus:text-primary  ${
            (defaultValue || value) && leftIcon
              ? '-top-2 ml-3 text-xs'
              : leftIcon
              ? 'top-2.5 ml-10'
              : 'top-2.5 ml-3'
          } peer-focus:ml-3`}
        >
          {label}
          <span className="font-medium text-error">{required ? ' *' : ''}</span>
        </label>

        <div className="absolute left-0 top-0 flex h-full w-12 flex-col items-center justify-center">
          {leftIcon}
        </div>

        {value && (
          <button
            type="button"
            onClick={onResetClick}
            className="absolute top-0 left-0 flex h-full w-10 flex-col items-center justify-center rounded-l bg-primary text-onPrimary transition-all duration-300 hover:scale-105 hover:ring-1 hover:ring-pink-500"
          >
            <i className="fa-solid fa-xmark fa-lg"></i>
          </button>
        )}
        <button
          type="submit"
          className="absolute top-0 right-0 h-full w-10 rounded-r bg-primary text-onPrimary transition-all duration-300 hover:scale-105 hover:ring-1 hover:ring-pink-500"
        >
          <i className="fa-brands fa-golang fa-lg"></i>
        </button>
      </div>

      {error ? <div className="text-xs text-error">{error}</div> : null}
    </form>
  );
};

export default MySearchInput;
