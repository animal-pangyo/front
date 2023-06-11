import styled from './auth-layer.module.css';

const AuthLayer = ({ children }) => (
  <div className={`${styled.layer} auth_layer`}>
    <div className={styled.container}>
      {children}
    </div>
  </div>
)

export default AuthLayer;