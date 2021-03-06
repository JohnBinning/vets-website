import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import classNames from 'classnames';
import moment from 'moment';
import DatePicker from 'react-datepicker';

import LoadingIndicator from '../../common/components/LoadingIndicator';
import ErrorableRadioButtons from '../../common/components/form-elements/ErrorableRadioButtons';
import ErrorableCheckbox from '../../common/components/form-elements/ErrorableCheckbox';
import ErrorView from '../components/ErrorView';
import { reportTypes } from '../config';
import {
  changeDateOption,
  setDate,
  toggleAllReports,
  toggleReportType,
  resetForm,
} from '../actions/form';
import { openModal } from '../actions/modal';
import { initialAppRefresh } from '../actions/refresh';
import { isValidDateRange } from '../utils/validations';

export class Main extends React.Component {
  constructor(props) {
    super(props);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderReportCheckBoxLabel = this.renderReportCheckBoxLabel.bind(this);
    this.renderInformationTypes = this.renderInformationTypes.bind(this);
    this.renderDateOptions = this.renderDateOptions.bind(this);

    this.state = {
      invalidStartDateFormat: false,
      invalidEndDateFormat: false
    };
  }

  componentDidMount() {
    this.props.resetForm();
    // kick off initial PHR refresh process
    if (!this.props.loading) {
      this.props.initialAppRefresh();
    }
  }

  handleStartDateChange(startDate) {
    this.props.setDate(startDate);
  }

  handleEndDateChange(endDate) {
    this.props.setDate(endDate ? endDate.endOf('day') : null, false);
  }

  handleSubmit(e) {
    e.preventDefault();
    // save state in case user refreshes the page
    sessionStorage.setItem('hr-form', JSON.stringify(this.props.form));
    this.context.router.push('/loading');
  }

  renderReportCheckBoxLabel(c) {
    let onClick;
    let hasGlossaryLink = false;
    let linkText;

    if (c.value === 'dodmilitaryservice') {
      hasGlossaryLink = true;
      linkText = '(Learn more)';

      onClick = (e) => {
        e.preventDefault();
        this.props.openModal('Military Service Information', (
          <div>
            You will have access to your:
            <ul>
              <li>Military Occupational Speciality (MOS) codes</li>
              <li>Pay details</li>
              <li>Service dates</li>
              <li>Deployment periods</li>
              <li>Retirement periods</li>
            </ul>
          </div>
        ));
      };
    } else if (c.hold) {
      hasGlossaryLink = true;
      linkText = `(Available after ${c.hold} days)`;
      onClick = (e) => {
        e.preventDefault();
        this.props.openModal(`Available after ${c.hold} days`, c.holdExplanation);
      };
    }

    if (hasGlossaryLink) {
      return (
        <span>
          {c.label} <a href="#" onClick={onClick}>
            {linkText}
          </a>
        </span>
      );
    }

    return c.label;
  }

  renderInformationTypes() {
    return Object.keys(reportTypes).map(k => {
      const rt = reportTypes[k];
      return (
        <div key={k} className="info-type-section">
          <h5>{rt.title}</h5>
          {rt.children.map(c => {
            const reportTypeOnChange = (checked) => {
              this.props.toggleReportType(c.value, checked);
            };
            return (
              <div key={c.value}>
                <ErrorableCheckbox
                    name={c.value}
                    label={this.renderReportCheckBoxLabel(c)}
                    checked={this.props.form.reportTypes[c.value]}
                    onValueChange={reportTypeOnChange}/>
              </div>
            );
          })}
        </div>
      );
    });
  }

