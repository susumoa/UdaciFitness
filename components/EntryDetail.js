import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'


class EntryDetail extends Component {
  render() {
    return (
      <View>
        <View style={styles.container}>
          <MetricCard metrics={metrics} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 10
  }
})

function mapStateToProps(entries, { route }) {
  const { entryId } = route.params
  return {
    metrics: entries[entryId],
    entryId
  }
}

export default connect(mapStateToProps)(EntryDetail)