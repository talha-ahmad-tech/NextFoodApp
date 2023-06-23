import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { alertService, AlertType } from './ToasterService';

const propTypes = {
  id: PropTypes.string,
  fade: PropTypes.bool,
};

const defaultProps = {
  id: 'default-alert',
  fade: true,
};

interface ToasterInterface {
  show: boolean;
  customText: string | undefined;
  title: string | undefined;
  onClickErrorhandler: (param: string | undefined) => void;
}

const Toaster = ({
  show,
  customText,
  title,
  onClickErrorhandler = () => {},
}: Partial<ToasterInterface>) => {
  const [showtoast, setShowToast] = useState(true);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    // subscribe to new alert notifications
    const subscription = alertService
      .onAlert(defaultProps.id)
      .subscribe((alert: any) => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          setAlerts(alerts => {
            // filter out alerts without 'keepAfterRouteChange' flag
            const filteredAlerts = alerts.filter(x => x.keepAfterRouteChange);

            // remove 'keepAfterRouteChange' flag on the rest
            filteredAlerts.forEach(x => delete x.keepAfterRouteChange);
            return filteredAlerts;
          });
        } else {
          // add alert to array
          setAlerts(alerts => [...alerts, alert]);

          // auto close alert if required
          if (alert.autoClose) {
            setTimeout(() => removeAlert(alert), 3000);
          }
        }
      });

    // clear alerts on location change
    // const historyUnlisten = navigate.listen(() => {
    //   alertService.clear(defaultProps.id);
    // });

    // // clean up function that runs when the component unmounts
    // return () => {
    //   // unsubscribe & unlisten to avoid memory leaks
    //   subscription.unsubscribe();
    //   historyUnlisten();
    // };
  }, []);

  function removeAlert(alert: any) {
    if (defaultProps.fade) {
      // fade out alert
      const alertWithFade = { ...alert, fade: true };
      setAlerts(alerts => alerts.map(x => (x === alert ? alertWithFade : x)));

      // remove alert after faded out
      setTimeout(() => {
        setAlerts(alerts => alerts.filter(x => x !== alertWithFade));
      }, 250);
    } else {
      // remove alert
      setAlerts(alerts => alerts.filter(x => x !== alert));
    }
  }

  function cssClasses(alert: any) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert alert-success',
      [AlertType.Error]: 'alert alert-danger',
      [AlertType.Info]: 'alert alert-info',
      [AlertType.Warning]: 'alert alert-warning',
    };

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }

  function alertTitle(alert: any) {
    if (!alert) return;

    const alertTitles = {
      [AlertType.Success]: 'Success',
      [AlertType.Error]: 'Error',
      [AlertType.Info]: 'Info',
      [AlertType.Warning]: 'Warning',
    };

    return alertTitles[alert.type];
  }

  // if (!alerts.length) return null;

  // alerts.map((alert, index): any => {
  //   <SweetAlert
  //     show={showtoast}
  //     danger={false}
  //     showCancel
  //     confirmBtnBsStyle="danger"
  //     title={title}
  //     onConfirm={() => {}}
  //     onCancel={() => {
  //       setShowToast(false);
  //     }}
  //     focusCancelBtn
  //     showConfirm={false}
  //   >
  //     {alert?.message}
  //   </SweetAlert>;
  // });

  return (
    <div
      className="alert-container"
      style={{
        zIndex: 9999999,
        position: 'fixed',
        top: '72px',
        right: '0px',
        minWidth: '35%',
      }}
    >
      <div className="">
        {alerts.map((alert, index) => (
          <div
            key={index}
            className={`${cssClasses(
              alert,
            )} alert-dismissible fade show d-flex justify-content-between align-items-center`}
          >
            <div>
              <strong>{alertTitle(alert)}!</strong> {alert.message}
            </div>
            <button
              type="button"
              className="alert-close"
              onClick={() => removeAlert(alert)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

Toaster.propTypes = propTypes;
Toaster.defaultProps = defaultProps;
export { Toaster };
