import { useState } from 'react'

import Header from './components/Header'

import initialEmails from './data/emails'

import './App.css'

const filterUnreadEmails = emails => emails.filter(email => !email.read)

function App() {
  const [emails, setEmails] = useState(initialEmails)

  const [hideRead, setHideRead] = useState(false)

  const [currentTab, setCurrentTab] = useState('inbox')
  console.log('State: ', emails, hideRead, currentTab)

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
  const starredEmails = emails.filter(email => email.starred)

  let filteredEmails = emails
  console.log('filteredEmails: ', filteredEmails)
  if (currentTab === 'starred') {
    if (hideRead) {
      filteredEmails = filterUnreadEmails(emails)
    } else {
      filteredEmails = starredEmails
    }
  }
  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li className="item active" onClick={() => setCurrentTab('inbox')}>
            <span className="label">Inbox</span>
            <span className="count">{emails.length}</span>
          </li>
          <li className="item" onClick={() => setCurrentTab('starred')}>
            <span className="label">Starred</span>
            <span className="count">{starredEmails.length}</span>
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
