import { handleResponseCatchError } from 'api-jarvis'
import { GET } from '../helpers/api'

const getCustomerType = param => {
  //   return GET('/get-customer-type', param)
  const response = {
    status: 'SUCCESSFUL',
    'trx-id': '4QDG4V5415P1',
    'process-instance': 'tmsapnpr1 (instance: SFF_node3)',
    'response-data': {
      id: 'CUST-ID-TYPE-I',
      name: 'Customer ID type for individual customer',
      description: 'List of id types for individual customer',
      'configuration-items': [
        {
          key: 'I',
          value: 'I',
          description: 'บัตรประจำตัวประชาชน'
        },
        {
          key: 'G',
          value: 'G',
          description: 'บัตรประจำตัวข้าราชการ'
        },
        {
          key: 'P',
          value: 'P',
          description: 'หนังสือเดินทาง'
        },
        {
          key: 'A',
          value: 'A',
          description: 'บัตรประจำตัวคนต่างด้าว'
        },
        {
          key: 'M',
          value: 'M',
          description: 'ใบสุทธิ'
        },
        {
          key: 'E',
          value: 'E',
          description: 'ใบขับขี่'
        },
        {
          key: 'F',
          value: 'F',
          description: 'บัตรนักเรียน'
        },
        {
          key: 'D',
          value: 'D',
          description: 'บัตรประจำตัวพนักงานรัฐวิสาหกิจ'
        },
        {
          key: 'H',
          value: 'H',
          description: 'บัตรแสดงตนอื่นๆ'
        },
        {
          key: 'S',
          value: 'S',
          description: 'Temporary Passport / บัตรประจำตัวไม่ระบุสถานะทางทะเบียน'
        }
      ]
    }
  }
  return response
}

const getCustomerTitle = () => {
  //   return GET('/get-customer-title', param)
  return {
    status: 'SUCCESSFUL',
    'trx-id': '67DG4V5HU4D0',
    'process-instance': 'tmsapnpr1 (instance: SFF_node3)',
    'response-data': {
      id: 'CUST-TITLE-TYPE',
      name: 'Customer title',
      description: 'List of standard customer title',
      'configuration-items': [
        {
          key: 'MR.',
          value: 'T1',
          description: 'นาย',
          'en-description': 'Mr.',
          'th-description': 'นาย'
        },
        {
          key: 'MRS.',
          value: 'T2',
          description: 'นาง',
          'en-description': 'Mrs.',
          'th-description': 'นาง'
        },
        {
          key: 'MISS',
          value: 'T3',
          description: 'นางสาว',
          'en-description': 'Miss',
          'th-description': 'นางสาว'
        },
        {
          key: 'DR.',
          value: 'T4',
          description: 'ดร.',
          'en-description': 'Dr.',
          'th-description': 'ดร.'
        },
        {
          key: 'OTHER',
          value: 'T5',
          description: 'อื่น ๆ',
          'en-description': 'Other',
          'th-description': 'อื่น ๆ'
        }
      ]
    }
  }
}

export { getCustomerTitle, getCustomerType }
