import { onMount } from "solid-js"

import styles from './bingo.module.css'

export default function Bingo() {
  let tableRef: HTMLTableElement | undefined
  let overlayRef: HTMLDivElement | undefined
  let popupRef: HTMLDivElement | undefined
  let confettiCanvasRef: HTMLCanvasElement | undefined
  let bingoHeaderRef: HTMLTableRowElement | undefined
  let newCardBtnRef: HTMLButtonElement | undefined
  let resetBtnRef: HTMLButtonElement | undefined
  let hintRef: HTMLParagraphElement | undefined

  onMount(() => {
    const table = tableRef!
    const tbody = table.querySelector('tbody')!
    const bingoHeader = bingoHeaderRef!
    const overlay = overlayRef!
    const popup = popupRef!
    const hint = hintRef!
    const confettiCanvas = confettiCanvasRef!
    let confettiCtx: CanvasRenderingContext2D | null, confettiParticles: any[] = [], confettiAnimationId: number | null = null

    function startConfetti() {
      confettiCanvas.width = window.innerWidth
      confettiCanvas.height = window.innerHeight
      confettiCanvas.style.display = 'block'
      confettiCtx = confettiCanvas.getContext('2d')
      confettiParticles = []
      const colors = ['#ef4444', '#f59e0b', '#458230', '#3b82f6', '#a21caf', '#fff']
      for (let i = 0; i < 120; i++) {
        confettiParticles.push({
          x: Math.random() * confettiCanvas.width,
          y: Math.random() * -confettiCanvas.height,
          r: Math.random() * 6 + 4,
          d: Math.random() * 80 + 40,
          color: colors[Math.floor(Math.random() * colors.length)],
          tilt: Math.random() * 10 - 10,
          tiltAngle: 0,
          tiltAngleIncremental: (Math.random() * 0.07) + 0.05
        })
      }
      confettiDraw()
    }

    function confettiDraw() {
      if (!confettiCtx) return
      confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height)
      for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i]
        confettiCtx.beginPath()
        confettiCtx.lineWidth = p.r
        confettiCtx.strokeStyle = p.color
        confettiCtx.moveTo(p.x + p.tilt + p.r / 3, p.y)
        confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.d / 10)
        confettiCtx.stroke()
      }
      updateConfetti()
      confettiAnimationId = requestAnimationFrame(confettiDraw)
    }

    function updateConfetti() {
      for (let i = 0; i < confettiParticles.length; i++) {
        let p = confettiParticles[i]
        p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2
        p.x += Math.sin(0.01 * p.d)
        p.tiltAngle += p.tiltAngleIncremental
        p.tilt = Math.sin(p.tiltAngle) * 15
        if (p.y > confettiCanvas.height) {
          p.x = Math.random() * confettiCanvas.width
          p.y = -10
        }
      }
    }

    function stopConfetti() {
      confettiCanvas.style.display = 'none'
      if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId)
      confettiAnimationId = null
    }

    function getCookie(name: string) {
      const value = `; ${document.cookie}`
      const parts = value.split(`; ${name}=`)
      if (parts.length === 2) return parts.pop()!.split(';').shift()
    }

    function setCookie(name: string, value: string, days: number) {
      const date = new Date()
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
      document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`
    }

    function clearCookie(name: string) {
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    }

    function getRandomNumbers(min: number, max: number, count: number) {
      const numbers: number[] = []
      while (numbers.length < count) {
        const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
        if (!numbers.includes(randomNumber)) {
          numbers.push(randomNumber)
        }
      }
      return numbers
    }

    function generateBingoCard() {
      tbody.innerHTML = ''

      const storedNumbers = getCookie('bingoCardNumbers')
      const markedCells = JSON.parse(getCookie('markedCells') || '[]')

      let columns: Record<string, number[]>
      if (storedNumbers) {
        columns = JSON.parse(storedNumbers)
      } else {
        columns = {
          B: getRandomNumbers(1, 15, 5),
          I: getRandomNumbers(16, 30, 5),
          N: getRandomNumbers(31, 45, 5),
          G: getRandomNumbers(46, 60, 5),
          O: getRandomNumbers(61, 75, 5)
        }
        setCookie('bingoCardNumbers', JSON.stringify(columns), 1)
      }

      for (let row = 0; row < 5; row++) {
        const tr = document.createElement('tr')
        for (let col = 0; col < 5; col++) {
          const td = document.createElement('td')
          if (row === 2 && col === 2) {
            td.textContent = 'FREE'
            td.classList.add(styles['free-space'])
          } else {
            const columnKey = Object.keys(columns)[col]
            td.textContent = columns[columnKey][row].toString()
          }
          const cellId = `${row}-${col}`
          if (markedCells.includes(cellId)) {
            td.classList.add(styles.marked)
          }
          td.addEventListener('click', () => {
            if (td.hasAttribute('disabled')) return
            td.classList.toggle(styles.marked)
            const cellId = `${row}-${col}`
            let markedCells = JSON.parse(getCookie('markedCells') || '[]')
            if (td.classList.contains(styles.marked)) {
              if (!markedCells.includes(cellId)) {
                markedCells.push(cellId)
              }
            } else {
              markedCells = markedCells.filter((id: string) => id !== cellId)
            }
            setCookie('markedCells', JSON.stringify(markedCells), 1)
            checkForBingo(true)
          })
          tr.appendChild(td)
        }
        tbody.appendChild(tr)
      }
      checkForBingo(false)
    }

    function checkForBingo(showPopup: boolean) {
      const cells = table.querySelectorAll(`td:not(.${styles['free-space']})`)
      const allMarked = Array.from(cells).every(cell => cell.classList.contains(styles.marked))
      console.log(allMarked, cells, styles['free-space'])
      if (allMarked) {
        cells.forEach(cell => cell.setAttribute('disabled', ''))
        bingoHeader.classList.add(styles.celebrate)
        if (showPopup) {
          showBingoPopup()
        }
      }
    }

    function showBingoPopup() {
      popup.classList.add(styles.show)
      overlay.classList.add(styles.show)
      startConfetti()
      const hintTimeout = setTimeout(() => {
        hint.classList.add(styles.show)
      }, 5000)
      const autoCloseTimeout = setTimeout(hideBingoPopup, 30000)
      function hideBingoPopup() {
        popup.classList.remove(styles.show)
        overlay.classList.remove(styles.show)
        hint.classList.remove(styles.show)
        clearTimeout(hintTimeout)
        clearTimeout(autoCloseTimeout)
        stopConfetti()
      }
      function closeHandler() {
        hideBingoPopup()
        overlay.removeEventListener('click', closeHandler)
        popup.removeEventListener('keypress', keyHandler)
      }
      function keyHandler(event: KeyboardEvent) {
        if (event.key === 'Enter' || event.key === ' ') {
          closeHandler()
        }
      }
      overlay.addEventListener('click', closeHandler)
      popup.addEventListener('keypress', keyHandler)
    }

    function generateNewCard() {
      const lastGeneratedTime = getCookie('lastGeneratedTime')
      const currentTime = new Date().getTime()
      if (lastGeneratedTime && (currentTime - parseInt(lastGeneratedTime)) < 10 * 60 * 1000) {
        const remainingTime = Math.ceil((10 * 60 * 1000 - (currentTime - parseInt(lastGeneratedTime))) / 1000)
        alert(`Please wait ${remainingTime} seconds before generating a new card.`)
        return
      }
      const confirmation = confirm("Are you sure you want to generate a new Bingo card? This will reset the current card.")
      if (confirmation) {
        clearCookie('bingoCardNumbers')
        clearCookie('markedCells')
        setCookie('lastGeneratedTime', currentTime.toString(), 1)
        window.location.reload()
      }
    }

    function resetColors() {
      const confirmation = confirm("Are you sure you want to reset your card?")
      if (confirmation) {
        bingoHeader.classList.remove(styles.celebrate)
        const cells = table.querySelectorAll('td')
        cells.forEach(cell => {
          cell.classList.remove(styles.marked)
          cell.removeAttribute('disabled')
        })
        clearCookie('markedCells')
      }
    }

    generateBingoCard()
    newCardBtnRef!.addEventListener('click', generateNewCard)
    resetBtnRef!.addEventListener('click', resetColors)
  })

  return (
    <div class={styles.bingo}>
      <div class={styles.container}>
        <header class={styles.header}>
          <img src="/logo/access_green.png" alt="ACCESS"/>
        </header>
        <div class={styles['bingo-card-wrapper']}>
          <table
            class={styles['bingo-card']}
            ref={tableRef}
          >
            <thead>
              <tr
                class={styles['bingo-header']}
                ref={bingoHeaderRef}
              >
                <th>B</th>
                <th>I</th>
                <th>N</th>
                <th>G</th>
                <th>O</th>
              </tr>
            </thead>
            <tbody>
              {/* Bingo card will be generated here */}
            </tbody>
          </table>
        </div>
        <div class={styles['button-container']}>
          <button
            class={styles['warning-hover']}
            ref={newCardBtnRef}
          >Generate New</button>
          <button
            class={styles['error-hover']}
            ref={resetBtnRef}
          >Reset</button>
        </div>
      </div>
      <div
        class={styles.overlay}
        ref={overlayRef}
      >
        <canvas
          class={styles['confetti-canvas']}
          style="display:none;"
          ref={confettiCanvasRef}
        ></canvas>
        <div
          class={styles['bingo-popup']}
          ref={popupRef}
        >BINGO!</div>
        <p
          class={styles.hint}
          ref={hintRef}
        >Tap to close</p>
      </div>
    </div>
  )
}