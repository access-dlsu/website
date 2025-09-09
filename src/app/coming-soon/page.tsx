import styles from './coming-soon.module.css';

export default function ComingSoon() {
  return (
    <div className={`${styles.comingSoon} pb-20 flex items-center`}>
      <h1 className="text-5xl font-bold">Coming soon...</h1>
    </div>
  )
}