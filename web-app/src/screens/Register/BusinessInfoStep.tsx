import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import countryList from '~/constants/country.js'

const FormItem = Form.Item
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
}

interface PropTypes {
  onFormItemChange: any
  formValues: any
}

export default class BusinessInfoStep extends Component<PropTypes, {}> {
  render() {
    return (
      <Form>
        <FormItem {...formItemLayout} label="Business Name">
          <Input
            name="businessName"
            onChange={this.props.onFormItemChange}
            value={this.props.formValues.businessName}
          />
        </FormItem>
        <FormItem {...formItemLayout} label="Business Address">
          <Input
            name="businessAddress"
            onChange={this.props.onFormItemChange}
            value={this.props.formValues.businessAddress}
          />
        </FormItem>
        <FormItem
          {...formItemLayout}
          wrapperCol={{ sm: { span: 6 } }}
          label="Country"
        >
          <Select
            showSearch
            value={this.props.formValues.country}
            onChange={value =>
              this.props.onFormItemChange({
                target: { name: 'country', value },
              })
            }
          >
            {Object.keys(countryList).map(countryKey => (
              <Option value={countryKey}>{countryList[countryKey]}</Option>
            ))}
          </Select>
        </FormItem>
        <FormItem
          {...formItemLayout}
          wrapperCol={{ sm: { span: 6 } }}
          label="Zip code"
        >
          <Input
            name="zipCode"
            onChange={this.props.onFormItemChange}
            value={this.props.formValues.zipCode}
          />
        </FormItem>
      </Form>
    )
  }
}
