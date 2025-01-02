import Button from '../common/Button';
import Input from '../common/Input';

function LoginForm() {
  const handleLogin = () => {
    console.log('Login');
  };
  return (
    <div>
      <Input id="email" label="Email" size="normal" inputType="text" />
      <Input id="password" label="Password" size="normal" inputType="text" />
      <Button label="Login" buttonClass="primary" onClick={handleLogin} />
    </div>
  );
}

export default LoginForm;
