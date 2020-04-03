import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'


class EntryDetail extends Component {
  render() {
    return (
      <View>
        <View>
          <Text>Entry Detail - {JSON.stringify(this.props.route.params.entryId)}</Text>
        </View>
      </View>
    )
  }
}

export default EntryDetail