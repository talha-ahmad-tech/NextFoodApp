import { AsyncPaginate } from 'react-select-async-paginate';
import { Controller } from 'react-hook-form';

interface AsyncSelectFieldType {
  loadOptions: any;
  label: string;
  errorMessage: string;
  value: any;
  name: string;
  cacheUniqs: any;
  onChange: () => {};
  isMulti: boolean;
  reduceOptions?: any;
  additional: any;
  inputValue?: any;
  defaultInputValue?: any;
  disabled?: boolean;
  isSearchable?: boolean;
  control?: any;
  defaultId?: string | number;
  defaultLabel?: string;
}

const AsyncSelectFieldPaginated = ({
  loadOptions,
  label,
  errorMessage,
  value,
  onChange,
  name = '',
  cacheUniqs,
  isMulti = false,
  disabled = false,
  isSearchable = false,
  control,
  defaultInputValue,
}: AsyncSelectFieldType) => {
  return (
    <div className="form-group">
      <div className="row">
        <label className="col-12 col-lg-5 col-xxl-3 col-form-label ">
          {label}
        </label>
        <div
          className={` col-12  col-lg-7 col-xxl-9 ${
            errorMessage ? 'error-message-wrapper' : ''
          }`}
        >
          <Controller
            name={name}
            control={control}
            // defaultValue={value}
            render={({ field: { ...rest } }) => (
              <AsyncPaginate
                {...rest}
                value={value}
                inputValue={value}
                loadOptions={loadOptions}
                cacheUniqs={cacheUniqs}
                defaultOptions
                defaultInputValue={defaultInputValue}
                onChange={onChange}
                className={'select-wrapper'}
                isDisabled={disabled}
                isSearchable={true}
                isMulti={isMulti}
                additional={{
                  page: 1,
                }}
              />
            )}
          />
          {errorMessage && <p>{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};
export default AsyncSelectFieldPaginated;
