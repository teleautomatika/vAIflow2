import { Workflow } from '../types';

const mockWorkflow: Workflow = {
  id: 'demo-workflow',
  name: 'Demo Workflow',
  nodes: [
    {
      id: '1',
      type: 'webhook',
      name: 'Webhook Trigger',
    },
    {
      id: '2',
      type: 'slack',
      name: 'Send Slack Message',
      config: {
        channel: '#general',
        message: 'Workflow executed!'
      },
      inputs: ['1']
    },
    {
      id: '3',
      type: 'email',
      name: 'Send Email',
      config: {
        to: 'user@example.com',
        subject: 'Workflow Complete',
        body: 'The workflow has been executed successfully.'
      },
      inputs: ['2']
    }
  ]
};

export default mockWorkflow;
