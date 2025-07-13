import styles from './Home.module.css';

export default function NotFound() {
  return (
    <div class={`${styles.intro} ${styles.showFooter} pb-20 flex items-center`}>
      <h1 class="text-5xl font-bold">404 Not Found</h1>
    </div>
  )
}