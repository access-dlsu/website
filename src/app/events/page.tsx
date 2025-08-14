import styles from './events.module.css';

export default function Events() {
  // Group calendarData by month and year
  const calendarByMonth: { [key: string]: Calendar[] } = {};
  calendarData.forEach(event => {
    const monthYear = event.date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (!calendarByMonth[monthYear]) calendarByMonth[monthYear] = [];
    calendarByMonth[monthYear].push(event);
  });

  return (
    <>
      <div className={styles.events}>
        <h2>FLAGSHIP EVENTS</h2>
        <div className={styles.flagshipEvents}>
          {eventData.flagship.map((event, eventIndex) => (
            <div>
              <div className={styles.number}>
                <p>{String(eventIndex + 1).padStart(2, '0')}</p>
              </div>
              <div className={styles.details}>
                <h3>{event.name.toUpperCase()}</h3>
                <p>{event.description}</p>
                <a href={event.url}>SEE MORE</a>
              </div>
              <div className={styles.highlights}>
                <ul>
                  {event.highlights.map((highlight) => (
                    <li>{highlight}</li>
                  ))}
                </ul>
              </div>
              {event.photoUrl && (
                <div className={styles.image}>
                  <img src={event.photoUrl}/>
                </div>
              )}
            </div>
          ))}
        </div>
        <h2>OTHER EVENTS</h2>
        <div className={styles.otherEvents}>
          {eventData.other.map((event) => (
            <a href={event.url} title={event.name}>
              <img src={event.photoUrl}/>
            </a>
          ))}
        </div>
        <h2>TERM 3 CALENDAR</h2>
        <div className={styles.calendar}>
          {Object.entries(calendarByMonth).map(([monthYear, events]) => (
            <>
              <h5>{monthYear}</h5>
              <div className={styles.calendarMonth}>
                {events.map(ev => (
                  <div className={styles.calendarItem}>
                    <h3>{ev.date.toLocaleDateString(undefined, { day: 'numeric' }).padStart(2, '0')}</h3>
                    <h6>{ev.date.toLocaleDateString(undefined, { weekday: 'narrow' })}</h6>
                    <p>{ev.name}</p>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  )
}

interface FlagshipEvents {
  name: string,
  description: string,
  photoUrl: string,
  url: string,
  highlights: string[]
}

interface OtherEvents {
  name: string,
  photoUrl: string,
  url: string
}

interface Calendar {
  name: string,
  date: Date
}

// Sample data for events
const eventData: { flagship: FlagshipEvents[], other: OtherEvents[] } = {
  flagship: [
    {
      name: 'Full Throttle: ACCESS Grand Prix',
      description: "Formidable. Focused. Fast. That is what ACCESS is all about. Just like a race car driver, Computer Engineering students are forced to learn quickly, adapt fast, and react whenever problems show up, like dodging other cars and obstacles.",
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/514035228_1232182208607501_105227586454170603_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE7ch55ODgbU7TUZImZXW-dLfqqR1xtqkot-qpHXG2qSvI-xpi8KHDLVlrVn5qzwfatq0SJNJfFqbbOxjO9Sq_o&_nc_ohc=KHMl6e-HpaMQ7kNvwGrlkIl&_nc_oc=Adn1hBUpY1jd2xOG9oawNUszq4Sa6MKJCWv_nMXUji0qgdnZj2awcaFfszd_A8UiWyc&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=vXN5mDMBZwh12AV64UEI4w&oh=00_AfT3nH-wAvzFRnwfnk53dRQOD_t1P4Y2jAP1zUkNZym6xg&oe=686F20A1',
      url: 'https://www.facebook.com/AccessDLSU/videos/1497257574570618/?__tn__=%2CO-R',
      highlights: [
        'Play Interactive Games',
        'Bond with Fellow CPE Students',
        'Win Exciting Raffle Prizes'
      ]
    },
    {
      name: 'LEAP 2025: Rank Up!',
      description: "Let's set sail into the world of competitive gaming with Rank Up! - an ACCESS LEAP event where gamers, students and people of interest come together to explore what really happens in this gaming world. Explore different islands full of esports legends, uncover gaming secrets and find the buried treasure of gaming skills.",
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/508156318_1039465404954110_6216946627495046506_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeE9iMK2D850tIkibk5tYLeAueB-xIhzrca54H7EiHOtxp78Xz-wlkzXwyA6m4PB7wpRsHnc73bZv-HkQhWbHA_S&_nc_ohc=1XPpg252LcYQ7kNvwGk4WI4&_nc_oc=Adk2uDSmssgW6YeV0XYfT-GcUcK2iG-t082_JfahzcMZkEGd5QHnql0k3AJIvDnZnGk&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=sHEltC1z6av4Z9bb5a5sCw&oh=00_AfQfaPLjrjGCmdJema1wj_1Cta-Qb4Mbh4TG28lzLJ1QlA&oe=686F4666',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02e9YMLHLhn68o983RXbKtnXydFvXXQWiExd7LTFUqdRfkk58uCRGyFWnfXrHpMhsml?__cft__[0]=AZVa8KS-7v_LanhhQEUQd70KJaL1-sJdFkAG0Q24R2a35Qy1khaAIpudgEvzxmwuiZI-uQBp2og1ePusKhjeW7-tvLykxmkYOfD4bp_EMuqFRzBbd-21FAjhg5_UjpdOVlALCjYn2TYa5aMdXA4LftGTG622pDg8tGveKAoF15YhmujWxRlW3aToWDsCFjVqCsEEpgPWHiYn5gw1WG0IVkWx&__tn__=%2CO%2CP-R',
      highlights: [
        'Game with Confidence',
        'Sail the E-sports World',
        'Uncover Career Opportunities'
      ]
    },
    {
      name: 'BYTE: Beyond Your Technical Expertise 2025',
      description: "",
      photoUrl: '',
      url: 'https://www.facebook.com/AccessDLSU',
      highlights: [
        'Browse Career Opportunities',
        'Grab Export Success Deals',
        'Check Out with Confidence'
      ]
    },
  ],
  other: [
    {
      name: 'Git in Action',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/504185703_1213072947185094_3974015354172815403_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGtZd_9Sbklov96sxiy4SEM5y6nlXTOjBznLqeVdM6MHIHfvx9VPL320tvZedEwciTn5fJ6nLWpihjCd61-euzy&_nc_ohc=Bzd6lFCo3CIQ7kNvwFAeSOh&_nc_oc=AdmD5ljqcbyQ7b05UAU0eM6Dz3wO4V7yb5drukJKJQswj7Mi3T_t-Zquz6xDZKcHOgI&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=L00lhU2kW5VYCad7wlhwbQ&oh=00_AfRYo68lgDpO3JOUbEj5Xf-PtpyP0Iqm1fdPm9DmFA-mjA&oe=686F29EC',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02S3RtiZnj8axsYYmFtTjEZYz8ecMiYGb7DocQRe4LrFsKq1Zn4RwLEx7riQ5D2LV3l?__cft__[0]=AZVSsl9qgp_m5ZdW-H7AJOh2kl-4esqPB4T_3Ew-VO-BVv1ZzXVC9MDFeQhnNLVDknXtGIpVcLDUD-q1FHyoGVWysS2TBU_6P7A9EiKyCYn1xoSaPw7lQJQsf7jO5w1MXEecgYNemHC_ObMMYK7a8OXn31k1V-UdztJJORNo2Hp4Rw&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Behind the Sheets: Automate with Apps Script',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/506399739_1220131043145951_5742990948369579270_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEsquia_f8cuC4blOUbfaauPg3_yfy6OL8-Df_J_Lo4v3ql8QOpaJr5igdce15e8eQ99VyKO_dhTy7inMXO8-pa&_nc_ohc=4QORMp-7FNMQ7kNvwHqskMv&_nc_oc=AdkwJf6R_R-eVc_Z7JzzIncV96q8FwyLWqk5kHA5zZ--F3zavDc2tLAIp9i8lB-ufCw&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=49nnQcZtyVHEFipZcsSxDQ&oh=00_AfTRCzIPdsunwZmhoj2F98uQKEW8eRlrSau-XevSBcVgCA&oe=686F4F38',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid06rguMa47ZjidTxPUWFb3dgSYhdTB7X7i9VWsBm8Dy6uBC2S529peyvKCPbjeFwLZl?__cft__[0]=AZUZQbeMfQ4w0WB8suEeobdle-HUPJn2S63QSnsl6DAceG75cSAm71iRt8xVjlyW6JyzghkKRFVIW_rcNkonFtmsvNLqrcqh4Hyazde-6ofl7eoRkCLCUMP1DCZrwzMaLq80NQy28gb20ayedu-BYJQx8SraSu9zLB1avvwHo0nHZg&__tn__=%2CO%2CP-R'
    },
    {
      name: 'TeXcellence',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/509430984_1223462532812802_6738712358360989919_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFvSV2PkIYFvohMxteweIux-GBJe5RwbZb4YEl7lHBtlmzF1Rd-mw5rat2JhenY_O6gn8jWIWluDahpETJ0o3jM&_nc_ohc=Po7RGxgNzp0Q7kNvwHUSHK3&_nc_oc=Adkt1GkrWa2cNVcPNFgxE5DNDUnqVSnNHp78YXufCJjccLIHQeETO7CHt6OOoq1o8WY&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=y1hFJGuDHRwyDufrVDezHQ&oh=00_AfRTdYp8Q-3BKyoX6GLMQBPjzqfmIWm3nbQ7To4tcpfA8Q&oe=686F25D8',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02kbocCppMJVzsTWyUZaeKiR6k6yZcER46mgXGnUndZ52CWeahkobjCaXNRoexthXCl?__cft__[0]=AZUgpt7lqc18qaXlc3XmKkCEfqbu5aGbTgkSQhK0K5uU-ysb9XDgJjqPv7XdcbglIqZFV2lLZScC4HMVJiHzEp8sGnMRqtPYflKzxOUh5ocZAipIdRQXWbJWB27pcrVU2SLmwzUDEcBu8y4d1MsyesP2QHLcPzgb0s9Y9yHp6X07aw&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Back to FireBASE-ics: Develop Your Backend with Firebase',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/511443287_1228655128960209_39824554166714338_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHJvvmsNxf9KtmLhNl137vCvbvGhhSdk0m9u8aGFJ2TSZcP4tWTb0vjmzGcQucc72q-IXnC6EBOC6qd22-8OG_i&_nc_ohc=KWrC7jzIkQgQ7kNvwE6nc3a&_nc_oc=Adn61_e1aHBWnZYtJFrN3slyxcf848ZGdLBYH9dtKrM_nSrhh65fxiUrruvMtrIVFFg&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=F4wxo3bdfziLZvA4dvMyPA&oh=00_AfRRY-sEHZcQbQy2Tgsf0N9g9els9J7xzl0puQbcxCBkyg&oe=686F355F',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02TSgXXMK3qWFxKXhuwqXJYC9evCsv11h4eykQue6qdT9UmLTdWKw6SJHhesath3pPl?__cft__[0]=AZUyVg19EQMA1Y5jupo2BRC35vj4ACJDiQkgS0RjQzmhcRiwLppJ39JVuG1-OB2En_j0j-5hyVMb1WyvYcHnHEWJ5MiE4a7PxJs5f8V-Txr3j12fB5ndxtTps7-2ypGr6XHzDVubIzibnuuFCA8M2qv2PBQLAdUUuPNTD4AwQZB-ZQ&__tn__=%2CO%2CP-R'
    },
    {
      name: 'A Bright IDEa',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484479415_1154875453004844_710416802572703668_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEnks9CPK9qOsgk5PD9HUj0ktI2A2bpvYqS0jYDZum9iiBwIZHGALA23KfIG3pP3QR81qVc8j5BGl5bSiK9tS5X&_nc_ohc=mgJTfktf_p0Q7kNvwGrkb0p&_nc_oc=AdnVD0zfJOJpGNERVJfHd3OG_r-WsQfxe7COnS088wMUTn5wuw7yB0axtpmxWmFZkNo&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=Nnc3c9yocIOtYtgJ-b1s5Q&oh=00_AfSPuvMvJxhmYuZtkzKmTPgI_tFCwsRWtKBqr8CUEZMytA&oe=686F1C54',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid05mEjwpZ4BUzqUYoVF9YfiQLswooS1Titkr5ES6MBnzobCeBxfzU9kfJ7npR6ntCxl?__cft__[0]=AZUIEv3NWjfJSGxvgCI53buvoG8KNGuZ1f-5mQRVx9mIOaZfWR9l3dx___zwDzGA0x9UG4fUhH-8U4vHumxkQPVSu1Cr_nXB6BWGXJNjahGtAGX0ufGegM6sc3TfuHUpBp0fPop4P5CXZMppUbuXLXIS13I3axFyBRGdIs0KRXEM4w&__tn__=%2CO%2CP-R'
    },
    {
      name: 'VS Code Angels',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/485286977_1154877526337970_134054872155450341_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEWlGkxjdV_86JyW_CG2UTvBgsS4fyJd2UGCxLh_Il3ZTWK5agaA6aFv0cJqiObRvieDfIUf1r5khtaeoBnj8Lt&_nc_ohc=QCvp1eVsvPwQ7kNvwHcVC5y&_nc_oc=AdlIwUCgt7uI4vi4N4HaJzZxApCHdkPopCMg1GThvXucmYBzawJUtea6MQONnfMDcQ4&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=LX-o600ye1uQ-b30yGpNKw&oh=00_AfQS5kfYFo94f8Bog22XANsu9ZmYpiTmHRn4NzbluvqoZQ&oe=686F2EC7',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid0aizrs48bSH27t1UWTwJ3w7aqDbU2sDnSosPxncLAbam6r3FJm1pU2yyZuJMA4WuPl?__cft__[0]=AZWpFtH6vIoFV3kKQT1EW1KkdtH-JfHLyOufp168Im4obG4_qzJBH7AeM4IB1aA28MLZxHWMVRGHDdAu9LsLl9Gb1jLt0ZxmlmHeEn9lGYYr1RouEjzbYOtx74jrua6ZypCHFkHo0FFwydlf_0o2r2ospXpWMrwLMSvSNaZ6qNED_w&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Avengers Assemble: A Guide to Assembly Language',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484188788_1154923806333342_483470662444511324_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeF1NsBhaPuO4r3xwTOerhl27lHsFSvlcZruUewVK-VxmsDlv8DF4kMgHPTJIGk0OfeKcz8LsamCmeMqjHs5-WXT&_nc_ohc=qCiatLrp5TwQ7kNvwGvo0oD&_nc_oc=AdlWskgte6x6cl86rR6jBgNSEFuARSjKJZKO4IjvDTN6xBriNqJGSQ2ToA5yoAazh48&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=l1FvVRZSAef2qo84IBjGYQ&oh=00_AfRQo7so9ZDy579XkeTDa05wZGu9pP4qDofHLWnVnLtQEA&oe=686F0D98',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid0Vk8wLzrhu4MptsrthdNWyV7Mp3cr6JMCeb6UPnFXEYmeK6uqfUUMjEinH4zvqK2sl?__cft__[0]=AZVfLMU8oi0scFGFUxFRoG5d_j6M57jkC3O3xUeq5RrLAtyRZFnP1Km7ezgst-Jm21ItMfFTAfgqVeyRqXfQOYD6MNVg0MVIvA8LDa8kfP4DYi5GQ0FLYXLEsqaXUr2ic51UH9I2vilLrzKkJX8HSOL8Neb9zu0EAwRVMg4Bd-8JoA&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Selecting Success with SQL',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484555380_1154925279666528_1513884881813306849_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGjAJ9GSujJhATDOJtUCbV1FXs5IPekidMVezkg96SJ02tsC1kEA1nOnVHwkyaZiCxASOu6l0iCQ1qq1iGIaxgU&_nc_ohc=R7nGmoTVmJcQ7kNvwElHjax&_nc_oc=AdleyLjTYFIcOc3m-wvplvbt1LLOsz8fC-iFVLo36PZ3kw_ZNlqTjkaXpbMTrYv30-4&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=J4kLnT0q0EB0nn9gwo_fTg&oh=00_AfSj56tVtf-JapaISi4B7nETTacgUB3IKGVNywfK6gF0sA&oe=686F2E50',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid028EjoUuNkdHnPxtKGjshEjmrfmS4aE7mvgR35W738PKTYRsVMqUuKZM8NaQdbNxmkl?__cft__[0]=AZW7xJ4IOs4SjiA5HjfIclB0Tp1VQskGuXW8Fb6UrAaSxDBNx1vIKa6K7Tr_MrdzhUOagmQ90QJB4GNxYr7gkuUMAFn_4GrsO08DSgAlGJ0JMYzrzekoiT-WSEJTKs8cKkPEPRZjQtmZ5AOkE8qGpfuG9UMIXL00_id4qnW_y8QMGg&__tn__=%2CO%2CP-R'
    },
    {
      name: 'ArduiKnow',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484326953_1154926939666362_7714589188967521447_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeH673I0xdekdjCFDOfRTTBsofuQR8XmlgGh-5BHxeaWAePbzhfgLU6s9YxsPsy9k48MuNqRI0J-CC2olidWRW2V&_nc_ohc=66W2yyh6sWEQ7kNvwF4Z-Mz&_nc_oc=AdmcNRVVH6LUXzpY67_k3tklzUn4-NlTsatwW_mzbGGyCgZ27di-sZ-36XI1Xk7UozY&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=nwZvlXtcjrxsfDC32yL64A&oh=00_AfTK9pZv4H2lohvSi8PpH0ceO3NGC-x-1899241cEj9b2g&oe=686F4C59',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02hsENNYwbJypyMj21uTV7rw8kNfbPafAhrxkMoKf1Bt4hjbUTJDuE3TXu5ZdV8wRUl?__cft__[0]=AZU7J7hD1zL2lmln1LxmxKklxc1neP-aakwz5Hsiddilo7vV6Z9HgjFV_Rbz9Qg7--6n_6ZHxXk6PXpgSZgBDKt7WdiFmzCOd8lUglWUFnMsbrNDf04ugIwDWzbPB7iyfTNn9FHVhdfVUSb3VIgpZ7RIARXtegiHvGfPtDYUzpaCZQ&__tn__=%2CO%2CP-R'
    },
    {
      name: 'OOP!...I Did It Again',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/485675859_1157319369427119_8670139010461957265_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGQTV495YJJ57bBKNgc4lusAny1gj8jESsCfLWCPyMRKyeUJG_OmWDd0LIpIx0LVDjQLS8APICqrZxzC_4HN7Ic&_nc_ohc=6O3YJH4b37sQ7kNvwHs6Trl&_nc_oc=AdkZkVbh2uInEpS3LgYMkGnToQAreFJstPm6tQsup_40X0wRdh82oY4m9hCv39whPrk&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=JBgJ0molzhcOc5xaznGgEQ&oh=00_AfRuHNOQB1YZm6OSNmdAXv2hYsiuuV5yarb76ss5ePzJcw&oe=686F2AF7',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02MA91ir1LwQJ775eafS1u2b1TvVWbtB6RDyHkbVZvQ6kHQihFcojT9RuJhD9Y5oPPl?__cft__[0]=AZWOMUh7XnvjZa_01Guvndl3OtwAedOhAem3xyM_4ivBXetxz0JGXmbeJQ0Yu0chrUXSJdeZASOvWsrQ6u1SBg9d_2q4ryBEng2nYsODk5lvU7tXEXAm5BUuwLh2O5aoS9mnhBBpq9Mo9kEtuAicnZOCfBiNz9Le64KL1zB7ThDwbw&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Algo-mazing Adventures',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/486576889_1160653842427005_63962006059038924_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFJkuGKkmcA29J4FHB-_2pmpRHs6YS4aOmlEezphLho6bnIUkR62ut5AheFrQFbtmL6NuZjKkPrL5qTvBbgW-tC&_nc_ohc=D0pjACov5BsQ7kNvwGvqQgA&_nc_oc=Adnoi5qpmOdauPaeT8BKKJalzQN-uGndtq9PwUQjHR2dJ2dTJjS6MnYBJWzFQNf2VRE&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=IzjerptsmHTCPA3wF_FJsw&oh=00_AfS91LhegaKB9I5a7QXQ_Ja0DOg7mXkBS4wjgxnWpflwrQ&oe=686F28D5',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02aZ4PZPYwXCXjhbdSpEiXXSYj1rBsWN3r4ZJUDp45BGwbrkiWYSEwFGNMva96xsF6l?__cft__[0]=AZWf9HbY0l9KlwWANAXNcvygDKsBBPXvx209Ly2BRzx3tHDMXSqTKFZ7Xi6wyJsu7vHYwEwf3IGZz6yJ3atGgejtKPFLYP_3J_9EVGcQtDrqQzM6oubzl7FARZRcX6tf_EMWbj9Ux-_u1thmi8xuZSq0VvTn05lFlYlPPF78Bwgy_A&__tn__=%2CO%2CP-R'
    },
    {
      name: 'From Script to Screen: Web Development Basics',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/490316546_1175441880948201_5490501275727872626_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEOrTMN3TxhG4SWy0E_aoOdFbx2gfy80YUVvHaB_LzRhQw63AY5qiJxCMDysfijgs1PnEPXiG0apFKNddWcfKuN&_nc_ohc=9rwHmzEgc1MQ7kNvwEyyQ8E&_nc_oc=Adk4IXoP5_b9m8KR13wBoZ2HziEr_ZBsZI99_BdkLjMgzxpqcODxVwiUtQQ8uygo3XI&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=w-0IpjG7Riidc8qjjPRt0A&oh=00_AfTqBQXwEvj-vv65xJgK200NKZslOlgr29WTrJMP-jFepA&oe=686F1D26',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02R1h4tUJuUUM4ypGPNpwjsPJknzSbcvhDD1CtUgiRinJFK52czb8GkLcb38T7nn1ql?__cft__[0]=AZW90_dY0F9xYhsxTNfGGLvb0c5-SYGoKgWj7ypH_4Ln4VXDYqTGjatyrLHNKon_xvdsR8AYaFGYSEN54qvGWcb7I4Y4xbppi8AqfWrdQXnQlqr52XNPFczfv_0qyRUa9yFwTEag227N6WGH9nCrKq78TKLBp_NDfXWBCLW3OBf_zA&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Full STEM Ahead with ACCESS!',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/486494706_1160706705755052_150358772897389011_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGv5Nzn_clf5L89UKbJoCgIr8eo2SzXLiOvx6jZLNcuI2h8Sawwgx9en9ANOU0DvNacrI3k-2wQokQqyJBXY_W-&_nc_ohc=yWmz9ZHA2jcQ7kNvwHhPuwz&_nc_oc=AdkMzTLBkz9V2Fsza-paRLN5Wlh_NYZaACmSaH-x2iW1ecgHtYMjYnXSjrTBmNuUzMI&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=aMFscjnVstTsZXqW6-H0Yw&oh=00_AfRpGCyRxQoNnX8xgJuOacLGG72IM_FlLWpkWURjdN0BqA&oe=686F1FFD',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid069QaexmJeBPqiEgr4iGhCQVWmajZzqx8bWAeFHeH2h1diB2Wp46bdUNaYCNHZCLgl?__cft__[0]=AZVKaQZofc7FM2QsESzqOUEFWkZ1bgj5LBxSM0zUgUdVKncgW4wMavNjDWvsj4bDGcr-9tFpx08vyJ4u280X41XfwnEWkf7vdwgd1urz-H7XgAASnbSIzt48kLUT7z1400lxZUfK1hBPZd2MAOPbimxX08qa5yKIt5ke_-jfKPJnXQ&__tn__=%2CO%2CP-R'
    },
    {
      name: 'CodeCraft: Coding Your First Project',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/486941481_1162032048955851_3829545594324131916_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGVa4jedcIY6935x2vNMXWw8X65DIma5b3xfrkMiZrlvbftVdiS6W6zSe4ZQabtwOShP8Kp9o1jCNXZ2cFfMdz9&_nc_ohc=c2ut45CKXUIQ7kNvwE6hs1D&_nc_oc=Adm1Y2zn9Rz0cP-Hi4k7iHMctlFlUVk-rZJHAGiijS61c7EAaB0uTSHPdmeu2BSwNvM&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=c-xUhZ8h3VHx-m2hcnVSrA&oh=00_AfTcJXW8WC2lIHmewHL3fqw6KnMyYrUd6GrnMpBVvT0oBg&oe=686F39A3',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid0MoVLg9PL31UCNqmJtEJkyFipczwwGQNNs2izKChjfGWoCt5buysE3fKQkFS2VjHjl?__cft__[0]=AZXF0tL1nPspsoKYWAR538GgevVXGpE3XkA1oe0cy1R1Vgtcjl4aFykIc5F4m2qkkyUGP3_3gCwwDKe7aImmkCE6bbFuMQMqbmMMA1iyp5WvwhELXmfZLTm6KsjMyza7_9Qx8JVicBn4NuR7g8-A1EPK-3a5fvjHFiVWgWVMacTIDg&__tn__=%2CO%2CP-R'
    },
    {
      name: 'OS-Sential Insights',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/486602868_1162029672289422_2332062897106759840_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHyQQhVtX7Ws5OQYssFM1_YY1pB_VapzMdjWkH9VqnMxxjqmmZ1G63773d2QBpF5LO6B_rT8Ibmgt8QQi7NprPD&_nc_ohc=CzGFKWT90GQQ7kNvwEhN5Nl&_nc_oc=AdmMuAjsblekZJM7rPSl5BJgN_6esf46A8LBRZDWRpcc9NUOoGknV8din0UU4bYS0eM&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=5d1B0MkScjWlvG0jLp787w&oh=00_AfRf7IPkotqqR_t9YhI0kv1aPHp1s47wWSuJEARlOiWtPA&oe=686F3697',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02dmNWd98TKcrSoRnVfXrbGw1rV4g9kKB8CSZGd4J2Przhpg5TCukLJ28j49G6K4p1l?__cft__[0]=AZWSYMs63L_eaVljU02fyc_D8f_79FKHkRd_CPJSXkkJi4fumQisYUjW-SZ_Mf5RMu3a0osY9O-Iq9WpseajB-edXFXPsxUkhdRsOWhqiCsCzfGg2yHASHERFfh8tABUc9Ny1ZRnh28nGp7IQh5-90QbHfsmoHwg1jOEBjNBkACUMw&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Shortcut to Coding Greatness: Essential Keyboard Shortcuts for Programmers',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/487209511_1163612392131150_2704693167830627584_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHyO3LX7vCF1wr8uiRZusOoR3neRjlN_wpHed5GOU3_Cq0tJ4Gifj-4bFwQx6qGn0br2wL-wgiTCEqwKaExMLWD&_nc_ohc=AmqoOELkgK8Q7kNvwEj5qc-&_nc_oc=AdljG63W2zYJeYjHNY9FRN6fdSncU9hU_3sM47iKK6MkdeB9pu2p6MPoxokXWc3Mi88&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=Jju10XHpWq2df6tT2LUQSw&oh=00_AfQVR8SNQw1LnSFlMBb4emSOPr2JyVQ0ytWsHv_ERyGf8A&oe=686F3ABE',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02RWXHwyZQZfW5k65p2AZbEG5vtDKEPiaHNoBjPjEUxtX2Y4NhSyxEwvb8jx5dQcutl?__cft__[0]=AZXBzfDFwEZJ_gCR8gAUNekC_1UwLytjUOypi79bE6oj2wmhZkK9Vsh62hCW-HPg5R-DByJ7t2Y2giX1VO35oTIBNUgzXTr1TQMl-QUWlBBsMdPmM22zUc51QkeCYrL2Dt36khSa6dNxbWs1LY47JEdZDJsmrWkVkGphBz5k8gPapA&__tn__=%2CO%2CP-R'
    },
    {
      name: '#ACCESSStars',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/486774764_1163845148774541_7824541894788593661_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGYzEmvJGzQy_u2TXWPXCNBb5deQ3jVdf9vl15DeNV1_xd_81vs9kuDSR4ptpuTcFfgsR0nABtGtvMie5e5hd_I&_nc_ohc=eM4VQLzL97sQ7kNvwEqpaZC&_nc_oc=AdkGLkvfiuulWIR6BFonBVlqLWda_oUijtiOZmOxsYsFPZ3hGJvMSUty7qeId8BBwzk&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=NYXSXasDfBGjW9EG0FgcHg&oh=00_AfS8HP80Z2zmi-ROZsM5MtQKXMvRfaaPPe_z_WHhZzIUHw&oe=686F346A',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid0Vx3N56896BzP2KJFiKGNgMrQqQRz2yDFyjDF9q9Tkxo7EoVTT25wwhULdNS73pKbl?__cft__[0]=AZVMjAfK1RZ0QrReVco886ygfX2f41Iob1PyFEHU4TxuH1Rnl35oiF-48RNDmQcOnLCKydm8PQgxvJwLKE0IyxMI3WKl0TgcTFRyjP-hM5y65FQWxo37btnvVZEpg4FUFEM5WuCEFyokVguyATpcGtJHgbSjShJBbG6QrYHCb_h8Ag&__tn__=%2CO%2CP-R'
    },
    {
      name: "Decoding C-crets: A Programmer's Diary",
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484112091_1154177146408008_8404565283492530451_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFKYpJp9WkecRu-1hNDcyjS88T1mNDA7snzxPWY0MDuyUYDjFTtlDaXatpnQf8UiXS6IFK1ZFmucGGtsf_fnES6&_nc_ohc=kWCzIDAGNrcQ7kNvwGlQ8p6&_nc_oc=AdnndnqQU-MysW7uJCqgnTGxhMAcopHgYtwhDxBI6gS_3hbXM9HGnRz3_CDy30EA68o&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=Vp2VoVGFM-lk7MHuQEdB6w&oh=00_AfSsXuz7ps0sMBUDXUDX7Y9xSqqxvgeAwTa25GH8Mkoqtw&oe=686F4395',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02yMp466uDw8MzELUiGurjiykG9JX9NiKQ5Yrimzori7taSgjLghkiSXnFRq82gNxPl?__cft__[0]=AZVp8W9k8dnzKAhdRCpAoAf9VE-KW4NDIBnc_MVjvR5BZXP3mPsTLOeH-Tw7y_48u0Vijh4qJOdBvE6b0ye6-XVwVXyz-snJYIxwfzarAwpb05tmnrIWP9Mqh6OUpypndIMdNcayl7ZIngzCJrUCDhl2DrWCnLP6900Oa0QNERlxAg&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Circuit Circus: The Magic of Circuit Designs',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/480551852_1154181466407576_908653300761352906_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGss6xma2VzF6VVGXl8XdVKe-JEZ9GKoB174kRn0YqgHYF8T10PNS6QfpsWBXA7mNuUfbQhp8jBCklJ0nWCB-iu&_nc_ohc=078KkXkq0xMQ7kNvwFIQgHH&_nc_oc=AdlDAj1mmVk7dc7M5axBtHmUS8czJckWWSYUmHhYFKDwuJUZQO5wHUvEdh7FweRV-c4&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=T3rJLP1vx8NODbm64gJtiw&oh=00_AfTQmedXN6wopSlKd_2MBn7cubN7KESpOneTP9esjEtf7w&oe=686F20F1',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid0359k32k75SR54ausJe7kBb2g99LuYJWrShk6Fkt8oa3Y6NYDHd2MLFYTz6mUs1re4l?__cft__[0]=AZVxk8OtCu4S6sn-tuB8YOb4_JWZL8Q2r0P20RQ2V3i5y13knaBkoxXBujTsEONnHth2bVs8U99f7J4fAiV2vsveVWg_DcT4UkfDp6UWIaiwXYjNJaBkuMBB_2ypj2Eu4e5YZ_iYk2IUWdbN12z7Rwxfyp-gIWlSrga8xq1vnzQO1g&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Arduino in Action',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484524169_1154449369714119_4661651892054210441_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEZVXepAP970aw5eijpwZNhntcl54sgCMSe1yXniyAIxGlTzRfP22ZEKdm6T-Q-4h4hmrvPWUFV7ZrRJnTfG3OZ&_nc_ohc=iK1dST3wh6oQ7kNvwHdboi3&_nc_oc=AdnHSI5wN_k-Z3OGdPK2KHa-ER1O4d-SAzcT5Kzls9JYukMJeBJ77b_fjIstxLdX5ko&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=v_ERGToNwr8toVefUtU5vg&oh=00_AfT5DBgpiOstRqYIyQ28aPoNyrcefVlTNBTHcN8INuHmcg&oe=686F265F',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02jWTnBH54r9V1hKBLPY1YYQmB7xyPdEM1JEiG6WyBnGXZLdYNuXjCbEZENEAe9WYLl?__cft__[0]=AZU59XQRrqFdGtt0sEkZA2HSKPrGMPnNvqRPBVoUDm4GTD_Dr5md43A-dcg21KfyHtLFn7fsKn87g0QzbKw9G1hK6ImZGO9CBXDe_sI_-OOapaEOXhtHO5PbyFMSXq7QXXSpeaV6b8CYgMNMBoElhnt2ZW_k9ipxCou0rNQGKzpICg&__tn__=%2CO%2CP-R'
    },
    {
      name: 'ACCESS Buzz: Tech Edition',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484297060_1154456783046711_3013336950866940179_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGAsfPX2-Im9UAmGlJFT4PdgCekb4rp-liAJ6Rviun6WDjEfTa7BzjBDt_6tKlk20SowYt2HPJigEgmlSqyj8LG&_nc_ohc=rZcKOMb68n0Q7kNvwGW89rl&_nc_oc=Adly1IcKsRqL8eU4Fn3lTjU_hRRSuC9Q7C7dCiQqulN1vrnzw6s3FKp0qaSqSjOpd0E&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=CyWFGzkAS27tuY-8QolIHw&oh=00_AfTzSGG6aAUj4KOBSVi-3GOJgyOIU_bqCSLZdNzeiC7akg&oe=686F4803',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid029NbKK7UrSGva149ctqKsrV96tWmP3m7PnGJkcMt5Z1hi97K5jaZ8vHG7Yxyvrmxal?__cft__[0]=AZUzyDw4ImBJdfOKNess1wt98qTcttEp2wuiLOvF-CHo-fB0n-0_4IpWzbphysSxfyFHMmxAlU0en4Vzk01-44PMgfDUsrGfTI0DLdly7_jMAmVggVK-L1HrlG6YQY0-WfiBJazC9qpPz19fLAlcXD1o9Fk3Hz9aNeGXGvT_JriP6Q&__tn__=%2CO%2CP-R'
    },
    {
      name: 'ACCESSing Trivia',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484096523_1154458196379903_8029160320607218813_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHNwoSf3V6W9yC-W25DnmMU2kb-gaOpgYbaRv6Bo6mBhsvHHs-0ZZDFBOKFZHHfFGV7LRZvoYLpOWq1D7HkIgwN&_nc_ohc=wRSkJvEW0iAQ7kNvwHXm_O6&_nc_oc=AdmfVRY0lEtolZy6jAb4agxXash__lxMrb6rQ893yU43MdPSTpNwcXlAgMTkBmMEb54&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=iDIg5Hy5ZINijEuwtmSqtQ&oh=00_AfSHGXaAOUsQP1NwIPWBLa6K5qnHTQ1y0Cn3ecwOaitgng&oe=686F4873',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02act5xUy41sDFnm5gBDPaTyq7B1BkmCH7fXYfbHAkQscH29yPD87MtZEd4M6v4cNjl?__cft__[0]=AZW7djTpYWc1Vre828ns99kCFlWUhDRLWOO5mS2KdOTT5YVol4f95vcZR36A-Sx1VF9PMs3xu7CGS2_T8GbzdNwchYm56pyo5NngmKcTX5Ix3U_A5hJW4K-2r4Ul1YHxOAy0l4yzTDIeS_VgLwucS3XwKOvtdxD_UTyDSnP2fz13GQ&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Learn A Ton About Python',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484158383_1154461916379531_4872182755679482648_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFGKZQj19ahuft5gS25Bqu9yroTCs31rrHKuhMKzfWusUnn7QHLE05a8am1rpFEiUQ-heKDnnt6lSdMLM95I4JV&_nc_ohc=n96XuIk21e4Q7kNvwFIm4EV&_nc_oc=AdkoPWn_McM38zVx3yG2L2Nr0PS0TeOATb2oF0warf3fD1LLW9DiGZyxAlXwxpbsm0M&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=cWcXgEguxWNXYS2K2_0NUg&oh=00_AfTIFfjty1YDLy-zT_6jSYePLN2wg0n1_QtqG55gvXZOfw&oe=686F2E82',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid033D9TvZLLT4m3p8VKnKPKGrVHTsep6LtTRNv9JPQGVKELDH3XJuYqu5MJteu3Ts71l?__cft__[0]=AZX2LYGQ-JPye8VmfFYPpDO48Z6pk25d7OiBffCSv6mNHnd36bD0XYYrhsFi6ibRw2k-O1GWW7G4WlbnVLRgEp_g7TsFMos3Wq_l3azOt9WKW6sHbkqusMzpgCcTGjsZJbDC-E2eMCXJLCSlZM2M4vCE_NqolHMONNOMTEV--50cyA&__tn__=%2CO%2CP-R'
    },
    {
      name: 'Live Laugh Lab MATLAB',
      photoUrl: 'https://scontent.xx.fbcdn.net/v/t39.30808-6/484905516_1154532776372445_6533661304565061855_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeHVI9R58drG0vfqcdmqokNFTPfR-v739ftM99H6_vf1-9-9G2p4j68Ih2-lZAX1xLuXNCS8Mm1hvIiQcvcPUTWv&_nc_ohc=r57uZOv1I88Q7kNvwHVeQ5M&_nc_oc=AdkfGkeBMQjco6_TAZnBD1Lq0maaMBZfJKoMim8anqgo_jDIhTYJamNWNXYdRhH-47A&_nc_zt=23&_nc_ht=scontent.fmnl16-1.fna&_nc_gid=bonXkX16jfpfUSt_4FovwA&oh=00_AfTNT7ZOikUO4RtZK791kSF0sJXNFGCM7SZKZNOX2eAj1Q&oe=686F1B92',
      url: 'https://www.facebook.com/AccessDLSU/posts/pfbid02RYi13GHzyAcEGBngb3JWTG7DpudLiGRPLRybdWZmL1KJhDfGMTRYvuVUku2N1W36l?__cft__[0]=AZUkVDb7Mb6WcoNTtAzSE_3bvmjHVAB47dLXkx_Jeh3W_Lp7q2obm7K4HjxAGhq5_ENfNQFuu3vWbsqX_06quRRFMwMn9ZfhNkJ2hGd-QIFC1yjnmA49i1ca82ds_4YrdLpome8ZcJmWXbPaG734norRmzqTPUdn7SOshATzp16NUA&__tn__=%2CO%2CP-R'
    },
  ]
}

const calendarData: Calendar[] = [
  { name: 'Git in Action', date: new Date(2025, 6-1, 4) },
  { name: 'Behind the Sheets: Automate with Apps Script', date: new Date(2025, 6-1, 11) },
  { name: 'TeXcellence', date: new Date(2025, 6-1, 18) },
  { name: 'LEAP 2025: Rank Up!', date: new Date(2025, 6-1, 20) },
  { name: 'Back to FireBASE-ics: Develop Your Backend with Firebase', date: new Date(2025, 6-1, 25) },
  { name: 'ACCESS the Matrix: An AIoT Workshop', date: new Date(2025, 7-1, 9) },
  { name: 'Full Throttle: ACCESS Grand Prix', date: new Date(2025, 7-1, 9) },
  { name: 'Ctrl + Alt + Dispose: Learning E-waste Disposal', date: new Date(2025, 7-1, 16) },
  { name: 'ACCESS Election 2025', date: new Date(2025, 7-1, 16) },
  { name: 'Debugging the Self', date: new Date(2025, 7-1, 19) },
  { name: 'BYTE: Beyond Your Technical Expertise 2025', date: new Date(2025, 7-1, 23) },
]
