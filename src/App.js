import { useState } from 'react'

import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

const filterUnreadEmails = emails => emails.filter(email => !email.read)

function App() {
  const [emails, setEmails] = useState(initialEmails)
  // console.log('Inside Emails: ', emails)
  const [hideRead, setHideRead] = useState(false)
  console.log('State: ', emails, hideRead)

  const toggleRead = targetEmail => {
    console.log('Inside toggleRead: ', targetEmail, emails)

    const updatedEmails = emails.map(email => {
      // console.log('Inside toggleRead Map: ', email, targetEmail)
      if (email.id === targetEmail.id) {
        // console.log('Found email: ', email, targetEmail.read)
        const updatedEmail = {
          ...targetEmail,
          read: !targetEmail.read
        }
        // console.log('Inside updatedEmail: ', updatedEmail)
        return updatedEmail
      } else {
        return email
      }
    })
    console.log(updatedEmails)
    setEmails(updatedEmails)
  }

  let filteredEmails = emails
  console.log('filteredEmails: ', filteredEmails)
  if (hideRead) {
    filteredEmails = filterUnreadEmails(emails)
  }

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            // onClick={() => {}}
          >
            <span className="label">Inbox</span>
            <span className="count">?</span>
          </li>
          <li
            className="item"
            // onClick={() => {}}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={hideRead}
              onChange={event => setHideRead(event.target.checked)}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        <ul>
          {filteredEmails.map(email => {
            // console.log('Inside Map: ', email)

            return (
              <li className={email.read ? 'email read' : 'email'}>
                <div className="select">
                  <input
                    className="select-checkbox"
                    type="checkbox"
                    checked={email.read}
                    onChange={() => toggleRead(email)}
                  />
                </div>
                <div className="star">
                  <input
                    className="star-checkbox"
                    type="checkbox"
                    checked={email.starred}
                    onChange={() => {}}
                  />
                </div>
                <div className="sender">{email.sender}</div>
                <div className="title">{email.title}</div>
              </li>
            )
          })}
        </ul>
      </main>
    </div>
  )
}

export default App
