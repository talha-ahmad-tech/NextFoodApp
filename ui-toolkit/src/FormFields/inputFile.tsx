import { Icon } from '@fridayfood/shared/components/Icon';

interface InputType {
  label: string;
  errorMessage: string;
  name: string;
  value: string;
  onChange: () => void;
  onBlur: () => void;
  disabled: boolean;
  type: string;
  readOnly?: boolean;
  defaultValue?: string;
  placeholder?: string;
  noBorderFile?: boolean;
  dropUploadWrapper?: boolean;
  fullWidth?: boolean;
}

const InputFile = ({
  label = '',
  type = 'text',
  errorMessage = '',
  name = '',
  value = '',
  onChange,
  onBlur,
  disabled = false,
  readOnly = false,
  defaultValue,
  placeholder = '',
  noBorderFile = false,
  dropUploadWrapper = false,
  fullWidth = false,
  ...rest
}: Partial<InputType>) => {
  return (
    <>
      {dropUploadWrapper ? (
        <>
          <div className="row">
            {fullWidth ? null : (
              <div className="col-12  col-lg-3">
                <label className="col-form-label form-label-required">
                  {label}
                  {/* <sup>{isOptional ? null : '*'}</sup> */}
                </label>
              </div>
            )}

            <div className={` ${fullWidth ? 'col-12' : 'col-12  col-lg-9'}`}>
              <div className="drag-upload-wrapper-style">
                <svg
                  id="Group_9833"
                  data-name="Group 9833"
                  xmlns="http://www.w3.org/2000/svg"
                  width="49.479"
                  height="49.473"
                  viewBox="0 0 49.479 49.473"
                >
                  <path
                    id="Path_64082"
                    data-name="Path 64082"
                    d="M253.9,244.383v-1.857l.007-.007-.007-.007v-28.58a9.522,9.522,0,0,0-9.511-9.511h-30.45a9.522,9.522,0,0,0-9.511,9.511v30.452a9.522,9.522,0,0,0,9.511,9.511h30.452a9.522,9.522,0,0,0,9.511-9.511Zm-47.568-30.45a7.62,7.62,0,0,1,7.613-7.613H244.39A7.62,7.62,0,0,1,252,213.933V240.6l-8.459-8.446a2.856,2.856,0,0,0-4.035,0l-6.793,6.793-13.048-13.055a2.856,2.856,0,0,0-4.035,0l-9.3,9.3Zm7.606,38.057a7.62,7.62,0,0,1-7.613-7.613v-6.5l10.644-10.644a.956.956,0,0,1,1.345,0l24.75,24.75H213.938Zm31.72-.1-11.593-11.6,6.793-6.793a.955.955,0,0,1,1.345,0l9.791,9.8v1.086a7.625,7.625,0,0,1-6.336,7.51Z"
                    transform="translate(-204.428 -204.42)"
                    fill="#0b77e3"
                  />
                  <path
                    id="Path_64083"
                    data-name="Path 64083"
                    d="M367.92,313.241a6.315,6.315,0,1,0-6.315-6.315A6.323,6.323,0,0,0,367.92,313.241Zm0-10.733a4.418,4.418,0,1,1-4.418,4.418A4.421,4.421,0,0,1,367.92,302.508Z"
                    transform="translate(-338.945 -286.742)"
                    fill="#0b77e3"
                  />
                </svg>
                <div className="drag-upload-wrapper-style-inner">
                  <p>
                    Drag or drop your image here or{' '}
                    <span>
                      Browse{' '}
                      <input type={'file'} onChange={onChange} name={name} />
                    </span>
                  </p>
                </div>
              </div>
              <div className="upload-image-wrapper-bottom">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11.776"
                  height="11.807"
                  viewBox="0 0 11.776 11.807"
                >
                  <path
                    id="Path_64188"
                    data-name="Path 64188"
                    d="M179.74,172.968l-3.277,2.941-1.765,1.6a3.067,3.067,0,0,1-4.034,0,2.389,2.389,0,0,1,0-3.656l1.765-1.6.336-.294,3.613-3.236a2.045,2.045,0,0,1,2.689,0,1.592,1.592,0,0,1,0,2.437l-3.908,3.488-1.177,1.051a1.022,1.022,0,0,1-1.345,0,.8.8,0,0,1,0-1.219l4.034-3.656h.042a.406.406,0,0,0,0-.588.511.511,0,0,0-.672,0l-4.034,3.614a1.592,1.592,0,0,0,0,2.437,2.045,2.045,0,0,0,2.689,0l5.042-4.538-.42-.378.42.378a2.389,2.389,0,0,0,0-3.656,3.067,3.067,0,0,0-4.034,0l-5.757,5.168a3.185,3.185,0,0,0,0,4.874,4.146,4.146,0,0,0,5.42,0l5.042-4.538a.406.406,0,0,0,0-.588.472.472,0,0,0-.672-.042Z"
                    transform="translate(-168.816 -167.337)"
                    fill-rule="evenodd"
                  />
                </svg>
                <p>imagesname.jpg</p>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={` ${
            noBorderFile
              ? 'custom-input-select-wrapper no-border-wrapper'
              : 'custom-input-select-wrapper '
          }`}
        >
          <div className="custom-input-select-wrapper-inner">
            {/* <Icon variant="attachements" /> */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="11.776"
              height="11.807"
              viewBox="0 0 11.776 11.807"
            >
              <path
                id="Path_64188"
                data-name="Path 64188"
                d="M179.74,172.968l-3.277,2.941-1.765,1.6a3.067,3.067,0,0,1-4.034,0,2.389,2.389,0,0,1,0-3.656l1.765-1.6.336-.294,3.613-3.236a2.045,2.045,0,0,1,2.689,0,1.592,1.592,0,0,1,0,2.437l-3.908,3.488-1.177,1.051a1.022,1.022,0,0,1-1.345,0,.8.8,0,0,1,0-1.219l4.034-3.656h.042a.406.406,0,0,0,0-.588.511.511,0,0,0-.672,0l-4.034,3.614a1.592,1.592,0,0,0,0,2.437,2.045,2.045,0,0,0,2.689,0l5.042-4.538-.42-.378.42.378a2.389,2.389,0,0,0,0-3.656,3.067,3.067,0,0,0-4.034,0l-5.757,5.168a3.185,3.185,0,0,0,0,4.874,4.146,4.146,0,0,0,5.42,0l5.042-4.538a.406.406,0,0,0,0-.588.472.472,0,0,0-.672-.042Z"
                transform="translate(-168.816 -167.337)"
                fill-rule="evenodd"
              />
            </svg>
            <input type={'file'} onChange={onChange} name={name} />
          </div>

          <p>{value}</p>
        </div>
      )}
    </>
  );
};

export default InputFile;
