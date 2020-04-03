import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import { removeEntry } from '../utils/api'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { addEntry } from '../actions'
import MetricCard from './MetricCard'
import TextButton from './TextButton'


class EntryDetail extends Component {
  reset = () => {
    const { remove, entryId, navigation } = this.props

    remove()
    navigation.goBack()
    removeEntry(entryId)
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    const { metrics } = this.props
    return (
      <View>
        <View style={styles.container}>
          <MetricCard metrics={metrics} />
          <TextButton onPress={this.reset} style={{margin: 20}}>
            RESET
          </TextButton>
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

function mapDispatchToProps(dispatch, { route }) {
  const { entryId } = route.params

  return {
    remove: () => dispatch(addEntry({
      [entryId]: timeToString() === entryId
        ? getDailyReminderValue()
        : null
    }))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)