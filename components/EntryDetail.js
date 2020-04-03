import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'


class EntryDetail extends Component {
  render() {
    const { metrics } = this.props
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
    backgroundColor: white,
    padding: 15,
  },
});

function mapStateToProps(entries, { route }) {
  const { entryId } = route.params

  return {
    entryId,
    metrics: entries[entryId]
  }
}

export default connect(mapStateToProps)(EntryDetail)