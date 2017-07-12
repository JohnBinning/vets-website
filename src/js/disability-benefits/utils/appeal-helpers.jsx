import React from 'react';
import moment from 'moment';

export const hearingDescriptions = {
  video: {
    title: 'You have asked for a videoconference hearing.',
    description: <p>You will get a letter in the mail at least 30 days before your hearing is scheduled letting you know the date, time, and location of the hearing.</p>
  },
  travel_board: { // eslint-disable-line camelcase
    title: 'You have asked for a travel board hearing. ',
    description: <p>You will get a letter in the mail at least 30 days before your hearing is scheduled letting you know the date, time, and location of the hearing.</p>
  },
  central_office: { // eslint-disable-line camelcase
    title: 'You asked for a Board hearing in Washington, DC',
    description: <p>You will get a letter in the mail at least 30 days before your hearing is scheduled. It will let you know the date and time of the hearing. The Board's central office hearings take place at 425 Eye Street, Washington, DC, 20001.</p>
  },
};

export function appealStatusDescriptions(lastEvent, previousHistory = []) {
  const eventDateString = moment(lastEvent.date).format('MMM DD, YYYY');

  const contentMap = {
    hearing_held: { // eslint-disable-line camelcase
      title: 'Your Hearing Was Held',
      description: <p>Your hearing was held on {eventDateString} with a Veterans Law Judge in Washington, DC / through videoconference / at your local VA with the Traveling Board. The transcript of your hearing will be added to your appeal.</p>
    },
    hearing_cancelled: { // eslint-disable-line camelcase
      title: 'Your Hearing Was Canceled',
      description: <div>
        <p>Your hearing was scheduled for {eventDateString}.</p>
        <p>If you canceled your hearing for an important reason, like you, your representative, or a witness are sick, or you're having difficulty getting records needed for your appeal, you can file a motion by writing a letter to the Board explaining why you need to reschedule the hearing. A Veterans Law Judge will review your letter and decide if the hearing can be rescheduled. You will get a copy of the decision about rescheduling your hearing the mail.</p>
        <p>Send letters explaining why you need to reschedule your hearing to:<br/>
          Director, Office of Management, Planning and Analysis (014)<br/>
          Board of Veterans' Appeals<br/>
          P.O. Box 27063<br/>
          Washington, DC 20038
        </p>
      </div>
    },
    hearing_no_show: { // eslint-disable-line camelcase
      title: 'You Missed Your Hearing',
      description: <div>
        <p>Your hearing was scheduled for {eventDateString} with a Veterans Law Judge in Washington, DC / through videoconference / at your local VA with the Traveling Board. Because you missed the date, your hearing has been canceled. The Judge will make a decision based on the information you have provided.</p>
        <p>If you missed your hearing for an important reason, like you, your representative, or a witness are sick, or you're having difficulty getting records needed for your appeal, you can file a motion by writing a letter to the Board explaining why you need to reschedule the hearing. A Veterans Law Judge will review your letter and decide if the hearing can be rescheduled. You will get a copy of the decision about rescheduling your hearing the mail.</p>
        <p>Send letters explaining why you need to reschedule your hearing to:<br/>
          Director, Office of Management, Planning and Analysis (014)<br/>
          Board of Veterans' Appeals<br/>
          P.O. Box 27063<br/>
          Washington, DC 20038
        </p>
      </div>
    },
    withdrawn: {
      status: {
        title: 'You Have Withdrawn Your Appeal',
        description: <p>Your appeal was withdrawn (canceled) by you or your representative. Your appeal is now closed.</p>
      }
    },
    form9: {
      status: {
        title: 'Your Form 9 was received by the Regional Office (RO)',
        description: <div>
          <p>The Veterans Benefits Administration (VBA) RO has received your Form 9, and is now completing the final steps in the processing of your appeal before it is sent to the Board.</p>
          <ul>
            <li>If you didn't submit any new evidence with your Form 9, your appeal is now waiting for the RO to certify it to the Board.</li>
            <li>If you, your legal representative, or your healthcare provider added new evidence, the RO will review the evidence and another SSOC will be developed.</li>
          </ul>
          <p>
            On average, Veterans with appeals in the Form 9 stage, wait about 12 months for VBA to complete the necessary action.
          </p>
        </div>,
      },
    },
    ssoc: {
      status: {
        soc: {
          title: 'Your Supplemental Statement of the Case (SSOC) Was Prepared by the Regional Office (RO)',
          description: <div>
            <p>The Veterans Benefits Administration (VBA) RO has prepared the SSOC for your appeal. An SSOC was created because you, your legal representative, your healthcare provider, or the VA added new evidence to your appeal.</p>
            <p>When you receive a copy of the SSOC in the mail, you need to <a href="https://www.va.gov/vaforms/va/pdf/VA9.pdf">complete the Form 9</a>. This form asks you to review the SSOC and confirm the issues you want to appeal and why you want to appeal them. If you would like VBA to certify your appeal to the Board, you need to complete and send back the Form 9 by (date). If you do not send back the Form 9, your appeal will be closed.</p>
            <p>On a Form 9, you can also let the Board know if you would like a hearing for your appeal. Learn more about hearings.</p>
            <p>If new evidence is added to your appeal, the RO will review the evidence and another SSOC will be developed.</p>
          </div>,
        },
        form9: {
          title: 'Your Supplemental Statement of the Case (SSOC) Was Prepared by the Regional Office (RO)',
          description: <div>
            <p>The Veterans Benefits Administration (VBA) RO has prepared an SSOC for your appeal. An SSOC was created because you, your legal representative, your healthcare provider, or the VA added new evidence to your appeal.</p>
            <ul>
              <li>Your appeal is now ready for the RO to certify it to the Board.</li>
              <li>If new evidence was added to your appeal, the RO will review the evidence and another SSOC will be developed.</li>
            </ul>
          </div>,
        },
        activated: {
          title: 'Your Supplemental Statement of the Case (SSOC) Was Prepared by the Veterans Benefits Administration (VBA)',
          description: <p>VBA has followed the Board's remand instructions to find additional evidence for your appeal. VBA completed an SSOC with the new evidence included. The SSOC has been sent to the Board, and you will get a copy of it in the mail.</p>
        },
      },
      nextAction: {
        title: `To continue with your appeal, we need your Form 9 by ${moment(lastEvent.date).add(60, 'days').format('MMM DD, YYYY')}`,
        description: <div>
          <p>The Form 9 asks you to review the SOC and confirm the issues you want to appeal and why you want to appeal them. You can also let the Board know if you would like a hearing for your appeal.</p>
          <p><a href="#">Learn more about hearings.</a></p>
        </div>,
      }
    },
    remand_ssoc: { // eslint-disable-line camelcase
      status: {
        title: 'Your Supplemental Statement of the Case (SSOC) Was Prepared by the Veterans Benefits Administration (VBA)',
        description: <p>VBA has followed the Board's remand instructions to find additional evidence for your appeal. VBA completed an SSOC with the new evidence included. The SSOC has been sent to the Board, and you will get a copy of it in the mail.</p>
      }
    },
    soc: {
      status: {
        title: 'Your Statement of the Case (SOC) was Prepared by the Regional Office (RO)',
        description: <div>
          <p>The Veterans Benefits Administration (VBA) RO has mailed you the SOC for your appeal. Included with your SOC is a Form 9, which you can use to ask for your appeal to continue.</p>
          <p>
            To continue your appeal, you need to complete and send back your Form 9 by July 28, 2017. If you do not send back a Form 9 in time, your appeal will be closed.
          </p>
        </div>,
      },
      nextAction: {
        title: `To continue with your appeal, we need your Form 9 by ${moment(lastEvent.date).add(60, 'days').format('MMM DD, YYYY')}`,
        description: <div>
          <p>The Form 9 asks you to review the SOC and confirm the issues you want to appeal and why you want to appeal them. You can also let the Board know if you would like a hearing for your appeal.</p>
          <p><a href="#">Learn more about hearings.</a></p>
        </div>,
      }
    },
    nod: {
      status: {
        title: 'Your NOD has been received by the Veterans Benefits Administration (VBA) RO.',
        description: <p>Your NOD has been received by the RO. The RO will make a decision or develop the Statement of the Case (SOC) for your appeal. This means they review all of the evidence related to your appeal, including any new evidence you submit. When the SOC is prepared, you will receive a copy of it in the mail.</p>,
      },
    },
    bva_final_decision: { // eslint-disable-line camelcase
      status: {
        title: 'The Board Has Made a Decision on Your Appeal',
        description: <div>
          <p>The Board has made a decision on each issue within your appeal. You will receive a copy of the Board's decision in the mail.</p>
          <h5>What if I don’t agree with the Board's decision?</h5>
          <p>If you disagree with issue the Board decided, you can appeal it by filing a Notice of Appeal with the United States Court of Appeals for Veterans Claims (CAVC), which is a Federal court. You have 120 days from the date written on the front of the Board decision to file an appeal with CAVC, if you decide to do so. <a href="https://www.uscourts.cavc.gov/appeal.php">Learn how to file an appeal with the CAVC.</a></p>
        </div>,
      },
    },
    certified: {
      status: {
        title: 'The Regional Office (RO) Has Certified Your Appeal',
        description: <div>
          <p>The Veterans Benefits Administration (VBA) RO has certified your appeal to the Board. This means it is now waiting for the Board to receive it and place it in line for review by a lawyer. You will be notified when your appeal is activated by the Board.</p>
          <p>The average time it takes for the Board to activate your appeal is 9 months.</p>
          <h5>Note:</h5>
          <ul>
            <li>If your <strong>Form 9 was received on or after February 2, 2013:</strong> If you or your legal representative adds new evidence, the evidence will only be reviewed by the Board and not the RO. If someone other than you or your representative submits evidence, the Board will have to remand the appeal to the RO to consider the evidence and issue a Supplemental Statement of the Case (SSOC). Sending the case back to the RO for this type of consideration can add years to the time it takes to decide your appeal, but you can avoid this additional delay if you send a letter to the Board that says you want the Board to consider the new evidence without sending it back to the RO.</li>
            <li>If your <strong>Form 9 was received before February 2, 2013:</strong> If you or anyone submits new evidence on your behalf, then the Board will have to remand the appeal to the RO to review the evidence and issue a Supplemental Statement of the Case (SSOC). Sending the case back to the RO for this type of consideration can add years to the time it takes to decide your appeal, but you can avoid this additional delay if you send a letter to the Board that says you want the Board to consider the new evidence without sending it back to the RO.</li>
          </ul>
        </div>,
      },
    },
    bva_remand: { // eslint-disable-line camelcase
      status: {
        title: 'Your Appeal Has Been Remanded',
        description: <div>
          <p>The Board has made a decision on each issue within your appeal and all or some of the issues have been remanded. This means the Veterans Law Judge who reviewed your appeal needs more information before making a decision on all or some of the issues.</p>
          <p>On average, about 54% of issues in appeals get remanded. The Board has sent your appeal to the Veterans Benefits Administration (VBA) to add any relevant information to your case. If a physical exam was requested, VBA will reach out to you. If your appeal is not granted during the VBA review, a Supplemental Statement of the Case (SSOC) will be developed and sent to the Board.</p>
          <p><strong>On average, Veterans with appeals in the Remand stage, wait about 14 months for VBA to complete the necessary action.</strong></p>
        </div>
      }
    },
    merged: {
      status: {
        title: 'Your Appeal Has Been Merged With Your Earlier Appeal',
        description: <p>Because you had separate appeals on multiple claims, the appeals have been merged so that all of the issues you appealed can be considered at the same time. Instead of waiting on two (or more) decisions, all of the issues in your appeals will be addressed in a single decision by the Board. Your place in line will is based on your oldest appeal, meaning that the issues from your newer appeal(s) will be decided more quickly than if the appeals were not merged.</p>
      }
    },
    field_grant: { // eslint-disable-line camelcase
      status: {
        title: 'Your Appeal Has Been Granted by the Regional Office (RO)',
        description: <p>This means the Veterans Benefits Administration (VBA) RO has granted the claim you filed an appeal for. Your appeal is now closed.</p>,
      }
    },
    cavc_decision: { // eslint-disable-line camelcase
      status: {
        title: 'The Court of Appeals for Veterans Claims (CAVC) Has Made a Decision',
        description: <div>
          <p>The CAVC has made a decision on your appeal. You will receive a copy of the CAVC's decision in the mail.</p>
          <ul>
            <li>If the CAVC denied your appeal, your appeal is now closed.</li>
            <li>If the CAVC reversed the Board decision and granted your appeal, the Board will issue a decision following the CAVC's instructions to grant you the benefits you sought on appeal.</li>
            <li>If the CAVC remanded your case, that means the Board needs to further review your case. The Board will review the CAVC's decision and gather more evidence or make a new decision on your appeal. After a CAVC remand, your appeal has priority status at the Board. The Board will send you a letter when it receives your appeal, and let you know how to submit any additional evidence you may have. If you have additional evidence for the Board to review, you can submit it within 90 days from the date of the Board's letter.</li>
          </ul>
        </div>,
      }
    },
    activated: {
      status: {
        defaultStatus: {
          title: 'The Board Has Activated Your Appeal',
          description: <div>
            <p>Your appeal has been activated by the Board. It is now in line for review by a Veterans Law Judge. An appeal typically reaches its place in line for review 3 to 5 years after the receipt of your Form 9.</p>
            <p><strong>Note:</strong> At this point in the process, if you or your legal representative adds new evidence, the evidence will only be reviewed by the Board and not the RO. If someone other than you or your representative submits evidence, the Board will have to remand the appeal to the RO to consider the evidence and issue a Supplemental Statement of the Case (SSOC). Sending the case back to the RO for this type of consideration can add years to the time it takes to decide your appeal, but you can avoid this additional delay if you send a letter to the Board that says you want the Board to consider the new evidence without sending it back to the RO.</p>
          </div>
        },
        bva_remand: { // eslint-disable-line camelcase
          title: 'The Board Has Activated Your Appeal',
          description: <div>
            <p>The Veterans Benefits Administration (VBA) sent the Board the evidence asked for in the remand of your appeal. Your appeal has been activated by the Board and will be reviewed by a Veterans Law Judge.</p>
            <p><strong>Note:</strong> At this point in the process, if you or your legal representative adds new evidence, the evidence will only be reviewed by the Board and not the RO. If someone other than you or your representative submits evidence, the Board will have to remand the appeal to the RO to consider the evidence and issue a Supplemental Statement of the Case (SSOC). Sending the case back to the RO for this type of consideration can add years to the time it takes to decide your appeal, but you can avoid this additional delay if you send a letter to the Board that says you want the Board to consider the new evidence without sending it back to the RO.</p>
          </div>
        },
        cavc_decision: { // eslint-disable-line camelcase
          title: 'The Board Has Activated Your Appeal from the Court of Appeals for Veterans Claims (CAVC)',
          description: <div>
            <p>Your appeal has been returned to the Board from the CAVC. It has been activated by the Board and will be reviewed by a Veterans Law Judge.</p>
            <p>If you have additional evidence you would like the Board to review, you can add it within 90 days from the CAVC decision. You will receive a letter from the Board about how to submit new evidence during this time period.</p>
          </div>
        }
      }
    }
  };

  const emptyResponse = {
    status: {},
    nextAction: {}
  };

  const eventContent = contentMap[lastEvent.type];
  const previousEventType = previousHistory[0] && previousHistory[0].type;
  let prevType = previousEventType;

  if (!eventContent) {
    return emptyResponse;
  }

  switch (lastEvent.type) {
    case 'ssoc':
      prevType = ['bva_remand', 'cavc_decision'].includes(previousEventType) ? previousEventType : 'soc';

      return {
        ...eventContent,
        status: eventContent.status[prevType || 'soc'],
      };
    case 'activated':
      prevType = ['bva_remand', 'cavc_decision'].includes(previousEventType) ? previousEventType : 'defaultStatus';

      return {
        ...eventContent,
        status: eventContent.status[prevType || 'defaultStatus'],
      };
    default:
      break;
  }

  return eventContent || emptyResponse;
}