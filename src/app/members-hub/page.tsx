import Link from 'next/link';

import styles from './members-hub.module.css';

export default function MembersHub() {
  return (
    <div className={styles.membersHub}>
      <div className={styles.grid}>
        <div className={styles.gridItem}>
          <span><i className="fas fa-rocket"></i> DP Blast Maker</span>
          <Link href="/dp-blast">
            Go
          </Link>
        </div>
      </div>
    </div>
  )
}