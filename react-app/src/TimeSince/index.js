import React from 'react'
import ReactTimeAgo from 'react-time-ago'

export default function TimeSince({ date }) {
  return (
    <div>
       <ReactTimeAgo date={date} locale="en-US"/>
    </div>
  )
}