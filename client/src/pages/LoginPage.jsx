import React from 'react'

const LoginPage = () => {
  return (
    <div>
      <h1>Login to QuickChat</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" required />
        </label>
        <label>
          Password:
          <input type="password" name="password" required />
        </label>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default LoginPage
