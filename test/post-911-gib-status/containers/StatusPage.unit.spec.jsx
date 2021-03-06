import React from 'react';
import { findDOMNode } from 'react-dom';
import SkinDeep from 'skin-deep';
import { expect } from 'chai';
import ReactTestUtils from 'react-dom/test-utils';

import StatusPage from '../../../src/js/post-911-gib-status/containers/StatusPage.jsx';

import reducer from '../../../src/js/post-911-gib-status/reducers/index.js';
import createCommonStore from '../../../src/js/common/store';

const store = createCommonStore(reducer);
const defaultProps = store.getState();
defaultProps.post911GIBStatus = {
  enrollmentData: {
    veteranIsEligible: true,
    remainingEntitlement: {},
    originalEntitlement: {},
    usedEntitlement: {}
  }
};

describe('<StatusPage>', () => {
  it('should render', () => {
    const tree = SkinDeep.shallowRender(<StatusPage store={store} {...defaultProps}/>);
    const vdom = tree.getRenderOutput();
    expect(vdom).to.exist;
  });

  it('should show title and print button', () => {
    const node = findDOMNode(ReactTestUtils.renderIntoDocument(<StatusPage store={store} {...defaultProps}/>));
    expect(node.querySelector('.schemaform-title').textContent)
      .to.contain('Post-9/11 GI Bill Statement of Benefits');
    expect(node.querySelector('.usa-button-primary').textContent)
      .to.contain('Print Statement of Benefits');
  });

  it('should not show intro and print button if veteran is not eligible', () => {
    const props = {
      enrollmentData: {
        veteranIsEligible: false,
        originalEntitlement: {},
        usedEntitlement: {},
        remainingEntitlement: {},
      }
    };

    const tree = SkinDeep.shallowRender(<StatusPage store={store} {...props}/>);
    expect(tree.subTree('.va-introtext')).to.be.false;
    expect(tree.subTree('.usa-button-primary')).to.be.false;
  });
});

