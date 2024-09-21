/* eslint-disable */

import { useEffect } from 'react'

export function ParticipantVideo({ id }) {
  return (
    <div>
      Participant
      <div id={id} className={styles.video}></div>
    </div>
  )
}