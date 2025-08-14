import Link from 'next/link';

import styles from './members-hub.module.css';

export default function MembersHub() {
  return (
    <div className={styles.membersHub}>
      <span>Should show Google Sign-in</span>
      <ul>
        {/*<li><Link href="/members-hub/dp-blast">DP Blast Maker</Link></li>*/}
      </ul>
    </div>
  )
}