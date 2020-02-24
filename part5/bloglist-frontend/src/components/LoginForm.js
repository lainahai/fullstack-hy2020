import React from 'react'

const LoginForm = ({ usernameState, passwordState, handleLogin }) => (
	<div>
		<form onSubmit={handleLogin}>
			<div>
				Username 
				<input type="text" value={ usernameState.username } onChange={ usernameState.handleChange } />
			</div>
			<div>
				Password 
				<input type="password" value={ passwordState.password } onChange={ passwordState.handleChange } />
			</div>
			<button  type="submit" >Log in</button>
		</form>
	</div>
)

export default LoginForm
