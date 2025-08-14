import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={`${styles.notFound} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">404 Not Found</h1>
    </div>
  )
}