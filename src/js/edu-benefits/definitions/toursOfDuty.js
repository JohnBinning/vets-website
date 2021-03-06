import _ from 'lodash/fp';

import dateRangeUI from '../../common/schemaform/definitions/dateRange';
import ServicePeriodView from '../../common/schemaform/ServicePeriodView';

/**
 * Returns schema for toursOfDuty based on the property names passed to it.
 * This is because some forms don't need all the information others do.
 *
 * Note: The order in which the names are in the array will affect the order
 *  they will appear in the form.
 */
export function schema(currentSchema, userOptions) {
  const options = _.assign({
    fields: ['serviceBranch', 'dateRange'],
    required: []
  }, userOptions);

  const requiredFields = options.required.filter(field => field.indexOf('.') < 0);
  const dateRangeRequiredFields = options.required
    .filter(field => field.startsWith('dateRange.'))
    .map(field => field.replace('dateRange.', ''));

  const possibleProperties = {
    serviceBranch: {
      type: 'string'
    },
    dateRange: _.assign(currentSchema.definitions.dateRange, {
      required: dateRangeRequiredFields
    }),
    serviceStatus: {
      type: 'string'
    },
    applyPeriodToSelected: {
      type: 'boolean'
    },
    benefitsToApplyTo: {
      type: 'string'
    }
  };

  return {
    type: 'array',
    minItems: options.required.length > 0 ? 1 : 0,
    items: {
      type: 'object',
      required: requiredFields,
      properties: _.pick(options.fields, possibleProperties)
    }
  };
}

export const uiSchema = {
  'ui:title': 'Service periods',
  'ui:options': {
    itemName: 'Service Period',
    viewField: ServicePeriodView,
    hideTitle: true,
  },
  items: {
    serviceBranch: {
      'ui:title': 'Branch of service'
    },
    dateRange: dateRangeUI(
      'Start of service period',
      'End of service period',
      'End of service must be after start of service'
    ),
    serviceStatus: {
      'ui:title': 'Type of service (Active duty, drilling reservist, IRR, etc.)'
    },
    applyPeriodToSelected: {
      'ui:title': 'Apply this service period to the benefit I’m applying for.'
    }
  }
};