  renderDateOptions() {
    const {
      dateOption,
      dateRange: {
        start: startDate,
        end: endDate
      }
    } = this.props.form;

    const handleFormattedDate = (start = true) => {
      let handleDateChange;
      let setDateError;

      if (start) {
        handleDateChange = this.handleStartDateChange;
        setDateError = (errorType) => this.setState({ startDateError: errorType });
      } else {
        handleDateChange = this.handleEndDateChange;
        setDateError = (errorType) => this.setState({ endDateError: errorType });
      }

      return (e) => {
        const dateString = e.target.value;
        const momentDate = moment(dateString, 'MM/DD/YYYY');

        if (momentDate.isValid()) {
          const isValidRange = start
                             ? isValidDateRange(momentDate, endDate)
                             : isValidDateRange(startDate, momentDate);
          if (isValidRange) {
            handleDateChange(momentDate);
          } else {
            handleDateChange(null);
            setDateError('startDate');
          }
        } else {
          handleDateChange(null);
          if (dateString) {
            setDateError('invalid');
          } else {
            setDateError('missing');
          }
        }
      };
    };

    const datePickerDisabled = dateOption !== 'custom';

    const errors = [this.state.startDateError, this.state.endDateError];
    const invalidFormatError = errors.includes('invalid');
    const missingDateError = errors.includes('missing');
    const startDateError = errors.includes('startDate');

    const customDateOptionClass = classNames({
      'custom-date-option': true,
      'date-range-error': this.state.startDateError || this.state.endDateError
    });

    const validationErrorMessages = {
      invalidFormatError: 'Enter dates in the MM/DD/YYYY date format',
      missingDateError: 'Enter a date range',
      startDateError: 'Start date should be before end date'
    };

    const radioButtonProps = {
      name: 'dateRange',
      label: '',
      options: [
        { label: 'Last 3 months', value: '3mo' },
        { label: 'Last 6 months', value: '6mo' },
        { label: 'Last year', value: '1yr' },
        {
          label: (
            <div aria-live="assertive" className={customDateOptionClass}>
              {
                invalidFormatError && <p className="date-range-error">
                {validationErrorMessages.invalidFormatError}</p>
              }
              {
                startDateError && <p className="date-range-error">
                {validationErrorMessages.startDateError}</p>
              }
              {
                !datePickerDisabled && !invalidFormatError && missingDateError && <p className="date-range-error">
                {validationErrorMessages.missingDateError}</p>
              }
              <span>Custom date range</span>
              <div className="date-range-fields">
                <DatePicker
                    aria-label="Custom date range: start date"
                    id="custom-date-start"
                    onBlur={handleFormattedDate()}
                    onChange={this.handleStartDateChange}
                    onFocus={() => this.setState({ startDateError: null })}
                    placeholderText="MM/DD/YYYY"
                    selected={startDate}
                    disabled={datePickerDisabled}
                    maxDate={endDate}
                    tetherConstraints={[{ to: 'scrollParent', attachment: 'none' }]}
                    className={!datePickerDisabled && this.state.startDateError ? 'date-range-error' : ''}/>
                <span>&nbsp;to&nbsp;</span>
                <DatePicker
                    aria-label="Custom date range: end date"
                    id="custom-date-end"
                    onBlur={handleFormattedDate(false)}
                    onChange={this.handleEndDateChange}
                    onFocus={() => this.setState({ endDateError: null })}
                    placeholderText="MM/DD/YYYY"
                    selected={endDate}
                    disabled={datePickerDisabled}
                    minDate={startDate}
                    maxDate={moment()}
                    tetherConstraints={[{ to: 'scrollParent', attachment: 'none' }]}
                    className={!datePickerDisabled && this.state.endDateError ? 'date-range-error' : ''}/>
              </div>
            </div>
          ),
          value: 'custom'
        },
      ],
      onValueChange: (v) => {
        if (v.dirty) {
          this.props.changeDateOption(v.value);
          this.setState({
            startDateError: null,
            endDateError: null,
          });
        }
      },
      value: {
        value: dateOption,
      }
    };

    return (
      <div>
        <h4 className="highlight">Select Date Range</h4>
        <ErrorableRadioButtons {...radioButtonProps}/>
      </div>
    );
  }

  render() {
    const selections = this.props.form.reportTypes;
    const types = Object.keys(selections);
    const checkedCount = _.countBy(types, type => selections[type]).true;
    const allValuesChecked = checkedCount === types.length;
    const noValuesChecked = !checkedCount;
    const hasCustomDateErrors = this.state.startDateError || this.state.endDateError;

    if (this.props.loading) {
      return <LoadingIndicator message="Loading your application..."/>;
    }

    return (
      <ErrorView errors={this.props.errors}>
        <div>
          <div className="heading-wrapper">
            <h1>Get Your VA Health Records</h1>
            <span className="blue-button-logo"></span>
          </div>
          <form>
            {this.renderDateOptions()}
            <div>
              <h4 className="highlight">Select Types of Information</h4>
              <ErrorableCheckbox
                  name="all"
                  label="All available VA health records"
                  checked={allValuesChecked}
                  onValueChange={(checked) => {
                    this.props.toggleAllReports(checked);
                  }}/>
              {this.renderInformationTypes()}
            </div>
            <div className="form-actions">
              <button
                  onClick={this.handleSubmit}
                  type="submit"
                  disabled={noValuesChecked || hasCustomDateErrors}>
                Submit
              </button>
              <a className="usa-button usa-button-outline" href="/health-care" role="button">Cancel</a>
            </div>
          </form>
        </div>
      </ErrorView>
    );
  }
}

Main.contextTypes = {
  router: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  const hrState = state.health.hr;

  return {
    form: hrState.form,
    loading: hrState.refresh.loading,
    errors: hrState.refresh.errors,
  };
};

const mapDispatchToProps = {
  changeDateOption,
  initialAppRefresh,
  openModal,
  setDate,
  toggleAllReports,
  toggleReportType,
  resetForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
